using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore.ValueGeneration;
using Terminal.Backend.Core.ValueObjects;

namespace Terminal.Backend.Infrastructure.DAL.ValueGenerators;

internal sealed class SampleCodeValueGenerator : ValueGenerator<Sample>
{
    public override bool GeneratesTemporaryValues => false;

    private const ulong InitialNumberValue = 1;

    public override Sample Next(EntityEntry entry)
    {
        var dbContext = entry.Context as TerminalDbContext ?? throw new InvalidDataException();
        var lastCodeNumber = dbContext.Samples
            .OrderBy(m => m.Code)
            .Select(m => m.Code)
            .LastOrDefault()?.Number;

        return lastCodeNumber is null
            ? new Sample(InitialNumberValue)
            : new Sample((ulong)(lastCodeNumber + 1));
    }

    public override async ValueTask<Sample> NextAsync(EntityEntry entry, CancellationToken ct = default)
    {
        var dbContext = entry.Context as TerminalDbContext ?? throw new InvalidDataException(); // FIXME
        var lastCodeNumber = (await dbContext.Samples.OrderBy(m => m.Code).LastOrDefaultAsync(ct))
            ?.Code.Number;

        return lastCodeNumber is null
            ? new Sample(InitialNumberValue)
            : new Sample((ulong)(lastCodeNumber + 1));
    }
}