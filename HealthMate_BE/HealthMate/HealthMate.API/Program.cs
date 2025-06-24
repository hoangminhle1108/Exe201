using HealthMate.Repository.Interface.Article;
using HealthMate.Repository.Interface.HealthMetric;
using HealthMate.Repository.Interface.PremiumPackage;
using HealthMate.Repository.Interface.Recipe;
using HealthMate.Repository.Interface.Transaction;
using HealthMate.Repository.Interface.User;
using HealthMate.Repository.Models;
using HealthMate.Repository.Repository.Article;
using HealthMate.Repository.Repository.HealthMetric;
using HealthMate.Repository.Repository.PremiumPackage;
using HealthMate.Repository.Repository.Recipe;
using HealthMate.Repository.Repository.Transaction;
using HealthMate.Repository.Repository.User;
using HealthMate.Services.Interface.Article;
using HealthMate.Services.Interface.HealthMetric;
using HealthMate.Services.Interface.PremiumPackage;
using HealthMate.Services.Interface.Recipe;
using HealthMate.Services.Interface.Transaction;
using HealthMate.Services.Interface.User;
using HealthMate.Services.Service.Article;
using HealthMate.Services.Service.HealthMetric;
using HealthMate.Services.Service.PremiumPackage;
using HealthMate.Services.Service.Recipe;
using HealthMate.Services.Service.Transaction;
using HealthMate.Services.Service.User;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddDbContext<NutritionAppContext>(opts =>
    opts.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"))
        //.UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking)
);

// Add CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        builder =>
        {
            builder.AllowAnyOrigin()
                   .AllowAnyMethod()
                   .AllowAnyHeader();
        });
});
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo { Title = "HealthMate API", Version = "v1" });
    
    // Cấu hình Bearer cho Swagger UI
    c.AddSecurityDefinition("Bearer", new Microsoft.OpenApi.Models.OpenApiSecurityScheme
    {
        Name = "Authorization",
        In = Microsoft.OpenApi.Models.ParameterLocation.Header,
        Type = Microsoft.OpenApi.Models.SecuritySchemeType.Http, // Sử dụng Http
        Scheme = "bearer", // Chữ thường
        BearerFormat = "JWT"
    });

    c.AddSecurityRequirement(new Microsoft.OpenApi.Models.OpenApiSecurityRequirement
    {
        {
            new Microsoft.OpenApi.Models.OpenApiSecurityScheme
            {
                Reference = new Microsoft.OpenApi.Models.OpenApiReference
                {
                    Type = Microsoft.OpenApi.Models.ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            Array.Empty<string>()
        }
    });
});



var jwtConfig = builder.Configuration.GetSection("Jwt");
var key = Encoding.UTF8.GetBytes(jwtConfig["Key"]);

// 2) Th�m authentication
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultSignInScheme = CookieAuthenticationDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.RequireHttpsMetadata = true;
    options.SaveToken = true;
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = jwtConfig["Issuer"],
        ValidAudience = jwtConfig["Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(key)
    };
})
.AddCookie()
.AddGoogle(google =>
{
    google.ClientId = builder.Configuration["Authentication:Google:ClientId"];
    google.ClientSecret = builder.Configuration["Authentication:Google:ClientSecret"];
    //google.CallbackPath = "/api/Auth/google-response";
});
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<IJwtService, JwtService>();
builder.Services.AddScoped<IArticleRepository, ArticleRepository>();
builder.Services.AddScoped<IArticleService, ArticleService>();
builder.Services.AddScoped<IHealthMetricRepository,HealthMetricRepository>();
builder.Services.AddScoped<IHealthMetricService, HealthMetricService>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IPremiumPackageRepository, PremiumPackageRepository>();
builder.Services.AddScoped<IPremiumPackageService, PremiumPackageService>();
builder.Services.AddScoped<IRecipeRepository,RecipeRepository>();
builder.Services.AddScoped<IRecipeService, RecipeService>();
builder.Services.AddScoped<IEmailService, EmailService>();
builder.Services.AddScoped<ITransactionRepository, TransactionRepository>();
builder.Services.AddScoped<ITransactionService, TransactionService>();
builder.Services.AddSession(options =>
{
    options.IdleTimeout = TimeSpan.FromMinutes(30);
    options.Cookie.SameSite = SameSiteMode.None;
    options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
});

builder.Services.AddDistributedMemoryCache();

var app = builder.Build();

// Configure the HTTP request pipeline.
//if (app.Environment.IsDevelopment())
//{
    app.UseSwagger();
    app.UseSwaggerUI();
//}

// app.UseHttpsRedirection();
// Use CORS
app.UseCors("AllowAll");
app.UseSession();
app.UseCookiePolicy(new CookiePolicyOptions
{
    MinimumSameSitePolicy = SameSiteMode.None,
    Secure = CookieSecurePolicy.Always
});



app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
