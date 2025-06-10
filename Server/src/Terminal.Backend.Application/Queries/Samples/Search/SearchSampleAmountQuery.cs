using MediatR;

namespace Terminal.Backend.Application.Queries.Samples.Search;

public sealed class SearchSampleAmountQuery : IRequest<int>
{
    public int Amount { get; set; }
}