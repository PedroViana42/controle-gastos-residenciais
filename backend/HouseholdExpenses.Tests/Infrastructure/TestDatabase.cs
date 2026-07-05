using HouseholdExpenses.Api.Data;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;

namespace HouseholdExpenses.Tests.Infrastructure;

public sealed class TestDatabase : IDisposable
{
    private readonly SqliteConnection _connection;

    public TestDatabase()
    {
        _connection = new SqliteConnection("Data Source=:memory:");
        _connection.Open();

        Context = new AppDbContext(new DbContextOptionsBuilder<AppDbContext>()
            .UseSqlite(_connection)
            .Options);

        Context.Database.EnsureCreated();
    }

    public AppDbContext Context { get; }

    public void Dispose()
    {
        Context.Dispose();
        _connection.Dispose();
    }
}
