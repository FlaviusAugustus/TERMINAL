using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Terminal.Backend.Core.Entities;

public class ProcessConfiguration : IEntityTypeConfiguration<Process>
{
    public void Configure(EntityTypeBuilder<Process> builder)
    {

        builder.HasKey(p => p.Id);

        var codeConverter = new ValueConverter<Code, string>(
            code => code.ToString(),
            value => Code.Create(value)
        );

        builder.Property(p => p.CodeNumber)
               .HasConversion(codeConverter)
               .HasMaxLength(7)
               .IsRequired();
    }
}