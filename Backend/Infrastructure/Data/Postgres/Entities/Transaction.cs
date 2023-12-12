using Infrastructure.Data.Postgres.Entities.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Data.Postgres.Entities;

public class Transaction : Entity<int> 
{
    public decimal Amount { get; set; }
    public string Description { get; set; }
    public int AccountID { get; set; }
    public Account Account { get; set; }
    public IList<UserTransactions> UserTransactions { get; set; }
}
