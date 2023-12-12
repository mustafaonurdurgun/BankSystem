using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Models.Request.Update;

public class UpdateUsertransactionsDTO
{
    public int UserEventsID { get; set; }
    public int UserID { get; set; }
    public int TransactionID { get; set; }
}
