using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Terminal.Backend.Infrastructure.DAL.Migrations
{
    /// <inheritdoc />
    public partial class ParametersDefaultValues : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<decimal>(
                name: "DecimalParameter_DefaultValue",
                table: "Parameters",
                type: "numeric",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "DefaultValue",
                table: "Parameters",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "TextParameter_DefaultValue",
                table: "Parameters",
                type: "bigint",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DecimalParameter_DefaultValue",
                table: "Parameters");

            migrationBuilder.DropColumn(
                name: "DefaultValue",
                table: "Parameters");

            migrationBuilder.DropColumn(
                name: "TextParameter_DefaultValue",
                table: "Parameters");
        }
    }
}
