using Infrastructure.Data.Postgres.Entities;
using Infrastructure.Data.Postgres.EntityFramework;
using Infrastructure.Data.Postgres.Repositories.Base;
using Infrastructure.Data.Postgres.Repositories.Interface;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System.Linq.Expressions;

namespace Infrastructure.Data.Postgres.Repositories;

public class UserRepository : Repository<User, int>, IUserRepository
{
    public UserRepository(PostgresContext postgresContext)
    : base(postgresContext) { }


    public async Task AddAsync(User entity)
    {
        // DateTime özelliklerini UTC'ye dönüştür
        entity = ConvertDateTimePropertiesToUtc(entity);

        await PostgresContext.Set<User>().AddAsync(entity);
    }
    private User ConvertDateTimePropertiesToUtc(User entity)
    {
        var properties = entity.GetType().GetProperties()
            .Where(prop => prop.PropertyType == typeof(DateTime) || prop.PropertyType == typeof(DateTime?));

        foreach (var property in properties)
        {
            var value = (DateTime?)property.GetValue(entity);
            if (value.HasValue)
            {
                // Zaman dilimini UTC'ye dönüştür
                property.SetValue(entity, value.Value.ToUniversalTime());
            }
        }

        return entity;
    }
    public async Task<IList<User>> GetAllAsync(Expression<Func<User, bool>>? filter = null)
    {
        var query = PostgresContext.Set<User>();

        if (filter != null)
        {
            query = (DbSet<User>)query.Where(filter);
        }

        var users = await query
            .Include(U=>U.Accounts)            
            .ToListAsync();
        return users;
    }
}
