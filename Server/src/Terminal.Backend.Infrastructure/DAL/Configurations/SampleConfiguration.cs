using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Terminal.Backend.Core.Entities;
using Terminal.Backend.Core.ValueObjects;
using Terminal.Backend.Infrastructure.DAL.ValueGenerators;

namespace Terminal.Backend.Infrastructure.DAL.Configurations;

internal sealed class SampleConfiguration : IEntityTypeConfiguration<Process>
{
    public void Configure(EntityTypeBuilder<Process> builder)
    {
        builder.HasKey(m => m.Id);

        builder.Property(m => m.Id)
            .HasConversion(i => i.Value,
                i => new ProcessId(i));
        builder.Property(m => m.Code)
            .HasConversion(c => c.Number,
                c => new Sample(c))
            .HasValueGenerator(typeof(SampleCodeValueGenerator));
        builder.Property(m => m.Comment)
            .HasConversion(c => c.Value,
                c => new Comment(c));

        builder
            .HasMany(m => m.Tags)
            .WithMany();

        builder.HasMany(m => m.Steps)
            .WithOne()
            .IsRequired()
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne(m => m.Recipe)
            .WithMany()
            .OnDelete(DeleteBehavior.SetNull);

        // search index
        builder
            .HasIndex(m => new { m.Code, m.Comment })
            .HasMethod("GIN")
            .IsTsVectorExpressionIndex("english");
    }
}