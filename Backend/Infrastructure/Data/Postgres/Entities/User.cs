using Infrastructure.Data.Postgres.Entities.Base;

namespace Infrastructure.Data.Postgres.Entities;

public class User : Entity<int>
{
    public string Email { get; set; } = default!;
    public string UserName { get; set; } = default!;
    public string FirstName { get; set; } = default!;
    public int Age { get; set; } = default!;
    public string LastName { get; set; } = default!;
    public string ImagePath { get; set; } = default!;
   
    public string IdentityNumber { get; set; } = default!;
    
    public byte[] PasswordSalt { get; set; } = default!;
    public byte[] PasswordHash { get; set; } = default!;
    public UserType UserType { get; set; } = UserType.User;

    public IList<UserTransactions> UserTransactions { get; set; }
    public IList<Account> Accounts { get; set; }


}

public enum UserType
{
    Admin,
    User,
    Employee
}
