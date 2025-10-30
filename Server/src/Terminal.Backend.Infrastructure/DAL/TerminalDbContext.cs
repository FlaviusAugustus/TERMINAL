using Microsoft.EntityFrameworkCore;
using System.Data;
using Terminal.Backend.Core.Entities;
using Terminal.Backend.Core.Entities.Parameters;
using Terminal.Backend.Core.Entities.ParameterValues;

namespace Terminal.Backend.Infrastructure.DAL;

internal sealed class TerminalDbContext : DbContext
{
    public DbSet<Project> Projects { get; set; }
    public DbSet<Process> Processes { get; set; }
    public DbSet<RecipeStep> RecipeSteps { get; set; }
    public DbSet<SampleStep> SampleSteps { get; set; }
    public DbSet<Recipe> Recipes { get; set; }
    public DbSet<Parameter> Parameters { get; set; }
    public DbSet<IntegerParameter> IntegerParameters { get; set; }
    public DbSet<DecimalParameter> DecimalParameters { get; set; }
    public DbSet<TextParameter> TextParameters { get; set; }
    public DbSet<NumericParameter> NumericParameters { get; set; }
    public DbSet<ParameterValue> ParameterValues { get; set; }
    public DbSet<IntegerParameterValue> IntegerParameterValues { get; set; }
    public DbSet<DecimalParameterValue> DecimalParameterValues { get; set; }
    public DbSet<TextParameterValue> TextParameterValues { get; set; }
    public DbSet<Tag> Tags { get; set; }
    public DbSet<User> Users { get; set; }
    public DbSet<Invitation> Invitations { get; set; }
    public DbSet<Role> Roles { get; set; }
    public DbSet<Permission> Permissions { get; set; }

    public TerminalDbContext(DbContextOptions<TerminalDbContext> options) : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(GetType().Assembly);
    }

    private void GenerateSequentialCodes()
    {
        var newProcesses = ChangeTracker.Entries<Process>()
            .Where(e => e.State == EntityState.Added && e.Entity.Code == null)
            .Select(e => e.Entity)
            .ToList();

        if (!newProcesses.Any())
        {
            return;
        }

        var processesByPrefix = newProcesses.GroupBy(p => p.Prefix.Value);

        foreach (var group in processesByPrefix)
        {
            var prefixValue = group.Key;

            var maxSequentialNumber = Processes
                .IgnoreQueryFilters()
                .Where(p => p.Prefix.Value == prefixValue)
                .Select(p => p.Code.Number.Value)
                .DefaultIfEmpty(0)
                .Max();

            foreach (var process in group)
            {
                if (process.Prefix == null)
                {
                    throw new InvalidOperationException("The prefix must be set on the Process entity before generating the code.");
                }

                maxSequentialNumber++;

                var newPrefix = process.Prefix;
                var newNumber = SequentialNumber.Create(maxSequentialNumber);
                process.Code = Code.Create(newPrefix, newNumber);
            }
        }
    }

    public override int SaveChanges()
    {
        using var transaction = Database.BeginTransaction(IsolationLevel.RepeatableRead);
        try
        {
            GenerateSequentialCodes();
            var result = base.SaveChanges();
            transaction.Commit();
            return result;
        }
        catch (Exception)
        {
            transaction.Rollback();
            throw;
        }
    }

    public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        await using var transaction = await Database.BeginTransactionAsync(IsolationLevel.RepeatableRead, cancellationToken);
        try
        {
            GenerateSequentialCodes();
            var result = await base.SaveChangesAsync(cancellationToken);
            await transaction.CommitAsync(cancellationToken);
            return result;
        }
        catch (Exception)
        {
            await transaction.RollbackAsync(cancellationToken);
            throw;
        }
    }
}