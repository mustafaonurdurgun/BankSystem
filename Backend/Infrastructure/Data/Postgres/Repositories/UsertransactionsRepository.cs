

using Infrastructure.Data.Postgres.Entities;
using Infrastructure.Data.Postgres.EntityFramework;
using Infrastructure.Data.Postgres.Repositories.Base;
using Infrastructure.Data.Postgres.Repositories.Interface;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using System.Linq;

namespace Infrastructure.Data.Postgres.Repositories;

public class UsertransactionsRepository : Repository<UserTransactions, int>, IUsertransactionsRepository
{
    public UsertransactionsRepository(PostgresContext postgresContext) : base(postgresContext)
    {

    }
    public async Task<IList<UserTransactions>> GetAllAsync(Expression<Func<UserTransactions, bool>>? filter = null)
    {
        IQueryable<UserTransactions> query = PostgresContext.Set<UserTransactions>();

        if (filter != null)
        {
            query = query.Where(filter);
        }

        var events = await query
            .Include(r => r.User)
            .Include(r => r.Transaction)         
            .Include(u=>u.Transaction.Account)            
            .ToListAsync();

        return events;
    }
}
