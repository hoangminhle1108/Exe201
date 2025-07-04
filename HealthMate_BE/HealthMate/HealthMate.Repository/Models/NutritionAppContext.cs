﻿using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace HealthMate.Repository.Models;

public partial class NutritionAppContext : DbContext
{
    public NutritionAppContext()
    {
    }

    public NutritionAppContext(DbContextOptions<NutritionAppContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Article> Articles { get; set; }

    public virtual DbSet<ArticleTagMapping> ArticleTagMappings { get; set; }

    public virtual DbSet<Banner> Banners { get; set; }

    public virtual DbSet<HealthMetric> HealthMetrics { get; set; }

    public virtual DbSet<PaymentMethod> PaymentMethods { get; set; }

    public virtual DbSet<PremiumPackage> PremiumPackages { get; set; }

    public virtual DbSet<Recipe> Recipes { get; set; }

    public virtual DbSet<RecipeCategory> RecipeCategories { get; set; }

    public virtual DbSet<Role> Roles { get; set; }

    public virtual DbSet<Tag> Tags { get; set; }

    public virtual DbSet<Transaction> Transactions { get; set; }

    public virtual DbSet<User> Users { get; set; }

    //protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
//#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
       // => optionsBuilder.UseSqlServer("Server=localhost;Database=NutritionApp;Trusted_Connection=True;User Id=sa;Password=12345;TrustServerCertificate=True;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Article>(entity =>
        {
            entity.HasKey(e => e.ArticleId).HasName("PK__Article__9C6270E8F91B7C23");

            entity.ToTable("Article");

            entity.Property(e => e.Author).HasMaxLength(100);
            entity.Property(e => e.Content).HasColumnType("ntext");
            entity.Property(e => e.ImageUrl).HasMaxLength(255);
            entity.Property(e => e.PublishedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.Title).HasMaxLength(200);
            entity.Property(e => e.UpdatedAt).HasColumnType("datetime");
        });

        modelBuilder.Entity<ArticleTagMapping>(entity =>
        {
            entity.HasKey(e => new { e.ArticleId, e.TagId }).HasName("PK__ArticleT__4A35BF72D36CD1ED");

            entity.ToTable("ArticleTagMapping");

            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");

            entity.HasOne(d => d.Article).WithMany(p => p.ArticleTagMappings)
                .HasForeignKey(d => d.ArticleId)
                .HasConstraintName("FK__ArticleTa__Artic__5535A963");

            entity.HasOne(d => d.Tag).WithMany(p => p.ArticleTagMappings)
                .HasForeignKey(d => d.TagId)
                .HasConstraintName("FK__ArticleTa__TagId__5629CD9C");
        });

