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
        builder.Ignore(p => p.Prefix);
        // 1. Konfiguracja zagnieżdżonych Value Objects
        builder.OwnsOne(p => p.Code, codeBuilder =>
        {
            // Krok 1: Mapuj właściwość 'Prefix' (jako obiekt), a NIE 'Prefix.Value'
            codeBuilder.Property(c => c.Prefix)
                .HasConversion( // Konwertuj obiekt Prefix na string i z powrotem
                    prefix => prefix.Value, // Z obiektu Prefix do stringa (do bazy)
                    value => Prefix.Create(value)) // Ze stringa (z bazy) do obiektu Prefix
                .HasColumnName("CodePrefix") // Nazwij kolumnę
                .IsRequired();

            // Krok 2: Mapuj właściwość 'Number' (jako obiekt)
            codeBuilder.Property(c => c.Number)
                .HasConversion( // Konwertuj obiekt Number na int i z powrotem
                    number => number.Value, // Z obiektu Number do int (do bazy)
                    value => SequentialNumber.Create(value)) // Z int (z bazy) do obiektu Number
                .HasColumnName("CodeNumber") // Nazwij kolumnę
                .IsRequired();

            codeBuilder.HasIndex("Prefix", "Number")
                       .IsUnique()
                       .HasDatabaseName("IX_Process_CodePrefix_CodeNumber");
        });

        // --- Reszta Twojej konfiguracji ---

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

        // search index (Twoja istniejąca konfiguracja)
        builder
            .HasIndex(m => m.Comment)
            .HasMethod("GIN")
            .IsTsVectorExpressionIndex("english");

        // Konfiguracja M:M dla Projects
        builder.HasMany(p => p.Projects)
            .WithMany(m => m.Processes)
            .UsingEntity(
                "ProjectProcess",
                l => l.HasOne(typeof(Project)).WithMany().HasForeignKey("ProjectId"),
                r => r.HasOne(typeof(Process)).WithMany().HasForeignKey("ProcessId")
            );
    }
}