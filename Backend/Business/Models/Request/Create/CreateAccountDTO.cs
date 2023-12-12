
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Models.Request.Create;

    public class CreateAccountDTO
    {
    public decimal Balance { get; set; } = 0;
    public int UserId { get; set; }
}



