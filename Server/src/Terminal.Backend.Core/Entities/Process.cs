using Terminal.Backend.Core.ValueObjects;

namespace Terminal.Backend.Core.Entities;

public sealed class Process
{
    public ProcessId Id { get; private set; }
    public Sample Code { get; private set; }
    public DateTime CreatedAtUtc { get; private set; }
    public Comment Comment { get; private set; }

    public Project Project { get; private set; }
    public Recipe? Recipe { get; private set; }
    public ICollection<SampleStep> Steps { get; private set; } = new List<SampleStep>();
    public ICollection<Tag> Tags { get; private set; } = new List<Tag>();

    public Process(ProcessId id, Project project, Recipe? recipe, Comment comment, ICollection<SampleStep> steps,
        ICollection<Tag> tags)
    {
        Id = id;
        Recipe = recipe;
        Comment = comment;
        Steps = steps;
        Tags = tags;
        Project = project;
        CreatedAtUtc = DateTime.UtcNow;
    }

    private Process(ProcessId id, Sample code, DateTime createdAtUtc, Comment comment)
    {
        Id = id;
        Code = code;
        CreatedAtUtc = createdAtUtc;
        Comment = comment;
    }

    public void Update(Project project, Recipe? recipe, IEnumerable<SampleStep> steps, IEnumerable<Tag> tags,
        string comment)
    {
        Project = project;
        Recipe = recipe;
        var mergedSteps = Steps
            .Join(steps, s1 => s1.Id, s2 => s2.Id,
                (s1, s2) => new Tuple<SampleStep, SampleStep>(s1, s2));
        foreach (var (oldStep, newStep) in mergedSteps)
        {
            oldStep.Update(newStep.Parameters, newStep.Comment);
        }

        Tags = tags.ToList();
        Comment = comment;
    }
}