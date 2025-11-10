using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Terminal.Backend.Core.Entities;

namespace Terminal.Backend.Infrastructure.DAL.Configurations;

internal sealed class PrefixCounterConfiguration : IEntityTypeConfiguration<PrefixCounter>
{
    public void Configure(EntityTypeBuilder<PrefixCounter> builder)
    {
        builder.HasKey(pc => pc.Prefix);
        builder.Property(pc => pc.LastValue).IsRequired();
        //builder.ToTable("PrefixCounters");
    }
}