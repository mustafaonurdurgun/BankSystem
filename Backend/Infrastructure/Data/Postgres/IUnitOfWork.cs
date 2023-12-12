using Infrastructure.Data.Postgres.Repositories.Interface;

namespace Infrastructure.Data.Postgres;

public interface IUnitOfWork : IDisposable
{
    IUserRepository Users { get; }
    IUserTokenRepository UserTokens { get; }

    IAccountRepository Account { get; }
    ITransactionRepository Transaction { get; }
    IUsertransactionsRepository Usertransactions { get; }
    Task<int> CommitAsync();
}