        modelBuilder.Entity<Banner>(entity =>
        {
            entity.HasKey(e => e.BannerId).HasName("PK__Banner__32E86AD1AD6E3FE3");

            entity.ToTable("Banner");

            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.Description).HasMaxLength(500);
            entity.Property(e => e.EndDate).HasColumnType("datetime");
            entity.Property(e => e.ImageUrl).HasMaxLength(255);
            entity.Property(e => e.IsActive).HasDefaultValue(true);
            entity.Property(e => e.LinkUrl).HasMaxLength(255);
            entity.Property(e => e.StartDate).HasColumnType("datetime");
            entity.Property(e => e.Title).HasMaxLength(200);
            entity.Property(e => e.UpdatedAt).HasColumnType("datetime");
        });

        modelBuilder.Entity<HealthMetric>(entity =>
        {
            entity.HasKey(e => e.MetricId).HasName("PK__HealthMe__561056A5BA4F592B");

            entity.ToTable("HealthMetric");

            entity.Property(e => e.BodyFat).HasColumnType("decimal(5, 2)");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.Height).HasColumnType("decimal(5, 2)");
            entity.Property(e => e.Note).HasMaxLength(500);
            entity.Property(e => e.Weight).HasColumnType("decimal(5, 2)");

            entity.HasOne(d => d.User).WithMany(p => p.HealthMetrics)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__HealthMet__UserI__59FA5E80");
        });

        modelBuilder.Entity<PaymentMethod>(entity =>
        {
            entity.HasKey(e => e.PaymentMethodId).HasName("PK__PaymentM__DC31C1D343F52D1F");

            entity.ToTable("PaymentMethod");

            entity.Property(e => e.MethodName).HasMaxLength(50);
        });

        modelBuilder.Entity<PremiumPackage>(entity =>
        {
            entity.HasKey(e => e.PackageId).HasName("PK__PremiumP__322035CC04262306");

            entity.ToTable("PremiumPackage");

            entity.Property(e => e.Description).HasMaxLength(500);
            entity.Property(e => e.PackageName).HasMaxLength(100);
            entity.Property(e => e.Price).HasColumnType("decimal(10, 2)");
        });

        modelBuilder.Entity<Recipe>(entity =>
        {
            entity.HasKey(e => e.RecipeId).HasName("PK__Recipe__FDD988B0461297B5");

            entity.ToTable("Recipe");

            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.Description).HasMaxLength(500);
            entity.Property(e => e.Difficulty).HasMaxLength(50);
            entity.Property(e => e.ImageUrl).HasMaxLength(255);
            entity.Property(e => e.Ingredients).HasColumnType("ntext");
            entity.Property(e => e.Instructions).HasColumnType("ntext");
            entity.Property(e => e.Title).HasMaxLength(200);
            entity.Property(e => e.UpdatedAt).HasColumnType("datetime");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.Recipes)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Recipe__CreatedB__5EBF139D");

            entity.HasMany(d => d.Categories).WithMany(p => p.Recipes)
                .UsingEntity<Dictionary<string, object>>(
                    "RecipeCategoryMapping",
                    r => r.HasOne<RecipeCategory>().WithMany()
                        .HasForeignKey("CategoryId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK__RecipeCat__Categ__656C112C"),
                    l => l.HasOne<Recipe>().WithMany()
                        .HasForeignKey("RecipeId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK__RecipeCat__Recip__6477ECF3"),
                    j =>
                    {
                        j.HasKey("RecipeId", "CategoryId").HasName("PK__RecipeCa__5C491B1016229521");
                        j.ToTable("RecipeCategoryMapping");
                    });
        });

        modelBuilder.Entity<RecipeCategory>(entity =>
        {
            entity.HasKey(e => e.CategoryId).HasName("PK__RecipeCa__19093A0B726AB9F0");

            entity.ToTable("RecipeCategory");

            entity.HasIndex(e => e.CategoryName, "UQ__RecipeCa__8517B2E087430DD6").IsUnique();

            entity.Property(e => e.CategoryName).HasMaxLength(100);
            entity.Property(e => e.Description).HasMaxLength(500);
        });

        modelBuilder.Entity<Role>(entity =>
        {
            entity.HasKey(e => e.RoleId).HasName("PK__Role__8AFACE1A4F17E3D0");

            entity.ToTable("Role");

            entity.HasIndex(e => e.RoleName, "UQ__Role__8A2B6160C02AA7DC").IsUnique();

            entity.Property(e => e.RoleName).HasMaxLength(50);
        });

        modelBuilder.Entity<Tag>(entity =>
        {
            entity.HasKey(e => e.TagId).HasName("PK__Tag__657CF9ACC2347233");

            entity.ToTable("Tag");

            entity.HasIndex(e => e.TagName, "UQ__Tag__BDE0FD1D8CF0CDBF").IsUnique();

            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.Description).HasMaxLength(200);
            entity.Property(e => e.TagName).HasMaxLength(50);
            entity.Property(e => e.UpdatedAt).HasColumnType("datetime");
        });

        modelBuilder.Entity<Transaction>(entity =>
        {
            entity.HasKey(e => e.TransactionId).HasName("PK__Transact__55433A6B52651EAB");

            entity.ToTable("Transaction");

            entity.HasIndex(e => e.TransactionCode, "UQ__Transact__D85E70265BC03D35").IsUnique();

            entity.Property(e => e.Amount).HasColumnType("decimal(10, 2)");
            entity.Property(e => e.PurchasedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.Status).HasMaxLength(50);
            entity.Property(e => e.TransactionCode).HasMaxLength(100);

            entity.HasOne(d => d.Package).WithMany(p => p.Transactions)
                .HasForeignKey(d => d.PackageId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Transacti__Packa__48CFD27E");

            entity.HasOne(d => d.PaymentMethod).WithMany(p => p.Transactions)
                .HasForeignKey(d => d.PaymentMethodId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Transacti__Payme__49C3F6B7");

            entity.HasOne(d => d.User).WithMany(p => p.Transactions)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Transacti__UserI__47DBAE45");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("PK__User__1788CC4C88201A47");

            entity.ToTable("User");

            entity.HasIndex(e => e.Email, "UQ__User__A9D10534CB94C556").IsUnique();

            entity.Property(e => e.AvatarUrl).HasMaxLength(255);
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.Email).HasMaxLength(100);
            entity.Property(e => e.FullName).HasMaxLength(100);
            entity.Property(e => e.IsActive).HasDefaultValue(true);
            entity.Property(e => e.PasswordHash).HasMaxLength(255);
            entity.Property(e => e.PremiumExpiry).HasColumnType("datetime");
            entity.Property(e => e.ResetPasswordToken).HasMaxLength(255);
            entity.Property(e => e.ResetPasswordTokenExpiry).HasColumnType("datetime");
            entity.Property(e => e.TermsAcceptedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.UpdatedAt).HasColumnType("datetime");

            entity.HasOne(d => d.Role).WithMany(p => p.Users)
                .HasForeignKey(d => d.RoleId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__User__RoleId__3F466844");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
