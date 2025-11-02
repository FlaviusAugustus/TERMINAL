using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Terminal.Backend.Core.Entities;
using Terminal.Backend.Core.ValueObjects;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace Terminal.Backend.Infrastructure.DAL.Configurations;

internal sealed class ProcessConfiguration : IEntityTypeConfiguration<Process>
{
    public void Configure(EntityTypeBuilder<Process> builder)
    {
        builder.OwnsOne(p => p.Code, codeBuilder =>
        {
            codeBuilder.Property(c => c.Prefix)
                .HasColumnName("CodePrefix")
                .IsRequired();

            codeBuilder.Property(c => c.SequentialNumber)
                .HasColumnName("CodeNumber")
                .IsRequired();

            codeBuilder.HasIndex("Prefix", "SequentialNumber")
                .IsUnique()
                .HasDatabaseName("IX_Process_CodePrefix_CodeNumber");
        });

        builder.HasKey(m => m.Id);

        builder.Property(m => m.Id)
            .HasConversion(i => i.Value,
                i => new ProcessId(i));

        builder.Property(m => m.Comment)
            .HasConversion(c => c.Value,
                c => new Comment(c));

        builder.HasMany(m => m.Tags).WithMany();
        builder.HasMany(m => m.Steps).WithOne().IsRequired().OnDelete(DeleteBehavior.Cascade);
        builder.HasOne(m => m.Recipe).WithMany().OnDelete(DeleteBehavior.SetNull);

        builder
            .HasIndex(m => m.Comment)
            .HasMethod("GIN")
            .IsTsVectorExpressionIndex("english");

        builder.HasMany(p => p.Projects)
            .WithMany(m => m.Processes)
            .UsingEntity(
                "ProjectProcess",
                l => l.HasOne(typeof(Project)).WithMany().HasForeignKey("ProjectId"),
                r => r.HasOne(typeof(Process)).WithMany().HasForeignKey("ProcessId")
            );
    }
}