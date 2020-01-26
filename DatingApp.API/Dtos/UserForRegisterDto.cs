using System.ComponentModel.DataAnnotations;

namespace DatingApp.API.Dtos
{
    public class UserForRegisterDto
    {
        [Required]
        [StringLength(12, MinimumLength = 4, ErrorMessage = "Username length must be in 4 and 12")]
        public string UserName { get; set; }

        [Required]
        [StringLength(8, MinimumLength = 4, ErrorMessage = "Password length must be in 4 and 8")]
        public string Password { get; set; }

        public string EmailAddress { get; set; }
    }
}