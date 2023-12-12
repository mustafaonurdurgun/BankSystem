

using Infrastructure.Data.Postgres.Entities;
using Infrastructure.Data.Postgres.EntityFramework;
using Infrastructure.Data.Postgres.Repositories.Base;
using Infrastructure.Data.Postgres.Repositories.Interface;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using System.Linq;

namespace Infrastructure.Data.Postgres.Repositories;

public class AccountRepository : Repository<Account, int>, IAccountRepository
{
    public AccountRepository(PostgresContext postgresContext) : base(postgresContext)
    {

    }
    public async Task<IList<Account>> GetAllAsync(Expression<Func<Account, bool>>? filter = null)
    {
        IQueryable<Account> query = PostgresContext.Set<Account>();

        if (filter != null)
        {
            query = query.Where(filter);
        }

        var events = await query
            .Include(r => r.User)            
            .ToListAsync();

        return events;
    }
}
