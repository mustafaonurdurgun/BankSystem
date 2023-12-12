
using Business.Models.Request.Create;
using Business.Models.Request.Update;
using Business.Models.Response;
using Business.Services.Base;
using Business.Services.Interface;
using Infrastructure.Data.Postgres.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Web.Controllers.Base;

namespace Web.Controllers;

  
    public class  AccountController : BaseCRUDController<Account, int, CreateAccountDTO, UpdateAccountDTO, AccountInfoDTO>
    {
        public AccountController(IAccountService service) : base(service)
        {
        }
    }



