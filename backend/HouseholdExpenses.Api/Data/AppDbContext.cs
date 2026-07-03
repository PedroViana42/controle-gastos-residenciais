using Microsoft.EntityFrameworkCore;

namespace HouseholdExpenses.Api.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }
}
