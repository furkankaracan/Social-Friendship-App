using System;
using System.Threading.Tasks;
using DatingApp.API.Data;
using DatingApp.API.Dtos;
using DatingApp.API.Models;
using Microsoft.AspNetCore.Mvc;

namespace DatingApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _repo;

        public AuthController(IAuthRepository repo)
        {
            _repo = repo;

        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(UserForRegisterDto userForRegisterDto)
        {
            try
            {
                //validate request

                userForRegisterDto.userName = userForRegisterDto.userName.ToLowerInvariant();
                if (await _repo.UserExists( userForRegisterDto.userName))
                    return BadRequest("Username already exists");

                var registeringUser = new User()
                {
                    UserName =  userForRegisterDto.userName
                };

                var createdUser = await _repo.Register(registeringUser,  userForRegisterDto.password);

                return StatusCode(201);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

    }
}