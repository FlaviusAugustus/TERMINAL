using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Terminal.Backend.Core.Entities;
using Terminal.Backend.Core.ValueObjects;
using Terminal.Backend.Infrastructure.DAL.ValueGenerators;

namespace Terminal.Backend.Infrastructure.DAL.Configurations;

internal sealed class ProcessConfiguration : IEntityTypeConfiguration<Process>
{
    public void Configure(EntityTypeBuilder<Process> builder)
    {
        builder.HasKey(m => m.Id);

        builder.Property(m => m.Id)
            .HasConversion(i => i.Value,
                i => new ProcessId(i));
        builder.Property(m => m.Sample)
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
            .HasIndex(m => new { m.Sample, m.Comment })
            .HasMethod("GIN")
            .IsTsVectorExpressionIndex("english");
        builder.HasMany(p => p.Projects)
            .WithMany(m => m.Processes)
            .UsingEntity(
                "ProjectProcess",
                l => l.HasOne(typeof(Project))
                        .WithMany()
                        .HasForeignKey("ProjectId"),
                //.OnDelete(DeleteBehavior.Cascade)
                //.IsRequired(),
                r => r.HasOne(typeof(Process))
                        .WithMany()
                        .HasForeignKey("ProcessId")
            //.OnDelete(DeleteBehavior.Cascade)
            //.IsRequired()
            );
    }
}