using System.ComponentModel.DataAnnotations;
using Terminal.Backend.Core.Entities.Parameters;
using Terminal.Backend.Core.ValueObjects;

namespace Terminal.Backend.Application.DTO.Parameters;

public sealed record CreateTextParameterDto(
    ParameterId Id, 
    string Name, 
    [Required, MinLength(1)]
    List<string> AllowedValues
    )
{
    public TextParameter AsParameter() => new(
        id: Id, 
        name: Name, 
        allowedValues: AllowedValues,
        defaultValue: AllowedValues[0]
    );
}