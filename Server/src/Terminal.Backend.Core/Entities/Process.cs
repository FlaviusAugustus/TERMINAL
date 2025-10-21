using Terminal.Backend.Core.ValueObjects;

namespace Terminal.Backend.Core.Entities;

public sealed class Process
{
    public ProcessId Id { get; private set; }
    public Code CodeNumber { get; private set; }
    public Sample Sample { get; private set; }
    public DateTime CreatedAtUtc { get; private set; }
    public Comment Comment { get; private set; }
    public Recipe? Recipe { get; private set; }

    public ICollection<Project> Projects { get; private set; } = new HashSet<Project>();
    public ICollection<SampleStep> Steps { get; private set; } = new HashSet<SampleStep>();
    public ICollection<Tag> Tags { get; private set; } = new HashSet<Tag>();

    protected Process() { }

    public Process(ProcessId id, ICollection<Project> projects, Recipe? recipe, Comment comment, ICollection<SampleStep> steps, ICollection<Tag> tags)
    {
        Id = id;
        Recipe = recipe;
        Comment = comment;
        Steps = steps;
        Tags = tags;
        Projects = projects;
        CreatedAtUtc = DateTime.UtcNow;
    }

    public void Update(ICollection<Project> projects, Recipe? recipe, IEnumerable<SampleStep> steps, IEnumerable<Tag> tags, string comment)
    {
        Recipe = recipe;
        Comment = comment;

        this.Projects.Clear();
        foreach (var project in projects)
        {
            this.Projects.Add(project);
        }

        this.Tags.Clear();
        foreach (var tag in tags)
        {
            this.Tags.Add(tag);
        }

        var mergedSteps = this.Steps
            .Join(steps, s1 => s1.Id, s2 => s2.Id, (s1, s2) => (oldStep: s1, newStep: s2));

        foreach (var (oldStep, newStep) in mergedSteps)
        {
            oldStep.Update(newStep.Parameters, newStep.Comment);
        }
    }
}