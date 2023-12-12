

using Infrastructure.Data.Postgres.Entities;
using Infrastructure.Data.Postgres.EntityFramework;
using Infrastructure.Data.Postgres.Repositories.Base;
using Infrastructure.Data.Postgres.Repositories.Interface;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using System.Linq;

namespace Infrastructure.Data.Postgres.Repositories;

public class TransactionRepository : Repository<Transaction, int>, ITransactionRepository
{
    public TransactionRepository(PostgresContext postgresContext) : base(postgresContext)
    {

    }
    public async Task<IList<Transaction>> GetAllAsync(Expression<Func<Transaction, bool>>? filter = null)
    {
        IQueryable<Transaction> query = PostgresContext.Set<Transaction>();

        if (filter != null)
        {
            query = query.Where(filter);
        }

        var events = await query  
            .Include(u=>u.Account)
            .Include(U=>U.Account.User)
            .ToListAsync();

        return events;
    }
}
