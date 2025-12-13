using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Terminal.Backend.Core.Entities;
using Terminal.Backend.Core.ValueObjects;

namespace Terminal.Backend.Infrastructure.DAL.Configurations;

internal sealed class PrefixCounterConfiguration : IEntityTypeConfiguration<PrefixCounter>
{
    public void Configure(EntityTypeBuilder<PrefixCounter> builder)
    {
        builder.HasKey(pc => pc.Id);
        builder.Property(pc => pc.Id)
            .HasConversion(id => id.Value,
                id => new PrefixId(id));
        builder.Property(pc => pc.Prefix).IsRequired();
        builder.Property(pc => pc.LastValue).IsRequired();
        //builder.ToTable("PrefixCounters");
    }
}