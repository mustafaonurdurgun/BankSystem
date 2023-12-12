using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Models.Response;

public class TransactionInfoDTO
{
    public int Id { get; set; }
    public decimal Amount { get; set; }
    public string Description { get; set; }
    public int AccountID { get; set; }
    public AccountInfoDTO Account{ get; set; }
}
