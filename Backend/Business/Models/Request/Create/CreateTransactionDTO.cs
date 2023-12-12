
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Models.Request.Create;

    public class CreateTransactionDTO
    {
    public decimal Amount { get; set; }
    public string Description { get; set; }
    public int AccountID { get; set; }
}



