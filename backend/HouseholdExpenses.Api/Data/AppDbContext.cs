using HouseholdExpenses.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace HouseholdExpenses.Api.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    public DbSet<Pessoa> Pessoas => Set<Pessoa>();

    public DbSet<Transacao> Transacoes => Set<Transacao>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Pessoa>(entity =>
        {
            entity.Property(pessoa => pessoa.Nome)
                .HasMaxLength(120)
                .IsRequired();

            entity.HasMany(pessoa => pessoa.Transacoes)
                .WithOne(transacao => transacao.Pessoa)
                .HasForeignKey(transacao => transacao.PessoaId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        modelBuilder.Entity<Transacao>(entity =>
        {
            entity.Property(transacao => transacao.Descricao)
                .HasMaxLength(200)
                .IsRequired();

            entity.Property(transacao => transacao.Valor)
                .HasColumnType("decimal(18,2)");
        });
    }
}
