using MediatR;

namespace Terminal.Backend.Application.Queries.Projects.Search;

public sealed class SearchProjectAmountQuery : IRequest<int>
{
  public int Amount { get; set; }
}