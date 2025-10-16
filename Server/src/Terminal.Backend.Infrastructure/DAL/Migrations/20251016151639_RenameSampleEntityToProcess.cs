using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Terminal.Backend.Infrastructure.DAL.Migrations
{
    /// <inheritdoc />
    public partial class RenameSampleEntityToProcess : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SampleSteps_Samples_SampleId",
                table: "SampleSteps");

            migrationBuilder.DropTable(
                name: "SampleTag");

            migrationBuilder.RenameColumn(
                name: "SampleId",
                table: "SampleSteps",
                newName: "ProcessId");

            migrationBuilder.RenameIndex(
                name: "IX_SampleSteps_SampleId",
                table: "SampleSteps",
                newName: "IX_SampleSteps_ProcessId");

            migrationBuilder.CreateTable(
                name: "ProcessTag",
                columns: table => new
                {
                    ProcessId = table.Column<Guid>(type: "uuid", nullable: false),
                    TagsId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProcessTag", x => new { x.ProcessId, x.TagsId });
                    table.ForeignKey(
                        name: "FK_ProcessTag_Samples_ProcessId",
                        column: x => x.ProcessId,
                        principalTable: "Samples",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ProcessTag_Tags_TagsId",
                        column: x => x.TagsId,
                        principalTable: "Tags",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ProcessTag_TagsId",
                table: "ProcessTag",
                column: "TagsId");

            migrationBuilder.AddForeignKey(
                name: "FK_SampleSteps_Samples_ProcessId",
                table: "SampleSteps",
                column: "ProcessId",
                principalTable: "Samples",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SampleSteps_Samples_ProcessId",
                table: "SampleSteps");

            migrationBuilder.DropTable(
                name: "ProcessTag");

            migrationBuilder.RenameColumn(
                name: "ProcessId",
                table: "SampleSteps",
                newName: "SampleId");

            migrationBuilder.RenameIndex(
                name: "IX_SampleSteps_ProcessId",
                table: "SampleSteps",
                newName: "IX_SampleSteps_SampleId");

            migrationBuilder.CreateTable(
                name: "SampleTag",
                columns: table => new
                {
                    SampleId = table.Column<Guid>(type: "uuid", nullable: false),
                    TagsId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SampleTag", x => new { x.SampleId, x.TagsId });
                    table.ForeignKey(
                        name: "FK_SampleTag_Samples_SampleId",
                        column: x => x.SampleId,
                        principalTable: "Samples",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_SampleTag_Tags_TagsId",
                        column: x => x.TagsId,
                        principalTable: "Tags",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_SampleTag_TagsId",
                table: "SampleTag",
                column: "TagsId");

            migrationBuilder.AddForeignKey(
                name: "FK_SampleSteps_Samples_SampleId",
                table: "SampleSteps",
                column: "SampleId",
                principalTable: "Samples",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
