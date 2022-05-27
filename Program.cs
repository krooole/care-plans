using carePlans.DataAccess;

var builder = WebApplication.CreateBuilder(args);

// Tell the default serializer to keep property names when serializing
builder.Services.AddControllers()
    .AddJsonOptions(options=>options.JsonSerializerOptions.PropertyNamingPolicy=null);

// Enable CORS. Non-production allow everything policy
System.Console.WriteLine("Enable CORS");
builder.Services.AddCors(options=>{
    options.AddPolicy("AllowEverything", policy=>{
        policy.WithOrigins("*").AllowAnyHeader().AllowAnyMethod();
    });
});

// I will use the builtin dependency container features
// For this exercise, a simple JSON implementation of the data repository should be enough
builder.Services.AddScoped<ICarePlanRepo, JsonCarePlanRepo>();
// For the actual implementation, we would go for something like this
// builder.Services.AddScoped<ICarePlanRepo, SqlCarePlanRepo>();

var app = builder.Build();

// Configure the HTTP request pipeline.
// Template-provided: default host features for https, static files and the usual routing pattern
app.UseHttpsRedirection();
app.UseCors("AllowEverything");
// Automapping of controllers is OK for this scenario
app.MapControllers();

app.Run();
