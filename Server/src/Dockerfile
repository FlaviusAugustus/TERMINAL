FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
EXPOSE 80
EXPOSE 443
RUN apt update && apt install curl -y

FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src
COPY ["Terminal.Backend.Api/Terminal.Backend.Api.csproj", "Terminal.Backend.Api/"]
COPY ["Terminal.Backend.Infrastructure/Terminal.Backend.Infrastructure.csproj", "Terminal.Backend.Infrastructure/"]
COPY ["Terminal.Backend.Core/Terminal.Backend.Core.csproj", "Terminal.Backend.Core/"]
COPY ["Terminal.Backend.Application/Terminal.Backend.Application.csproj", "Terminal.Backend.Application/"]
RUN dotnet restore "Terminal.Backend.Api/Terminal.Backend.Api.csproj"

WORKDIR "/src/Terminal.Backend.Api"
COPY . .
COPY Terminal.Backend.Api/appsettings*.json .
RUN dotnet build "Terminal.Backend.Api.csproj" --no-restore -c Release -o /app/build /p:UseAppHost=false

FROM build AS publish
RUN dotnet publish "Terminal.Backend.Api.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Terminal.Backend.Api.dll"]
