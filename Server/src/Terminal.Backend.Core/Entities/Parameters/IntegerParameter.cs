using Terminal.Backend.Core.ValueObjects;

namespace Terminal.Backend.Core.Entities.Parameters;

public sealed class IntegerParameter : NumericParameter
{
    public int Step { get; private set; }
    public int DefaultValue { get; private set; }

    public IntegerParameter(ParameterId id,
        ParameterName name,
        string unit,
        int step,
        uint order = 0,
        bool isActive = true) :
        base(id, name, unit, order, isActive)
    {
        Step = step;
        DefaultValue = step;
    }
}