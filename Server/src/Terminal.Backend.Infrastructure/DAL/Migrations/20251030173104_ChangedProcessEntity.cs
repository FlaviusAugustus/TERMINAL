using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Terminal.Backend.Infrastructure.DAL.Migrations
{
    /// <inheritdoc />
    public partial class ChangedProcessEntity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Processes_Sample_Comment",
                table: "Processes");

            migrationBuilder.DropColumn(
                name: "Sample",
                table: "Processes");

            migrationBuilder.AlterColumn<int>(
                name: "CodeNumber",
                table: "Processes",
                type: "integer",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "character varying(7)",
                oldMaxLength: 7);

            migrationBuilder.AddColumn<string>(
                name: "CodePrefix",
                table: "Processes",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_Process_CodePrefix_CodeNumber",
                table: "Processes",
                columns: new[] { "CodePrefix", "CodeNumber" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Processes_Comment",
                table: "Processes",
                column: "Comment")
                .Annotation("Npgsql:IndexMethod", "GIN")
                .Annotation("Npgsql:TsVectorConfig", "english");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Process_CodePrefix_CodeNumber",
                table: "Processes");

            migrationBuilder.DropIndex(
                name: "IX_Processes_Comment",
                table: "Processes");

            migrationBuilder.DropColumn(
                name: "CodePrefix",
                table: "Processes");

            migrationBuilder.AlterColumn<string>(
                name: "CodeNumber",
                table: "Processes",
                type: "character varying(7)",
                maxLength: 7,
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AddColumn<decimal>(
                name: "Sample",
                table: "Processes",
                type: "numeric(20,0)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.CreateIndex(
                name: "IX_Processes_Sample_Comment",
                table: "Processes",
                columns: new[] { "Sample", "Comment" })
                .Annotation("Npgsql:IndexMethod", "GIN")
                .Annotation("Npgsql:TsVectorConfig", "english");
        }
    }
}
