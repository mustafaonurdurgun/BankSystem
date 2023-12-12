using Business.Models.Request.Create;
using Business.Models.Request.Functional;
using Business.Models.Request.Update;
using Business.Models.Response;
using Business.Services;
using Business.Services.Base.Interface;
using Business.Services.Interface;
using Core.Results;
using Infrastructure.Data.Postgres.Entities;
using Microsoft.AspNetCore.Mvc;
using Web.Controllers.Base;

namespace Web.Controllers
{
    public class UserController : BaseCRUDController<User, int, RegisterDto, UserProfileUpdateDto, UserProfileDto>
    {
        IUserService _service;
        public UserController(IUserService service) : base(service)
        {
            _service = service;
        }

        [HttpPut]
        public virtual async Task<ActionResult<Result>> ChangePassword(ChangePasswordDTO pwDto)
           => await _service.ChangePasswordAsync(pwDto);
    }
}
