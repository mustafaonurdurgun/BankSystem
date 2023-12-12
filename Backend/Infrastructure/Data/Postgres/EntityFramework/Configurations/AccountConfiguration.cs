using Infrastructure.Data.Postgres.Entities;
using Infrastructure.Data.Postgres.EntityFramework.Configurations.Base;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Data.Postgres.EntityFramework.Configurations;

public class AccountConfiguration : BaseConfiguration<Account, int>
{
    public override void Configure(EntityTypeBuilder<Account> builder)
    {
        base.Configure(builder);
        builder.Property(u => u.Balance).IsRequired();
        builder.HasOne(u => u.User).WithMany(U => U.Accounts).HasForeignKey(u => u.UserId);
        builder.HasMany(u => u.Transactions)
             .WithOne(U => U.Account)
             .HasForeignKey(u => u.AccountID);
    }
}
