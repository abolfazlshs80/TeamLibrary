using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TeamLibrary.API.Migrations
{
    /// <inheritdoc />
    public partial class AddVerifyCodeUser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "VerifyCode",
                table: "Users",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "VerifyCodeExpireDate",
                table: "Users",
                type: "datetime2",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "VerifyCode",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "VerifyCodeExpireDate",
                table: "Users");
        }
    }
}
