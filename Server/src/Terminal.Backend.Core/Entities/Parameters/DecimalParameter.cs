using Terminal.Backend.Core.ValueObjects;

namespace Terminal.Backend.Core.Entities.Parameters;

public sealed class DecimalParameter : NumericParameter
{
    public decimal Step { get; private set; }
    public decimal DefaultValue { get; private set; }

    public DecimalParameter(ParameterId id,
        ParameterName name,
        string unit,
        decimal step,
        uint order = 0,
        bool isActive = true) :
        base(id, name, unit, order, isActive)
    {
        Step = step;
        DefaultValue = step;
    }
}