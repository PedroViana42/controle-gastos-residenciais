using HouseholdExpenses.Api.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace HouseholdExpenses.Api.Migrations;

[DbContext(typeof(AppDbContext))]
partial class AppDbContextModelSnapshot : ModelSnapshot
{
    protected override void BuildModel(ModelBuilder modelBuilder)
    {
#pragma warning disable 612, 618
        modelBuilder.HasAnnotation("ProductVersion", "7.0.20");

        modelBuilder.Entity("HouseholdExpenses.Api.Models.Pessoa", b =>
        {
            b.Property<int>("Id")
                .ValueGeneratedOnAdd()
                .HasColumnType("INTEGER");

            b.Property<int>("Idade")
                .HasColumnType("INTEGER");

            b.Property<string>("Nome")
                .IsRequired()
                .HasMaxLength(120)
                .HasColumnType("TEXT");

            b.HasKey("Id");

            b.ToTable("Pessoas");
        });

        modelBuilder.Entity("HouseholdExpenses.Api.Models.Transacao", b =>
        {
            b.Property<int>("Id")
                .ValueGeneratedOnAdd()
                .HasColumnType("INTEGER");

            b.Property<string>("Descricao")
                .IsRequired()
                .HasMaxLength(200)
                .HasColumnType("TEXT");

            b.Property<int>("PessoaId")
                .HasColumnType("INTEGER");

            b.Property<int>("Tipo")
                .HasColumnType("INTEGER");

            b.Property<decimal>("Valor")
                .HasColumnType("decimal(18,2)");

            b.HasKey("Id");

            b.HasIndex("PessoaId");

            b.ToTable("Transacoes");
        });

        modelBuilder.Entity("HouseholdExpenses.Api.Models.Transacao", b =>
        {
            b.HasOne("HouseholdExpenses.Api.Models.Pessoa", "Pessoa")
                .WithMany("Transacoes")
                .HasForeignKey("PessoaId")
                .OnDelete(DeleteBehavior.Cascade)
                .IsRequired();

            b.Navigation("Pessoa");
        });

        modelBuilder.Entity("HouseholdExpenses.Api.Models.Pessoa", b =>
        {
            b.Navigation("Transacoes");
        });
#pragma warning restore 612, 618
    }
}
