using MediatR;

namespace Terminal.Backend.Application.Queries.Processes.Search;

public sealed class SearchProcessAmountQuery : IRequest<int>
{
  public int Amount { get; set; }
}