using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DatingApp.API.Data.Repositories;
using DatingApp.API.Helpers;
using DatingApp.API.Models;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.API.Data
{
    public class DatingRepository : IDatingRepository
    {
        private readonly DataContext _context;
        public DatingRepository(DataContext context)
        {
            _context = context;
        }
        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public async Task<Photo> GetPhoto(int id)
        {
            var photo = await _context.Photos.FirstOrDefaultAsync(prm => prm.Id == id);

            return photo;
        }

        public async Task<User> GetUser(int id)
        {
            var user = await _context.Users.Include(prm => prm.Photos).FirstOrDefaultAsync(prm => prm.Id == id);
            return user;
        }

        public async Task<PagedList<User>> GetUsers(UserParams userParams)
        {
            var users = _context.Users
                        .Include(prm => prm.Photos)
                        .OrderByDescending(prm => prm.LastActive)
                        .AsQueryable();

            users = users
                    .Where(prm => prm.Id != userParams.UserId && prm.Gender == userParams.Gender);

            if (userParams.MinAge != 18 && userParams.MaxAge != 99)
            {
                var minBirthDate = DateTime.Today.AddYears(-userParams.MaxAge - 1);
                var maxBirthDate = DateTime.Today.AddYears(-userParams.MinAge);

                users = users.Where(prm => prm.BirthDate >= minBirthDate && prm.BirthDate <= maxBirthDate);
            }

            if (!string.IsNullOrEmpty(userParams.OrderBy))
            {
                users = userParams.OrderBy == "created" ? users.OrderByDescending(prm => prm.CreatedOn) : users.OrderByDescending(prm => prm.LastActive);
            }

            return await PagedList<User>.CreateAsync(users, userParams.PageNumber, userParams.PageSize);
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<Photo> GetMainPhotoForUser(int userId)
        {
            return await _context.Photos.Where(prm => prm.UserId == userId && prm.IsMain).FirstOrDefaultAsync();
        }
    }
}