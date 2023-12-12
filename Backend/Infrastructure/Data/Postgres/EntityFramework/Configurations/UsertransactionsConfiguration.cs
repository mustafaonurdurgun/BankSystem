   

using Infrastructure.Data.Postgres.Entities;
using Infrastructure.Data.Postgres.EntityFramework.Configurations.Base;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Data.Postgres.EntityFramework.Configurations;

public class UsertransactionsConfiguration : IEntityTypeConfiguration<UserTransactions>
{
    public void Configure(EntityTypeBuilder<UserTransactions> builder)
    {
        builder.HasKey(u => u.UserTransactionsID);
        builder.Property(u => u.UserTransactionsID).ValueGeneratedOnAdd();
        builder.Property(a => a.UserID);
        builder.Property(a => a.TransactionID);
    }
}


