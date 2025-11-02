using Microsoft.EntityFrameworkCore;
using Terminal.Backend.Application.Abstractions;
using Terminal.Backend.Core.Entities;
using Terminal.Backend.Core.Entities.Parameters;
using Terminal.Backend.Core.Entities.ParameterValues;
using Terminal.Backend.Core.ValueObjects;
using Terminal.Backend.Infrastructure.DAL;

namespace Terminal.Backend.Infrastructure;

internal sealed class TerminalDbSeeder
{
    private readonly TerminalDbContext _dbContext;
    private readonly ICodeGeneratorService _codeGenerator;

    public TerminalDbSeeder(TerminalDbContext dbContext, ICodeGeneratorService codeGenerator)
    {
        _dbContext = dbContext;
        _codeGenerator = codeGenerator;
    }

    public async Task SeedAsync(CancellationToken ct = default)
    {
        // KROK 1: Sprawdzenie idempotencji. 
        // Jeœli baza danych ma ju¿ jakiekolwiek projekty lub procesy,
        // zak³adamy, ¿e zosta³a zasiana i natychmiast wychodzimy.
        if (await _dbContext.Projects.AnyAsync(ct) || await _dbContext.Processes.AnyAsync(ct))
        {
            return;
        }

        #region prefixes
        // Dodajemy wszystkie prefixy, które bêd¹ u¿ywane.
        var prefixesToSeed = new[] { "AX", "BX", "CX", "DX", "EX", "FX" };
        foreach (var prefix in prefixesToSeed)
        {
            // Nie musimy sprawdzaæ, czy istniej¹, poniewa¿ wiemy z kroku 1,
            // ¿e baza danych jest pusta.
            _dbContext.PrefixCounters.Add(new PrefixCounter(prefix));
        }
        // USUNIÊTO SaveChangesAsync()
        #endregion

        #region tags
        var tag1 = new Tag(TagId.Create(), "new-sample");
        var tag2 = new Tag(TagId.Create(), "methane-rich");
        var tag3 = new Tag(TagId.Create(), "popular-sample");
        var tag4 = new Tag(TagId.Create(), "hot");
        var tag5 = new Tag(TagId.Create(), "high-pressure");
        _dbContext.Tags.AddRange(tag1, tag2, tag3, tag4, tag5);
        #endregion

        #region projects
        var projectUpturn = new Project(ProjectId.Create(), "Upturn");
        var projectBessy2 = new Project(ProjectId.Create(), "Bessy 2");
        var projectNitro = new Project(ProjectId.Create(), "Nitro");
        var projectNobelium = new Project(ProjectId.Create(), "Nobelium");
        _dbContext.Projects.AddRange(projectUpturn, projectBessy2, projectNitro, projectNobelium);
        #endregion

        #region parameters
        var bcParameter = new IntegerParameter(ParameterId.Create(), "B/C", "ppm", 1);
        var hydrogenParameter = new IntegerParameter(ParameterId.Create(), "H\u2082", "sccm", 1);
        var methaneParameter = new IntegerParameter(ParameterId.Create(), "CH\u2084", "sccm", 1);
        var diboranParameter = new IntegerParameter(ParameterId.Create(), "B\u2082H\u2086", "sccm", 1);
        var nucleationParameter = new TextParameter(ParameterId.Create(), "Nucleation Method",
            new List<string> { "spin-coating", "nucleation", "dip-coating", "without nucleation" },
            "spin-coating");
        var temperatureParameter = new IntegerParameter(ParameterId.Create(), "Temperature", "C\u2070", 1);
        var pressureParameter = new IntegerParameter(ParameterId.Create(), "Pressure", "Torr", 1);
        var powerParameter = new IntegerParameter(ParameterId.Create(), "Pmw", "W", 1);
        var timeParameter = new DecimalParameter(ParameterId.Create(), "Time", "h", 0.1m);
        var substrateParameter = new TextParameter(ParameterId.Create(), "Substrate",
            new List<string> { "silicon", "silicon dioxide", "glass", "tantalum" },
            "silicon");
        var bufferParameter = new DecimalParameter(ParameterId.Create(), "Buffer", "h", 0.1m);
        var additionalGasesParameter = new TextParameter(ParameterId.Create(), "Additional gases",
            new List<string> { "none", "nitrogen", "oxygen" }, "none", order: 12);
        var additionalGassesAmountParameter =
            new IntegerParameter(ParameterId.Create(), "Additional gases amount", "sccm", 1);
        additionalGassesAmountParameter.SetParent(additionalGasesParameter);

        // NAPRAWIONO: Usuniêto zduplikowane wywo³anie AddRange
        _dbContext.Parameters.AddRange(bufferParameter,
            substrateParameter,
            timeParameter,
            powerParameter,
            pressureParameter,
            temperatureParameter,
            nucleationParameter,
            diboranParameter,
            methaneParameter,
            bcParameter,
            hydrogenParameter,
            additionalGasesParameter,
            additionalGassesAmountParameter); // Dodano brakuj¹cy parametr
        #endregion

        #region Funkcja pomocnicza Step
        // KROK 3: Stworzenie funkcji pomocniczej (fabryki)
        // Tworzy ona NOW¥ INSTANCJÊ kroku za ka¿dym razem, gdy jest wywo³ywana.
        // To naprawia b³¹d ponownego u¿ycia 'step10' dla wielu procesów.
        SampleStep CreateNewSampleStep(string comment)
        {
            var step = new SampleStep(StepId.Create(), new Comment(comment));
            step.Parameters.Add(new IntegerParameterValue(ParameterValueId.Create(), bcParameter, 2000));
            step.Parameters.Add(new IntegerParameterValue(ParameterValueId.Create(), hydrogenParameter, 300));
            step.Parameters.Add(new IntegerParameterValue(ParameterValueId.Create(), methaneParameter, 100));
            step.Parameters.Add(new IntegerParameterValue(ParameterValueId.Create(), diboranParameter, 240));
            step.Parameters.Add(new TextParameterValue(ParameterValueId.Create(), nucleationParameter,
                nucleationParameter.AllowedValues.First()));
            step.Parameters.Add(new IntegerParameterValue(ParameterValueId.Create(), temperatureParameter, 800));
            step.Parameters.Add(new IntegerParameterValue(ParameterValueId.Create(), pressureParameter, 20));
            step.Parameters.Add(new IntegerParameterValue(ParameterValueId.Create(), powerParameter, 1300));
            step.Parameters.Add(new DecimalParameterValue(ParameterValueId.Create(), timeParameter, 2.3m));
            step.Parameters.Add(new TextParameterValue(ParameterValueId.Create(), substrateParameter,
                substrateParameter.AllowedValues.First()));
            step.Parameters.Add(new DecimalParameterValue(ParameterValueId.Create(), bufferParameter, 0.0m));
            step.Parameters.Add(new TextParameterValue(ParameterValueId.Create(), additionalGasesParameter,
                additionalGasesParameter.AllowedValues.First()));
            // Usuniêto zduplikowany 'bcParameter' z oryginalnego kodu
            return step;
        }
        #endregion

        #region samples

        // Definicje prefixów dla czytelnoœci
        var prefixAX = "AX";
        var prefixBX = "BX";
        var prefixCX = "CX";
        var prefixDX = "DX";
        var prefixEX = "EX";
        var prefixFX = "FX";

        // USUNIÊTO wszystkie 'await _dbContext.SaveChangesAsync()'

        _dbContext.Processes.Add(new Process(ProcessId.Create(), await _codeGenerator.GenerateNextCodeAsync(prefixAX, ct),
            new List<Project> { projectUpturn }, null, new Comment("First process!"),
            new List<SampleStep> { CreateNewSampleStep("Step for Process 1") }, new List<Tag> { tag1, tag3, tag5 }));

        _dbContext.Processes.Add(new Process(ProcessId.Create(), await _codeGenerator.GenerateNextCodeAsync(prefixAX, ct),
            new List<Project> { projectUpturn, projectBessy2 }, null, new Comment("Process 2"),
            new List<SampleStep> { CreateNewSampleStep("Step for Process 2") }, new List<Tag> { tag1, tag3, tag5 }));

        _dbContext.Processes.Add(new Process(ProcessId.Create(), await _codeGenerator.GenerateNextCodeAsync(prefixAX, ct),
            new List<Project> { projectUpturn, projectBessy2 }, null, new Comment("Process 3"),
            new List<SampleStep> { CreateNewSampleStep("Step for Process 3") }, new List<Tag> { tag1, tag3, tag5 }));

        _dbContext.Processes.Add(new Process(ProcessId.Create(), await _codeGenerator.GenerateNextCodeAsync(prefixAX, ct),
            new List<Project> { projectUpturn, projectBessy2 }, null, new Comment("Process 4"),
            new List<SampleStep> { CreateNewSampleStep("Step for Process 4") }, new List<Tag> { tag1, tag3, tag5 }));

        _dbContext.Processes.Add(new Process(ProcessId.Create(), await _codeGenerator.GenerateNextCodeAsync(prefixAX, ct),
            new List<Project> { projectUpturn, projectNitro }, null, new Comment("Process 5"),
            new List<SampleStep> { CreateNewSampleStep("Step for Process 5") }, new List<Tag> { tag1, tag3, tag5 }));

        _dbContext.Processes.Add(new Process(ProcessId.Create(), await _codeGenerator.GenerateNextCodeAsync(prefixAX, ct),
            new List<Project> { projectUpturn, projectNitro }, null, new Comment("Process 6"),
            new List<SampleStep> { CreateNewSampleStep("Step for Process 6") }, new List<Tag> { tag1, tag3, tag5 }));

        _dbContext.Processes.Add(new Process(ProcessId.Create(), await _codeGenerator.GenerateNextCodeAsync(prefixAX, ct),
            new List<Project> { projectNitro, projectNobelium }, null, new Comment("Process 7"),
            new List<SampleStep> { CreateNewSampleStep("Step for Process 7") }, new List<Tag> { tag1, tag3, tag5 }));

        _dbContext.Processes.Add(new Process(ProcessId.Create(), await _codeGenerator.GenerateNextCodeAsync(prefixBX, ct),
            new List<Project> { projectUpturn, projectNitro, projectNobelium }, null, new Comment("Process 8"),
            new List<SampleStep> { CreateNewSampleStep("Step for Process 8") }, new List<Tag> { tag1, tag3, tag5 }));

        _dbContext.Processes.Add(new Process(ProcessId.Create(), await _codeGenerator.GenerateNextCodeAsync(prefixBX, ct),
            new List<Project> { projectUpturn, projectNitro, projectNobelium }, null, new Comment("Process 9"),
            new List<SampleStep> { CreateNewSampleStep("Step for Process 9") }, new List<Tag> { tag1, tag3, tag5 }));

        _dbContext.Processes.Add(new Process(ProcessId.Create(), await _codeGenerator.GenerateNextCodeAsync(prefixBX, ct),
            new List<Project> { projectUpturn, projectNitro, projectNobelium }, null, new Comment("Process 10"),
            new List<SampleStep> { CreateNewSampleStep("Step for Process 10") }, new List<Tag> { tag1, tag3, tag5 }));

        // Poni¿sze procesy s¹ teraz POPRAWNE, poniewa¿ 'CreateNewSampleStep'
        // tworzy nowe obiekty 'SampleStep' zamiast ponownie u¿ywaæ 'step10'.

        _dbContext.Processes.Add(new Process(ProcessId.Create(), await _codeGenerator.GenerateNextCodeAsync(prefixBX, ct),
            new List<Project> { projectUpturn, projectNitro, projectNobelium }, null, new Comment("Process 11"),
            new List<SampleStep> { CreateNewSampleStep("Step for Process 11") }, new List<Tag> { tag1, tag3, tag5 }));

        _dbContext.Processes.Add(new Process(ProcessId.Create(), await _codeGenerator.GenerateNextCodeAsync(prefixBX, ct),
            new List<Project> { projectUpturn, projectNitro, projectNobelium }, null, new Comment("Process 12"),
            new List<SampleStep> { CreateNewSampleStep("Step for Process 12") }, new List<Tag> { tag1, tag3, tag5 }));

        _dbContext.Processes.Add(new Process(ProcessId.Create(), await _codeGenerator.GenerateNextCodeAsync(prefixBX, ct),
            new List<Project> { projectUpturn, projectNitro, projectNobelium }, null, new Comment("Process 13"),
            new List<SampleStep> { CreateNewSampleStep("Step for Process 13") }, new List<Tag> { tag1, tag3, tag5 }));

        _dbContext.Processes.Add(new Process(ProcessId.Create(), await _codeGenerator.GenerateNextCodeAsync(prefixCX, ct),
            new List<Project> { projectUpturn, projectNitro, projectNobelium }, null, new Comment("Process 14"),
            new List<SampleStep> { CreateNewSampleStep("Step for Process 14") }, new List<Tag> { tag1, tag3, tag5 }));
        _dbContext.Processes.Add(new Process(ProcessId.Create(), await _codeGenerator.GenerateNextCodeAsync(prefixBX, ct),
                    new List<Project> { projectUpturn, projectNitro, projectNobelium }, null, new Comment("Process 45"),
                    new List<SampleStep> { CreateNewSampleStep("Step for Process 45") }, new List<Tag> { tag1, tag3, tag5 }));

        #endregion

        await _dbContext.SaveChangesAsync(ct);
    }

}