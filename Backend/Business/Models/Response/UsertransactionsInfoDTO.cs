
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Models.Response;

    public class UserTransactionsInfoDTO
    {
    public int UserID { get; set; }
    public int TransactionID { get; set; }
    public UserProfileDto User { get; set; }
    public TransactionInfoDTO Transaction { get; set; }
}

