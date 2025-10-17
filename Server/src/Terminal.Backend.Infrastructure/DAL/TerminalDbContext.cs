using Microsoft.EntityFrameworkCore;
using Terminal.Backend.Core.Entities;
using Terminal.Backend.Core.Entities.Parameters;
using Terminal.Backend.Core.Entities.ParameterValues;

namespace Terminal.Backend.Infrastructure.DAL;

internal sealed class TerminalDbContext : DbContext
{
    public DbSet<Project> Projects { get; set; }
    public DbSet<Sample> Samples { get; set; }
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
}