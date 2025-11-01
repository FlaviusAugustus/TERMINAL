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

    public async Task SeedAsync(CancellationToken ct = default)
    {
        #region prefixes

        var prefixesToSeed = new[] { "AX", "BX", "CX" };
        var existingPrefixes = await _dbContext.PrefixCounters
            .Where(pc => prefixesToSeed.Contains(pc.Prefix))
            .Select(pc => pc.Prefix.Value.ToString())
            .ToHashSetAsync(ct);

        foreach (var prefix in prefixesToSeed)
        {
            if (!existingPrefixes.Contains(prefix))
            {
                _dbContext.PrefixCounters.Add(new PrefixCounter(Prefix.Create(prefix)));
            }
        }
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
            new List<string>
            {
                "spin-coating",
                "nucleation",
                "dip-coating",
                "without nucleation"
            },
            "spin-coating");
        var temperatureParameter = new IntegerParameter(ParameterId.Create(), "Temperature", "C\u2070", 1);
        var pressureParameter = new IntegerParameter(ParameterId.Create(), "Pressure", "Torr", 1);
        var powerParameter = new IntegerParameter(ParameterId.Create(), "Pmw", "W", 1);
        var timeParameter = new DecimalParameter(ParameterId.Create(), "Time", "h", 0.1m);
        var substrateParameter = new TextParameter(ParameterId.Create(), "Substrate",
            new List<string>
            {
                "silicon",
                "silicon dioxide",
                "glass",
                "tantalum"
            },
            "silicon");
        var bufferParameter = new DecimalParameter(ParameterId.Create(), "Buffer", "h", 0.1m);
        var additionalGasesParameter = new TextParameter(ParameterId.Create(), "Additional gases",
            new List<string> { "none", "nitrogen", "oxygen" }, "none", order: 12);
        var additionalGassesAmountParameter =
            new IntegerParameter(ParameterId.Create(), "Additional gases amount", "sccm", 1);
        additionalGassesAmountParameter.SetParent(additionalGasesParameter);
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
            additionalGassesAmountParameter);

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
            additionalGasesParameter);

        #endregion

        #region steps

        var step1 = new SampleStep(StepId.Create(), new Comment("First step!"));
        step1.Parameters.Add(new IntegerParameterValue(ParameterValueId.Create(), bcParameter, 2000));
        step1.Parameters.Add(new IntegerParameterValue(ParameterValueId.Create(), hydrogenParameter, 300));
        step1.Parameters.Add(new IntegerParameterValue(ParameterValueId.Create(), methaneParameter, 100));
        step1.Parameters.Add(new IntegerParameterValue(ParameterValueId.Create(), diboranParameter, 240));
        step1.Parameters.Add(new TextParameterValue(ParameterValueId.Create(), nucleationParameter,
            nucleationParameter.AllowedValues.First()));
        step1.Parameters.Add(new IntegerParameterValue(ParameterValueId.Create(), temperatureParameter, 800));
        step1.Parameters.Add(new IntegerParameterValue(ParameterValueId.Create(), pressureParameter, 20));
        step1.Parameters.Add(new IntegerParameterValue(ParameterValueId.Create(), powerParameter, 1300));
        step1.Parameters.Add(new DecimalParameterValue(ParameterValueId.Create(), timeParameter, 2.3m));
        step1.Parameters.Add(new TextParameterValue(ParameterValueId.Create(), substrateParameter,
            substrateParameter.AllowedValues.First()));
        step1.Parameters.Add(new DecimalParameterValue(ParameterValueId.Create(), bufferParameter, 0.0m));
        step1.Parameters.Add(new TextParameterValue(ParameterValueId.Create(), additionalGasesParameter,
            additionalGasesParameter.AllowedValues.First()));
        step1.Parameters.Add(new IntegerParameterValue(ParameterValueId.Create(), bcParameter, 2000));

        var step2 = new SampleStep(StepId.Create(), new Comment("First step!"));
        step2.Parameters.Add(new IntegerParameterValue(ParameterValueId.Create(), bcParameter, 2000));
        step2.Parameters.Add(new IntegerParameterValue(ParameterValueId.Create(), hydrogenParameter, 300));
        step2.Parameters.Add(new IntegerParameterValue(ParameterValueId.Create(), methaneParameter, 100));
        step2.Parameters.Add(new IntegerParameterValue(ParameterValueId.Create(), diboranParameter, 240));
        step2.Parameters.Add(new TextParameterValue(ParameterValueId.Create(), nucleationParameter,
            nucleationParameter.AllowedValues.First()));
        step2.Parameters.Add(new IntegerParameterValue(ParameterValueId.Create(), temperatureParameter, 800));
        step2.Parameters.Add(new IntegerParameterValue(ParameterValueId.Create(), pressureParameter, 20));
        step2.Parameters.Add(new IntegerParameterValue(ParameterValueId.Create(), powerParameter, 1300));
        step2.Parameters.Add(new DecimalParameterValue(ParameterValueId.Create(), timeParameter, 2.3m));
        step2.Parameters.Add(new TextParameterValue(ParameterValueId.Create(), substrateParameter,
            substrateParameter.AllowedValues.First()));
        step2.Parameters.Add(new DecimalParameterValue(ParameterValueId.Create(), bufferParameter, 0.0m));
        step2.Parameters.Add(new TextParameterValue(ParameterValueId.Create(), additionalGasesParameter,
            additionalGasesParameter.AllowedValues.First()));

        var step3 = new SampleStep(StepId.Create(), new Comment("First step!"));
        step3.Parameters.Add(new IntegerParameterValue(ParameterValueId.Create(), bcParameter, 2000));
        step3.Parameters.Add(new IntegerParameterValue(ParameterValueId.Create(), hydrogenParameter, 300));
        step3.Parameters.Add(new IntegerParameterValue(ParameterValueId.Create(), methaneParameter, 100));
        step3.Parameters.Add(new IntegerParameterValue(ParameterValueId.Create(), diboranParameter, 240));
        step3.Parameters.Add(new TextParameterValue(ParameterValueId.Create(), nucleationParameter,
            nucleationParameter.AllowedValues.First()));
        step3.Parameters.Add(new IntegerParameterValue(ParameterValueId.Create(), temperatureParameter, 800));
        step3.Parameters.Add(new IntegerParameterValue(ParameterValueId.Create(), pressureParameter, 20));
        step3.Parameters.Add(new IntegerParameterValue(ParameterValueId.Create(), powerParameter, 1300));
        step3.Parameters.Add(new DecimalParameterValue(ParameterValueId.Create(), timeParameter, 2.3m));
        step3.Parameters.Add(new TextParameterValue(ParameterValueId.Create(), substrateParameter,
            substrateParameter.AllowedValues.First()));
        step3.Parameters.Add(new DecimalParameterValue(ParameterValueId.Create(), bufferParameter, 0.0m));
        step3.Parameters.Add(new TextParameterValue(ParameterValueId.Create(), additionalGasesParameter,
            additionalGasesParameter.AllowedValues.First()));

        var step4 = new SampleStep(StepId.Create(), new Comment("First step!"));
        step4.Parameters.Add(new IntegerParameterValue(ParameterValueId.Create(), bcParameter, 2000));
        step4.Parameters.Add(new IntegerParameterValue(ParameterValueId.Create(), hydrogenParameter, 300));
        step4.Parameters.Add(new IntegerParameterValue(ParameterValueId.Create(), methaneParameter, 100));
        step4.Parameters.Add(new IntegerParameterValue(ParameterValueId.Create(), diboranParameter, 240));
        step4.Parameters.Add(new TextParameterValue(ParameterValueId.Create(), nucleationParameter,
            nucleationParameter.AllowedValues.First()));
        step4.Parameters.Add(new IntegerParameterValue(ParameterValueId.Create(), temperatureParameter, 800));
        step4.Parameters.Add(new IntegerParameterValue(ParameterValueId.Create(), pressureParameter, 20));
        step4.Parameters.Add(new IntegerParameterValue(ParameterValueId.Create(), powerParameter, 1300));
        step4.Parameters.Add(new DecimalParameterValue(ParameterValueId.Create(), timeParameter, 2.3m));
        step4.Parameters.Add(new TextParameterValue(ParameterValueId.Create(), substrateParameter,
            substrateParameter.AllowedValues.First()));
        step4.Parameters.Add(new DecimalParameterValue(ParameterValueId.Create(), bufferParameter, 0.0m));
        step4.Parameters.Add(new TextParameterValue(ParameterValueId.Create(), additionalGasesParameter,
            additionalGasesParameter.AllowedValues.First()));


        var step5 = new SampleStep(StepId.Create(), new Comment("First step!"));
        step5.Parameters.Add(new IntegerParameterValue(ParameterValueId.Create(), bcParameter, 2000));
        step5.Parameters.Add(new IntegerParameterValue(ParameterValueId.Create(), hydrogenParameter, 300));
        step5.Parameters.Add(new IntegerParameterValue(ParameterValueId.Create(), methaneParameter, 100));
        step5.Parameters.Add(new IntegerParameterValue(ParameterValueId.Create(), diboranParameter, 240));
        step5.Parameters.Add(new TextParameterValue(ParameterValueId.Create(), nucleationParameter,
            nucleationParameter.AllowedValues.First()));
        step5.Parameters.Add(new IntegerParameterValue(ParameterValueId.Create(), temperatureParameter, 800));
        step5.Parameters.Add(new IntegerParameterValue(ParameterValueId.Create(), pressureParameter, 20));
        step5.Parameters.Add(new IntegerParameterValue(ParameterValueId.Create(), powerParameter, 1300));
        step5.Parameters.Add(new DecimalParameterValue(ParameterValueId.Create(), timeParameter, 2.3m));
        step5.Parameters.Add(new TextParameterValue(ParameterValueId.Create(), substrateParameter,
            substrateParameter.AllowedValues.First()));
        step5.Parameters.Add(new DecimalParameterValue(ParameterValueId.Create(), bufferParameter, 0.0m));
        step5.Parameters.Add(new TextParameterValue(ParameterValueId.Create(), additionalGasesParameter,
            additionalGasesParameter.AllowedValues.First()));

        var step6 = new SampleStep(StepId.Create(), new Comment("First step!"));
        step6.Parameters.Add(new IntegerParameterValue(ParameterValueId.Create(), bcParameter, 2000));
        step6.Parameters.Add(new IntegerParameterValue(ParameterValueId.Create(), hydrogenParameter, 300));
        step6.Parameters.Add(new IntegerParameterValue(ParameterValueId.Create(), methaneParameter, 100));
        step6.Parameters.Add(new IntegerParameterValue(ParameterValueId.Create(), diboranParameter, 240));
        step6.Parameters.Add(new TextParameterValue(ParameterValueId.Create(), nucleationParameter,
            nucleationParameter.AllowedValues.First()));
        step6.Parameters.Add(new IntegerParameterValue(ParameterValueId.Create(), temperatureParameter, 800));
        step6.Parameters.Add(new IntegerParameterValue(ParameterValueId.Create(), pressureParameter, 20));
        step6.Parameters.Add(new IntegerParameterValue(ParameterValueId.Create(), powerParameter, 1300));
        step6.Parameters.Add(new DecimalParameterValue(ParameterValueId.Create(), timeParameter, 2.3m));
        step6.Parameters.Add(new TextParameterValue(ParameterValueId.Create(), substrateParameter,
            substrateParameter.AllowedValues.First()));
        step6.Parameters.Add(new DecimalParameterValue(ParameterValueId.Create(), bufferParameter, 0.0m));
        step6.Parameters.Add(new TextParameterValue(ParameterValueId.Create(), additionalGasesParameter,
            additionalGasesParameter.AllowedValues.First()));

        var step7 = new SampleStep(StepId.Create(), new Comment("First step!"));
        step7.Parameters.Add(new IntegerParameterValue(ParameterValueId.Create(), bcParameter, 2000));
        step7.Parameters.Add(new IntegerParameterValue(ParameterValueId.Create(), hydrogenParameter, 300));
        step7.Parameters.Add(new IntegerParameterValue(ParameterValueId.Create(), methaneParameter, 100));
        step7.Parameters.Add(new IntegerParameterValue(ParameterValueId.Create(), diboranParameter, 240));
        step7.Parameters.Add(new TextParameterValue(ParameterValueId.Create(), nucleationParameter,
            nucleationParameter.AllowedValues.First()));
        step7.Parameters.Add(new IntegerParameterValue(ParameterValueId.Create(), temperatureParameter, 800));
        step7.Parameters.Add(new IntegerParameterValue(ParameterValueId.Create(), pressureParameter, 20));
        step7.Parameters.Add(new IntegerParameterValue(ParameterValueId.Create(), powerParameter, 1300));
        step7.Parameters.Add(new DecimalParameterValue(ParameterValueId.Create(), timeParameter, 2.3m));
        step7.Parameters.Add(new TextParameterValue(ParameterValueId.Create(), substrateParameter,
            substrateParameter.AllowedValues.First()));
        step7.Parameters.Add(new DecimalParameterValue(ParameterValueId.Create(), bufferParameter, 0.0m));
        step7.Parameters.Add(new TextParameterValue(ParameterValueId.Create(), additionalGasesParameter,
            additionalGasesParameter.AllowedValues.First()));

        var step8 = new SampleStep(StepId.Create(), new Comment("First step!"));
        step8.Parameters.Add(new IntegerParameterValue(ParameterValueId.Create(), bcParameter, 2000));
        step8.Parameters.Add(new IntegerParameterValue(ParameterValueId.Create(), hydrogenParameter, 300));
        step8.Parameters.Add(new IntegerParameterValue(ParameterValueId.Create(), methaneParameter, 100));
        step8.Parameters.Add(new IntegerParameterValue(ParameterValueId.Create(), diboranParameter, 240));
        step8.Parameters.Add(new TextParameterValue(ParameterValueId.Create(), nucleationParameter,
            nucleationParameter.AllowedValues.First()));
        step8.Parameters.Add(new IntegerParameterValue(ParameterValueId.Create(), temperatureParameter, 800));
        step8.Parameters.Add(new IntegerParameterValue(ParameterValueId.Create(), pressureParameter, 20));
        step8.Parameters.Add(new IntegerParameterValue(ParameterValueId.Create(), powerParameter, 1300));
        step8.Parameters.Add(new DecimalParameterValue(ParameterValueId.Create(), timeParameter, 2.3m));
        step8.Parameters.Add(new TextParameterValue(ParameterValueId.Create(), substrateParameter,
            substrateParameter.AllowedValues.First()));
        step8.Parameters.Add(new DecimalParameterValue(ParameterValueId.Create(), bufferParameter, 0.0m));
        step8.Parameters.Add(new TextParameterValue(ParameterValueId.Create(), additionalGasesParameter,
            additionalGasesParameter.AllowedValues.First()));

        var step9 = new SampleStep(StepId.Create(), new Comment("First step!"));
        step9.Parameters.Add(new IntegerParameterValue(ParameterValueId.Create(), bcParameter, 2000));
        step9.Parameters.Add(new IntegerParameterValue(ParameterValueId.Create(), hydrogenParameter, 300));
        step9.Parameters.Add(new IntegerParameterValue(ParameterValueId.Create(), methaneParameter, 100));
        step9.Parameters.Add(new IntegerParameterValue(ParameterValueId.Create(), diboranParameter, 240));
        step9.Parameters.Add(new TextParameterValue(ParameterValueId.Create(), nucleationParameter,
            nucleationParameter.AllowedValues.First()));
        step9.Parameters.Add(new IntegerParameterValue(ParameterValueId.Create(), temperatureParameter, 800));
        step9.Parameters.Add(new IntegerParameterValue(ParameterValueId.Create(), pressureParameter, 20));
        step9.Parameters.Add(new IntegerParameterValue(ParameterValueId.Create(), powerParameter, 1300));
        step9.Parameters.Add(new DecimalParameterValue(ParameterValueId.Create(), timeParameter, 2.3m));
        step9.Parameters.Add(new TextParameterValue(ParameterValueId.Create(), substrateParameter,
            substrateParameter.AllowedValues.First()));
        step9.Parameters.Add(new DecimalParameterValue(ParameterValueId.Create(), bufferParameter, 0.0m));
        step9.Parameters.Add(new TextParameterValue(ParameterValueId.Create(), additionalGasesParameter,
            additionalGasesParameter.AllowedValues.First()));

        var step10 = new SampleStep(StepId.Create(), new Comment("First step!"));
        step10.Parameters.Add(new IntegerParameterValue(ParameterValueId.Create(), bcParameter, 2000));
        step10.Parameters.Add(new IntegerParameterValue(ParameterValueId.Create(), hydrogenParameter, 300));
        step10.Parameters.Add(new IntegerParameterValue(ParameterValueId.Create(), methaneParameter, 100));
        step10.Parameters.Add(new IntegerParameterValue(ParameterValueId.Create(), diboranParameter, 240));
        step10.Parameters.Add(new TextParameterValue(ParameterValueId.Create(), nucleationParameter,
            nucleationParameter.AllowedValues.First()));
        step10.Parameters.Add(new IntegerParameterValue(ParameterValueId.Create(), temperatureParameter, 800));
        step10.Parameters.Add(new IntegerParameterValue(ParameterValueId.Create(), pressureParameter, 20));
        step10.Parameters.Add(new IntegerParameterValue(ParameterValueId.Create(), powerParameter, 1300));
        step10.Parameters.Add(new DecimalParameterValue(ParameterValueId.Create(), timeParameter, 2.3m));
        step10.Parameters.Add(new TextParameterValue(ParameterValueId.Create(), substrateParameter,
            substrateParameter.AllowedValues.First()));
        step10.Parameters.Add(new DecimalParameterValue(ParameterValueId.Create(), bufferParameter, 0.0m));
        step10.Parameters.Add(new TextParameterValue(ParameterValueId.Create(), additionalGasesParameter,
            additionalGasesParameter.AllowedValues.First()));

        #endregion

        #region samples
        var prefixAX = "AX";
        var prefixBX = "BX";
        var prefixCX = "CX";
        var prefixDX = "DX";
        var prefixEX = "EX";
        var prefixFX = "FX";

        var process1 = new Process(
            ProcessId.Create(),
            await _codeGenerator.GenerateNextCodeAsync(Prefix.Create(prefixAX)),
            new List<Project> { projectUpturn },
            null,
            new Comment("First process!"),
            new List<SampleStep> { step1 },
            new List<Tag> { tag1, tag3, tag5 });
        _dbContext.Processes.Add(process1);
        await _dbContext.SaveChangesAsync();

        var process2 = new Process(
            ProcessId.Create(),
            await _codeGenerator.GenerateNextCodeAsync(Prefix.Create(prefixAX)),
            new List<Project> { projectUpturn, projectBessy2 },
            null,
            new Comment("First process!"),
            new List<SampleStep> { step2 },
            new List<Tag> { tag1, tag3, tag5 });
        _dbContext.Processes.Add(process2);
        await _dbContext.SaveChangesAsync();

        var process3 = new Process(
            ProcessId.Create(),
            await _codeGenerator.GenerateNextCodeAsync(Prefix.Create(prefixAX)),
            new List<Project> { projectUpturn, projectBessy2 },
            null,
            new Comment("First process!"),
            new List<SampleStep> { step3 },
            new List<Tag> { tag1, tag3, tag5 });
        _dbContext.Processes.Add(process3);
        await _dbContext.SaveChangesAsync();

        var process4 = new Process(
            ProcessId.Create(),
            await _codeGenerator.GenerateNextCodeAsync(Prefix.Create(prefixAX)),
            new List<Project> { projectUpturn, projectBessy2 },
            null,
            new Comment("First process!"),
            new List<SampleStep> { step4 },
            new List<Tag> { tag1, tag3, tag5 });
        _dbContext.Processes.Add(process4);
        await _dbContext.SaveChangesAsync();

        var process5 = new Process(
            ProcessId.Create(),
            await _codeGenerator.GenerateNextCodeAsync(Prefix.Create(prefixAX)),
            new List<Project> { projectUpturn, projectNitro },
            null,
            new Comment("First process!"),
            new List<SampleStep> { step5 },
            new List<Tag> { tag1, tag3, tag5 });
        _dbContext.Processes.Add(process5);
        await _dbContext.SaveChangesAsync();

        var process6 = new Process(
            ProcessId.Create(),
            await _codeGenerator.GenerateNextCodeAsync(Prefix.Create(prefixAX)),
            new List<Project> { projectUpturn, projectNitro },
            null,
            new Comment("First process!"),
            new List<SampleStep> { step6 },
            new List<Tag> { tag1, tag3, tag5 });
        _dbContext.Processes.Add(process6);
        await _dbContext.SaveChangesAsync();

        var process7 = new Process(
            ProcessId.Create(),
            await _codeGenerator.GenerateNextCodeAsync(Prefix.Create(prefixAX)),
            new List<Project> { projectNitro, projectNobelium },
            null,
            new Comment("First process!"),
            new List<SampleStep> { step7 },
            new List<Tag> { tag1, tag3, tag5 });
        _dbContext.Processes.Add(process7);
        await _dbContext.SaveChangesAsync();

        var process8 = new Process(
            ProcessId.Create(),
            await _codeGenerator.GenerateNextCodeAsync(Prefix.Create(prefixBX)),
            new List<Project> { projectUpturn, projectNitro, projectNobelium },
            null,
            new Comment("First process!"),
            new List<SampleStep> { step8 },
            new List<Tag> { tag1, tag3, tag5 });
        _dbContext.Processes.Add(process8);
        await _dbContext.SaveChangesAsync();

        var process9 = new Process(
            ProcessId.Create(),
            await _codeGenerator.GenerateNextCodeAsync(Prefix.Create(prefixBX)),
            new List<Project> { projectUpturn, projectNitro, projectNobelium },
            null,
            new Comment("First process!"),
            new List<SampleStep> { step9 },
            new List<Tag> { tag1, tag3, tag5 });
        _dbContext.Processes.Add(process9);
        await _dbContext.SaveChangesAsync();

        var process10 = new Process(
            ProcessId.Create(),
            await _codeGenerator.GenerateNextCodeAsync(Prefix.Create(prefixBX)),
            new List<Project> { projectUpturn, projectNitro, projectNobelium },
            null,
            new Comment("First process!"),
            new List<SampleStep> { step10 },
            new List<Tag> { tag1, tag3, tag5 });
        _dbContext.Processes.Add(process10);
        await _dbContext.SaveChangesAsync();

        var process11 = new Process(
            ProcessId.Create(),
            await _codeGenerator.GenerateNextCodeAsync(Prefix.Create(prefixBX)),
            new List<Project> { projectUpturn, projectNitro, projectNobelium },
            null,
            new Comment("First process!"),
            new List<SampleStep> { step10 },
            new List<Tag> { tag1, tag3, tag5 });
        _dbContext.Processes.Add(process11);
        await _dbContext.SaveChangesAsync();

        var process12 = new Process(
            ProcessId.Create(),
            await _codeGenerator.GenerateNextCodeAsync(Prefix.Create(prefixBX)),
            new List<Project> { projectUpturn, projectNitro, projectNobelium },
            null,
            new Comment("First process!"),
            new List<SampleStep> { step10 },
            new List<Tag> { tag1, tag3, tag5 });
        _dbContext.Processes.Add(process12);
        await _dbContext.SaveChangesAsync();

        var process13 = new Process(
            ProcessId.Create(),
            await _codeGenerator.GenerateNextCodeAsync(Prefix.Create(prefixBX)),
            new List<Project> { projectUpturn, projectNitro, projectNobelium },
            null,
            new Comment("First process!"),
            new List<SampleStep> { step10 },
            new List<Tag> { tag1, tag3, tag5 });
        _dbContext.Processes.Add(process13);
        await _dbContext.SaveChangesAsync();

        var process14 = new Process(
            ProcessId.Create(),
            await _codeGenerator.GenerateNextCodeAsync(Prefix.Create(prefixCX)),
            new List<Project> { projectUpturn, projectNitro, projectNobelium },
            null,
            new Comment("First process!"),
            new List<SampleStep> { step10 },
            new List<Tag> { tag1, tag3, tag5 });
        _dbContext.Processes.Add(process14);
        await _dbContext.SaveChangesAsync();

        var process15 = new Process(
            ProcessId.Create(),
            await _codeGenerator.GenerateNextCodeAsync(Prefix.Create(prefixCX)),
            new List<Project> { projectUpturn, projectNitro, projectNobelium },
            null,
            new Comment("First process!"),
            new List<SampleStep> { step10 },
            new List<Tag> { tag1, tag3, tag5 });
        _dbContext.Processes.Add(process15);
        await _dbContext.SaveChangesAsync();

        var process16 = new Process(
            ProcessId.Create(),
            await _codeGenerator.GenerateNextCodeAsync(Prefix.Create(prefixCX)),
            new List<Project> { projectUpturn, projectNitro, projectNobelium },
            null,
            new Comment("First process!"),
            new List<SampleStep> { step10 },
            new List<Tag> { tag1, tag3, tag5 });
        _dbContext.Processes.Add(process16);
        await _dbContext.SaveChangesAsync();

        var process17 = new Process(
            ProcessId.Create(),
            await _codeGenerator.GenerateNextCodeAsync(Prefix.Create(prefixCX)),
            new List<Project> { projectUpturn, projectNitro, projectNobelium },
            null,
            new Comment("First process!"),
            new List<SampleStep> { step10 },
            new List<Tag> { tag1, tag3, tag5 });
        _dbContext.Processes.Add(process17);
        await _dbContext.SaveChangesAsync();

        var process18 = new Process(
            ProcessId.Create(),
            await _codeGenerator.GenerateNextCodeAsync(Prefix.Create(prefixCX)),
            new List<Project> { projectUpturn, projectNitro, projectNobelium },
            null,
            new Comment("First process!"),
            new List<SampleStep> { step10 },
            new List<Tag> { tag1, tag3, tag5 });
        _dbContext.Processes.Add(process18);
        await _dbContext.SaveChangesAsync();

        var process19 = new Process(
            ProcessId.Create(),
            await _codeGenerator.GenerateNextCodeAsync(Prefix.Create(prefixCX)),
            new List<Project> { projectUpturn, projectNitro, projectNobelium },
            null,
            new Comment("First process!"),
            new List<SampleStep> { step10 },
            new List<Tag> { tag1, tag3, tag5 });
        _dbContext.Processes.Add(process19);
        await _dbContext.SaveChangesAsync();

        var process20 = new Process(
            ProcessId.Create(),
            await _codeGenerator.GenerateNextCodeAsync(Prefix.Create(prefixAX)),
            new List<Project> { projectUpturn, projectNitro, projectNobelium },
            null,
            new Comment("First process!"),
            new List<SampleStep> { step10 },
            new List<Tag> { tag1, tag3, tag5 });
        _dbContext.Processes.Add(process20);
        await _dbContext.SaveChangesAsync();

        var process21 = new Process(
            ProcessId.Create(),
            await _codeGenerator.GenerateNextCodeAsync(Prefix.Create(prefixAX)),
            new List<Project> { projectUpturn, projectNitro, projectNobelium },
            null,
            new Comment("First process!"),
            new List<SampleStep> { step10 },
            new List<Tag> { tag1, tag3, tag5 });
        _dbContext.Processes.Add(process21);
        await _dbContext.SaveChangesAsync();

        var process22 = new Process(
            ProcessId.Create(),
            await _codeGenerator.GenerateNextCodeAsync(Prefix.Create(prefixCX)),
            new List<Project> { projectUpturn, projectNitro, projectNobelium },
            null,
            new Comment("First process!"),
            new List<SampleStep> { step10 },
            new List<Tag> { tag1, tag3, tag5 });
        _dbContext.Processes.Add(process22);
        await _dbContext.SaveChangesAsync();

        var process23 = new Process(
            ProcessId.Create(),
            await _codeGenerator.GenerateNextCodeAsync(Prefix.Create(prefixDX)),
            new List<Project> { projectUpturn, projectNitro, projectNobelium },
            null,
            new Comment("First process!"),
            new List<SampleStep> { step10 },
            new List<Tag> { tag1, tag3, tag5 });
        _dbContext.Processes.Add(process23);
        await _dbContext.SaveChangesAsync();

        var process24 = new Process(
            ProcessId.Create(),
            await _codeGenerator.GenerateNextCodeAsync(Prefix.Create(prefixDX)),
            new List<Project> { projectUpturn, projectNitro, projectNobelium },
            null,
            new Comment("First process!"),
            new List<SampleStep> { step10 },
            new List<Tag> { tag1, tag3, tag5 });
        _dbContext.Processes.Add(process24);
        await _dbContext.SaveChangesAsync();

        var process25 = new Process(
            ProcessId.Create(),
            await _codeGenerator.GenerateNextCodeAsync(Prefix.Create(prefixEX)),
            new List<Project> { projectUpturn, projectNitro, projectNobelium },
            null,
            new Comment("First process!"),
            new List<SampleStep> { step10 },
            new List<Tag> { tag1, tag3, tag5 });
        _dbContext.Processes.Add(process25);
        await _dbContext.SaveChangesAsync();

        var process26 = new Process(
            ProcessId.Create(),
            await _codeGenerator.GenerateNextCodeAsync(Prefix.Create(prefixEX)),
            new List<Project> { projectUpturn, projectNitro, projectNobelium },
            null,
            new Comment("First process!"),
            new List<SampleStep> { step10 },
            new List<Tag> { tag1, tag3, tag5 });
        _dbContext.Processes.Add(process26);
        await _dbContext.SaveChangesAsync();

        var process27 = new Process(
            ProcessId.Create(),
            await _codeGenerator.GenerateNextCodeAsync(Prefix.Create(prefixEX)),
            new List<Project> { projectUpturn, projectNitro, projectNobelium },
            null,
            new Comment("First process!"),
            new List<SampleStep> { step10 },
            new List<Tag> { tag1, tag3, tag5 });
        _dbContext.Processes.Add(process27);
        await _dbContext.SaveChangesAsync();

        var process28 = new Process(
            ProcessId.Create(),
            await _codeGenerator.GenerateNextCodeAsync(Prefix.Create(prefixFX)),
            new List<Project> { projectUpturn, projectNitro, projectNobelium },
            null,
            new Comment("First process!"),
            new List<SampleStep> { step10 },
            new List<Tag> { tag1, tag3, tag5 });
        _dbContext.Processes.Add(process28);
        await _dbContext.SaveChangesAsync();

        var process29 = new Process(
            ProcessId.Create(),
            await _codeGenerator.GenerateNextCodeAsync(Prefix.Create(prefixAX)),
            new List<Project> { projectUpturn, projectNitro, projectNobelium },
            null,
            new Comment("First process!"),
            new List<SampleStep> { step10 },
            new List<Tag> { tag1, tag3, tag5 });
        _dbContext.Processes.Add(process29);
        await _dbContext.SaveChangesAsync();

        var process30 = new Process(
            ProcessId.Create(),
            await _codeGenerator.GenerateNextCodeAsync(Prefix.Create(prefixBX)),
            new List<Project> { projectUpturn, projectNitro, projectNobelium },
            null,
            new Comment("First process!"),
            new List<SampleStep> { step10 },
            new List<Tag> { tag1, tag3, tag5 });
        _dbContext.Processes.Add(process30);
        await _dbContext.SaveChangesAsync();

        var process31 = new Process(
            ProcessId.Create(),
            await _codeGenerator.GenerateNextCodeAsync(Prefix.Create(prefixBX)),
            new List<Project> { projectUpturn, projectNitro, projectNobelium },
            null,
            new Comment("First process!"),
            new List<SampleStep> { step10 },
            new List<Tag> { tag1, tag3, tag5 });
        _dbContext.Processes.Add(process31);
        await _dbContext.SaveChangesAsync();

        var process32 = new Process(
            ProcessId.Create(),
            await _codeGenerator.GenerateNextCodeAsync(Prefix.Create(prefixBX)),
            new List<Project> { projectUpturn, projectNitro, projectNobelium },
            null,
            new Comment("First process!"),
            new List<SampleStep> { step10 },
            new List<Tag> { tag1, tag3, tag5 });
        _dbContext.Processes.Add(process32);
        await _dbContext.SaveChangesAsync();

        var process33 = new Process(
            ProcessId.Create(),
            await _codeGenerator.GenerateNextCodeAsync(Prefix.Create(prefixBX)),
            new List<Project> { projectUpturn, projectNitro, projectNobelium },
            null,
            new Comment("First process!"),
            new List<SampleStep> { step10 },
            new List<Tag> { tag1, tag3, tag5 });
        _dbContext.Processes.Add(process33);
        await _dbContext.SaveChangesAsync();

        var process34 = new Process(
            ProcessId.Create(),
            await _codeGenerator.GenerateNextCodeAsync(Prefix.Create(prefixBX)),
            new List<Project> { projectUpturn, projectNitro, projectNobelium },
            null,
            new Comment("First process!"),
            new List<SampleStep> { step10 },
            new List<Tag> { tag1, tag3, tag5 });
        _dbContext.Processes.Add(process34);
        await _dbContext.SaveChangesAsync();

        var process35 = new Process(
            ProcessId.Create(),
            await _codeGenerator.GenerateNextCodeAsync(Prefix.Create(prefixBX)),
            new List<Project> { projectUpturn, projectNitro, projectNobelium },
            null,
            new Comment("First process!"),
            new List<SampleStep> { step10 },
            new List<Tag> { tag1, tag3, tag5 });
        _dbContext.Processes.Add(process35);
        await _dbContext.SaveChangesAsync();

        var process36 = new Process(
            ProcessId.Create(),
            await _codeGenerator.GenerateNextCodeAsync(Prefix.Create(prefixBX)),
            new List<Project> { projectUpturn, projectNitro, projectNobelium },
            null,
            new Comment("First process!"),
            new List<SampleStep> { step10 },
            new List<Tag> { tag1, tag3, tag5 });
        _dbContext.Processes.Add(process36);
        await _dbContext.SaveChangesAsync();

        var process37 = new Process(
            ProcessId.Create(),
            await _codeGenerator.GenerateNextCodeAsync(Prefix.Create(prefixBX)),
            new List<Project> { projectUpturn, projectNitro, projectNobelium },
            null,
            new Comment("First process!"),
            new List<SampleStep> { step10 },
            new List<Tag> { tag1, tag3, tag5 });
        _dbContext.Processes.Add(process37);
        await _dbContext.SaveChangesAsync();

        var process38 = new Process(
            ProcessId.Create(),
            await _codeGenerator.GenerateNextCodeAsync(Prefix.Create(prefixBX)),
            new List<Project> { projectUpturn, projectNitro, projectNobelium },
            null,
            new Comment("First process!"),
            new List<SampleStep> { step10 },
            new List<Tag> { tag1, tag3, tag5 });
        _dbContext.Processes.Add(process38);
        await _dbContext.SaveChangesAsync();

        var process39 = new Process(
            ProcessId.Create(),
            await _codeGenerator.GenerateNextCodeAsync(Prefix.Create(prefixBX)),
            new List<Project> { projectUpturn, projectNitro, projectNobelium },
            null,
            new Comment("First process!"),
            new List<SampleStep> { step10 },
            new List<Tag> { tag1, tag3, tag5 });
        _dbContext.Processes.Add(process39);
        await _dbContext.SaveChangesAsync();

        var process40 = new Process(
            ProcessId.Create(),
            await _codeGenerator.GenerateNextCodeAsync(Prefix.Create(prefixBX)),
            new List<Project> { projectUpturn, projectNitro, projectNobelium },
            null,
            new Comment("First process!"),
            new List<SampleStep> { step10 },
            new List<Tag> { tag1, tag3, tag5 });
        _dbContext.Processes.Add(process40);
        await _dbContext.SaveChangesAsync();

        var process41 = new Process(
            ProcessId.Create(),
            await _codeGenerator.GenerateNextCodeAsync(Prefix.Create(prefixBX)),
            new List<Project> { projectUpturn, projectNitro, projectNobelium },
            null,
            new Comment("First process!"),
            new List<SampleStep> { step10 },
            new List<Tag> { tag1, tag3, tag5 });
        _dbContext.Processes.Add(process41);
        await _dbContext.SaveChangesAsync();

        var process42 = new Process(
            ProcessId.Create(),
            await _codeGenerator.GenerateNextCodeAsync(Prefix.Create(prefixBX)),
            new List<Project> { projectUpturn, projectNitro, projectNobelium },
            null,
            new Comment("First process!"),
            new List<SampleStep> { step10 },
            new List<Tag> { tag1, tag3, tag5 });
        _dbContext.Processes.Add(process42);
        await _dbContext.SaveChangesAsync();

        var process43 = new Process(
            ProcessId.Create(),
            await _codeGenerator.GenerateNextCodeAsync(Prefix.Create(prefixBX)),
            new List<Project> { projectUpturn, projectNitro, projectNobelium },
            null,
            new Comment("First process!"),
            new List<SampleStep> { step10 },
            new List<Tag> { tag1, tag3, tag5 });
        _dbContext.Processes.Add(process43);
        await _dbContext.SaveChangesAsync();

        var process44 = new Process(
            ProcessId.Create(),
            await _codeGenerator.GenerateNextCodeAsync(Prefix.Create(prefixBX)),
            new List<Project> { projectUpturn, projectNitro, projectNobelium },
            null,
            new Comment("First process!"),
            new List<SampleStep> { step10 },
            new List<Tag> { tag1, tag3, tag5 });
        _dbContext.Processes.Add(process44);
        await _dbContext.SaveChangesAsync();

        var process45 = new Process(
            ProcessId.Create(),
            await _codeGenerator.GenerateNextCodeAsync(Prefix.Create(prefixBX)),
            new List<Project> { projectUpturn, projectNitro, projectNobelium },
            null,
            new Comment("First process!"),
            new List<SampleStep> { step10 },
            new List<Tag> { tag1, tag3, tag5 });
        _dbContext.Processes.Add(process45);

        await _dbContext.SaveChangesAsync();

        #endregion
    }

    public TerminalDbSeeder(TerminalDbContext dbContext, ICodeGeneratorService codeGenerator)
    {
        _dbContext = dbContext;
        _codeGenerator = codeGenerator;
    }
}