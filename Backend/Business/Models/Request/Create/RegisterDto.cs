using Infrastructure.Data.Postgres.Entities;

namespace Business.Models.Request.Create;

public class RegisterDto
{
    public string Email { get; set; } = default!;
    public string UserName { get; set; } = default!;
    public string Password { get; set; } = default!;
    public string FirstName { get; set; } = default!;
    public string LastName { get; set; } = default!;
    public int Age { get; set; } = default!;
    public string ImagePath { get; set; } = default!;
    
    public string IdentityNumber { get; set; }

    public UserType UserType { get; set; } = UserType.User;

}