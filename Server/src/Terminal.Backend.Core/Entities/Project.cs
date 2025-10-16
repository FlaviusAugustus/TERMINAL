using Terminal.Backend.Core.ValueObjects;

namespace Terminal.Backend.Core.Entities;

public sealed class Project
{
    public ProjectId Id { get; private set; }
    public string Name { get; private set; }
    public bool IsActive { get; private set; }

    public ICollection<Process> Samples { get; private set; } = new List<Process>();

    public Project(ProjectId id, string name, bool isActive = true)
    {
        Id = id;
        Name = name;
        IsActive = isActive;
    }

    public void ChangeStatus(bool isActive)
    {
        IsActive = isActive;
    }

    public void Update(ProjectName name)
    {
        Name = name;
    }
}