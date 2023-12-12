using Infrastructure.Data.Postgres.Entities;

namespace Business.Models.Response;

public class UserProfileDto
{
    public int Id { get; set; } = default!;
    public string UserName { get; set; } = default!;
    public string FirstName { get; set; } = default!;
    public string LastName { get; set; } = default!;
    public string Email { get; set; } = default!;
    public string ImagePath { get; set; }
    public int Age { get; set; } = default!;
    public string IdentityNumber { get; set; } 

    public UserType UserType { get; set; }
    public IList<Account> Accounts { get; set; }
}