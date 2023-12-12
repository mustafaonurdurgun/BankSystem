using Infrastructure.Data.Postgres.Entities;
using Infrastructure.Data.Postgres.EntityFramework.Configurations.Base;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Data.Postgres.EntityFramework.Configurations;

public class TransactionConfiguration : BaseConfiguration<Transaction, int>
{
    public override void Configure(EntityTypeBuilder<Transaction> builder)
    {
        base.Configure(builder);
        builder.Property(u => u.Amount).IsRequired();
        builder.Property(u => u.Description).IsRequired();
        builder
            .HasMany(u => u.UserTransactions)
            .WithOne(u => u.Transaction)
            .HasForeignKey(u => u.TransactionID);
        builder.HasOne(U=>U.Account)
            .WithMany(U=>U.Transactions)
            .HasForeignKey(U=>U.AccountID);
    }
}
