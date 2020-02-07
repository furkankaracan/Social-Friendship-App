using System;
using System.ComponentModel.DataAnnotations;

namespace DatingApp.API.Dtos
{
    public class UserForRegisterDto
    {
        [Required]
        [StringLength(12, MinimumLength = 4, ErrorMessage = "Username length must be in 4 and 12")]
        public string UserName { get; set; }

        [Required]
        [StringLength(12, MinimumLength = 4, ErrorMessage = "Password length must be in 4 and 12")]
        public string Password { get; set; }

        [Required]
        public string Gender { get; set; }

        [Required]
        public DateTime BirthDate { get; set; }

        public string City { get; set; }
        public DateTime LastActive { get; set; }
        public DateTime CreatedOn { get; set; }

        public UserForRegisterDto()
        {
            CreatedOn = DateTime.Now;
            LastActive = DateTime.Now;
        }
    }
}