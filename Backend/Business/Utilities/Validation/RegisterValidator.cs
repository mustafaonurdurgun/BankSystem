using Business.Models.Request.Create;
using FluentValidation;

namespace Business.Utilities.Validation;

public class RegisterValidator : AbstractValidator<RegisterDto>
{
    public RegisterValidator()
    {
        RuleFor(x => x.Email).NotEmpty().WithName("E-Mail").MinimumLength(8);
        RuleFor(x => x.UserName).NotEmpty().WithName("Kullanıcı Adı").MinimumLength(4);       
        RuleFor(x => x.Password).NotEmpty().WithName("Şifre").MinimumLength(8);
    }
}