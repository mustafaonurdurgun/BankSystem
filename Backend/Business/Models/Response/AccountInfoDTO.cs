
using Infrastructure.Data.Postgres.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Models.Response;

    public class AccountInfoDTO
    {
    public int Id { get; set; }
    public decimal Balance { get; set; }
    public int UserId { get; set; }
    public UserProfileDto User { get; set; }
}

