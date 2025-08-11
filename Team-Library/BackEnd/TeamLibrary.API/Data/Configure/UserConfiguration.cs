using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TeamLibrary.API.Data.Models;

namespace Diet.Persistence.EF.Configurations.User;

public class UserConfiguration : IEntityTypeConfiguration<Users>
{
    public void Configure(EntityTypeBuilder<Users> builder)
    {


    }

}
