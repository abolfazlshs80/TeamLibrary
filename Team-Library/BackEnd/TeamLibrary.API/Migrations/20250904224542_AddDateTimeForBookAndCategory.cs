using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TeamLibrary.API.Migrations
{
    /// <inheritdoc />
    public partial class AddDateTimeForBookAndCategory : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "CreateDateDatetime",
                table: "Categories",
                type: "TEXT",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "UpdateDateDatetime",
                table: "Categories",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "CreateDateDatetime",
                table: "Books",
                type: "TEXT",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "UpdateDateDatetime",
                table: "Books",
                type: "TEXT",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CreateDateDatetime",
                table: "Categories");

            migrationBuilder.DropColumn(
                name: "UpdateDateDatetime",
                table: "Categories");

            migrationBuilder.DropColumn(
                name: "CreateDateDatetime",
                table: "Books");

            migrationBuilder.DropColumn(
                name: "UpdateDateDatetime",
                table: "Books");
        }
    }
}
