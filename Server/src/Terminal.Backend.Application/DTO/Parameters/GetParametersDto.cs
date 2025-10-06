using System.Text.Json.Serialization;

namespace Terminal.Backend.Application.DTO.Parameters;

public class GetParametersDto
{
    public IEnumerable<GetParameterDto> Parameters { get; set; }
}

[JsonDerivedType(typeof(GetTextParameterDto), "text")]
[JsonDerivedType(typeof(GetDecimalParameterDto), typeDiscriminator: "decimal")]
[JsonDerivedType(typeof(GetIntegerParameterDto), typeDiscriminator: "integer")]
public abstract record GetParameterDto(Guid Id, string Name, uint Order, Guid? ParentId = null);

public sealed record GetTextParameterDto(
    Guid Id,
    string Name,
    IEnumerable<string> AllowedValues,
    uint Order,
    uint DefaultValue,
    Guid? ParentId = null)
    : GetParameterDto(Id, Name, Order, ParentId);

public abstract record GetNumericParameterDto(Guid Id, string Name, string Unit, uint Order, Guid? ParentId = null)
    : GetParameterDto(Id, Name, Order, ParentId);

public sealed record GetDecimalParameterDto(
    Guid Id,
    string Name,
    string Unit,
    decimal Step,
    uint Order,
    decimal DefaultValue,
    Guid? ParentId = null)
    : GetNumericParameterDto(Id, Name, Unit, Order, ParentId);

public sealed record GetIntegerParameterDto(
    Guid Id,
    string Name,
    string Unit,
    int Step,
    uint Order,
    int DefaultValue,
    Guid? ParentId = null)
    : GetNumericParameterDto(Id, Name, Unit, Order, ParentId);