using Infrastructure.Data.Postgres.Entities.Base;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Data.Postgres.Entities;

public class UserTransactions 
{
    [Key]
    public int UserTransactionsID { get; set; }
    public int UserID { get; set; }
    public User User { get; set; }
    public int TransactionID {get;set;}
    public Transaction Transaction { get;set;}
}
