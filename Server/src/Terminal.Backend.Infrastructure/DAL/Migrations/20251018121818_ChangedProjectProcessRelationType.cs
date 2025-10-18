using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Terminal.Backend.Infrastructure.DAL.Migrations
{
    /// <inheritdoc />
    public partial class ChangedProjectProcessRelationType : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProcessTag_Samples_ProcessId",
                table: "ProcessTag");

            migrationBuilder.DropForeignKey(
                name: "FK_Samples_Projects_ProjectId",
                table: "Samples");

            migrationBuilder.DropForeignKey(
                name: "FK_Samples_Recipes_RecipeId",
                table: "Samples");

            migrationBuilder.DropForeignKey(
                name: "FK_SampleSteps_Samples_ProcessId",
                table: "SampleSteps");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Samples",
                table: "Samples");

            migrationBuilder.DropIndex(
                name: "IX_Samples_ProjectId",
                table: "Samples");

            migrationBuilder.DropColumn(
                name: "ProjectId",
                table: "Samples");

            migrationBuilder.RenameTable(
                name: "Samples",
                newName: "Processes");

            migrationBuilder.RenameColumn(
                name: "Code",
                table: "Processes",
                newName: "Sample");

            migrationBuilder.RenameIndex(
                name: "IX_Samples_RecipeId",
                table: "Processes",
                newName: "IX_Processes_RecipeId");

            migrationBuilder.RenameIndex(
                name: "IX_Samples_Code_Comment",
                table: "Processes",
                newName: "IX_Processes_Sample_Comment");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Processes",
                table: "Processes",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "ProjectProcess",
                columns: table => new
                {
                    ProcessId = table.Column<Guid>(type: "uuid", nullable: false),
                    ProjectId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProjectProcess", x => new { x.ProcessId, x.ProjectId });
                    table.ForeignKey(
                        name: "FK_ProjectProcess_Processes_ProcessId",
                        column: x => x.ProcessId,
                        principalTable: "Processes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ProjectProcess_Projects_ProjectId",
                        column: x => x.ProjectId,
                        principalTable: "Projects",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.UpdateData(
                table: "Permissions",
                keyColumn: "Id",
                keyValue: 17,
                column: "Name",
                value: "ProcessRead");

            migrationBuilder.UpdateData(
                table: "Permissions",
                keyColumn: "Id",
                keyValue: 18,
                column: "Name",
                value: "ProcessWrite");

            migrationBuilder.UpdateData(
                table: "Permissions",
                keyColumn: "Id",
                keyValue: 19,
                column: "Name",
                value: "ProcessUpdate");

            migrationBuilder.UpdateData(
                table: "Permissions",
                keyColumn: "Id",
                keyValue: 20,
                column: "Name",
                value: "ProcessDelete");

            migrationBuilder.CreateIndex(
                name: "IX_ProjectProcess_ProjectId",
                table: "ProjectProcess",
                column: "ProjectId");

            migrationBuilder.AddForeignKey(
                name: "FK_Processes_Recipes_RecipeId",
                table: "Processes",
                column: "RecipeId",
                principalTable: "Recipes",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_ProcessTag_Processes_ProcessId",
                table: "ProcessTag",
                column: "ProcessId",
                principalTable: "Processes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_SampleSteps_Processes_ProcessId",
                table: "SampleSteps",
                column: "ProcessId",
                principalTable: "Processes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Processes_Recipes_RecipeId",
                table: "Processes");

            migrationBuilder.DropForeignKey(
                name: "FK_ProcessTag_Processes_ProcessId",
                table: "ProcessTag");

            migrationBuilder.DropForeignKey(
                name: "FK_SampleSteps_Processes_ProcessId",
                table: "SampleSteps");

            migrationBuilder.DropTable(
                name: "ProjectProcess");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Processes",
                table: "Processes");

            migrationBuilder.RenameTable(
                name: "Processes",
                newName: "Samples");

            migrationBuilder.RenameColumn(
                name: "Sample",
                table: "Samples",
                newName: "Code");

            migrationBuilder.RenameIndex(
                name: "IX_Processes_Sample_Comment",
                table: "Samples",
                newName: "IX_Samples_Code_Comment");

            migrationBuilder.RenameIndex(
                name: "IX_Processes_RecipeId",
                table: "Samples",
                newName: "IX_Samples_RecipeId");

            migrationBuilder.AddColumn<Guid>(
                name: "ProjectId",
                table: "Samples",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddPrimaryKey(
                name: "PK_Samples",
                table: "Samples",
                column: "Id");

            migrationBuilder.UpdateData(
                table: "Permissions",
                keyColumn: "Id",
                keyValue: 17,
                column: "Name",
                value: "SampleRead");

            migrationBuilder.UpdateData(
                table: "Permissions",
                keyColumn: "Id",
                keyValue: 18,
                column: "Name",
                value: "SampleWrite");

            migrationBuilder.UpdateData(
                table: "Permissions",
                keyColumn: "Id",
                keyValue: 19,
                column: "Name",
                value: "SampleUpdate");

            migrationBuilder.UpdateData(
                table: "Permissions",
                keyColumn: "Id",
                keyValue: 20,
                column: "Name",
                value: "SampleDelete");

            migrationBuilder.CreateIndex(
                name: "IX_Samples_ProjectId",
                table: "Samples",
                column: "ProjectId");

            migrationBuilder.AddForeignKey(
                name: "FK_ProcessTag_Samples_ProcessId",
                table: "ProcessTag",
                column: "ProcessId",
                principalTable: "Samples",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Samples_Projects_ProjectId",
                table: "Samples",
                column: "ProjectId",
                principalTable: "Projects",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Samples_Recipes_RecipeId",
                table: "Samples",
                column: "RecipeId",
                principalTable: "Recipes",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_SampleSteps_Samples_ProcessId",
                table: "SampleSteps",
                column: "ProcessId",
                principalTable: "Samples",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
