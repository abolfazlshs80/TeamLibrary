using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TeamLibrary.API.Migrations
{
    /// <inheritdoc />
<<<<<<<< HEAD:Team-Library/BackEnd/TeamLibrary.API/Migrations/20250917203803_AddUserTypeinUser.cs
    public partial class AddUserTypeinUser : Migration
========
    public partial class AddViewCountToBook : Migration
>>>>>>>> 41dcbf09c5b07749dc41df22db885d371ae92133:Team-Library/BackEnd/TeamLibrary.API/Migrations/20250924190442_AddViewCountToBook.cs
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
<<<<<<<< HEAD:Team-Library/BackEnd/TeamLibrary.API/Migrations/20250917203803_AddUserTypeinUser.cs
                name: "UserType",
                table: "Users",
========
                name: "ViewCount",
                table: "Books",
>>>>>>>> 41dcbf09c5b07749dc41df22db885d371ae92133:Team-Library/BackEnd/TeamLibrary.API/Migrations/20250924190442_AddViewCountToBook.cs
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
<<<<<<<< HEAD:Team-Library/BackEnd/TeamLibrary.API/Migrations/20250917203803_AddUserTypeinUser.cs
                name: "UserType",
                table: "Users");
========
                name: "ViewCount",
                table: "Books");
>>>>>>>> 41dcbf09c5b07749dc41df22db885d371ae92133:Team-Library/BackEnd/TeamLibrary.API/Migrations/20250924190442_AddViewCountToBook.cs
        }
    }
}
