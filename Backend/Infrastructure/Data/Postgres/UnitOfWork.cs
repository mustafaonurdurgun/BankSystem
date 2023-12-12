using Core.Utilities;
using Infrastructure.Data.Postgres.Entities.Base.Interface;
using Infrastructure.Data.Postgres.EntityFramework;
using Infrastructure.Data.Postgres.Repositories;
using Infrastructure.Data.Postgres.Repositories.Interface;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data.Postgres;

public class UnitOfWork : IUnitOfWork
{    
    private UsertransactionsRepository? _UsertransactionsRepository;
    private TransactionRepository? _TransactionRepository;
    private UserRepository? _userRepository;
    private UserTokenRepository? _userTokenRepository;

    public UnitOfWork(PostgresContext postgresContext)
    {
        _postgresContext = postgresContext;
    }

    public IUserRepository Users => _userRepository ??= new UserRepository(_postgresContext);
    public IUserTokenRepository UserTokens =>
        _userTokenRepository ??= new UserTokenRepository(_postgresContext);
    public IAccountRepository Account =>
        _AccountRepository ??= new AccountRepository(_postgresContext);
    private readonly PostgresContext _postgresContext;
    public ITransactionRepository Transaction =>
        _TransactionRepository ??= new TransactionRepository(_postgresContext);
    private AccountRepository? _AccountRepository;
    public IUsertransactionsRepository Usertransactions =>
        _UsertransactionsRepository ??= new UsertransactionsRepository(_postgresContext);

    public async Task<int> CommitAsync()
    {
        var updatedEntities = _postgresContext.ChangeTracker
            .Entries<IEntity>()
            .Where(e => e.State == EntityState.Modified)
            .Select(e => e.Entity);

        foreach (var updatedEntity in updatedEntities)
        {
            updatedEntity.UpdatedAt = DateTime.UtcNow.ToTimeZone();
        }

        var result = await _postgresContext.SaveChangesAsync();

        return result;
    }

    public void Dispose()
    {
        _postgresContext.Dispose();
    }
}
