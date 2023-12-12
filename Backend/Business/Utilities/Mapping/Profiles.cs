using Business.Models.Request.Create;
using Business.Models.Request.Update;
using Business.Models.Response;
using Infrastructure.Data.Postgres.Entities;

namespace Business.Utilities.Mapping;

public class Profiles : AutoMapper.Profile
{
    public Profiles()
    {
        CreateMap<RegisterDto, User>();
        CreateMap<User, UserProfileDto>();
        CreateMap<UserProfileUpdateDto, User>();
        CreateMap<ChangePasswordDTO, User>();

        CreateMap<UpdateAccountDTO,Account>();
        CreateMap<UpdateUsertransactionsDTO,UserTransactions>();
        CreateMap<UpdateTransactionDTO,Transaction>();

        CreateMap<CreateAccountDTO, Account>();
        CreateMap<CreateTransactionDTO, Transaction>();
        CreateMap<CreateUsertransactionsDTO, UserTransactions>();

        CreateMap<Account, AccountInfoDTO>();
        CreateMap<Transaction, TransactionInfoDTO>();
        CreateMap<UserTransactions, UserTransactionsInfoDTO>();

    }
    
}