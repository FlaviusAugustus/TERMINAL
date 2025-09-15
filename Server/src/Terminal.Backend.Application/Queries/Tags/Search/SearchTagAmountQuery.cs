using MediatR;

namespace Terminal.Backend.Application.Queries.Tags.Search;

public sealed class SearchTagAmountQuery : IRequest<int>
{
  public int Amount { get; set; }
}