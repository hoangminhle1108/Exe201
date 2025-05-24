using HealthMate.Repository.Interface.User;
using HealthMate.Repository.Models;
using Microsoft.EntityFrameworkCore.Storage;


namespace HealthMate.Repository.Base
{
    public class UnitOfWork
    {
        private readonly NutritionAppContext _context;
        private IDbContextTransaction? _transaction;

        public IUserRepository UserRepository { get; }

        public UnitOfWork(NutritionAppContext context, IUserRepository userRepository)
        {
            _context = context;
            UserRepository = userRepository;
        }

        public async Task BeginTransactionAsync()
        {
            _transaction = await _context.Database.BeginTransactionAsync();
        }

        public async Task CommitTransactionAsync()
        {
            if (_transaction != null)
            {
                await _transaction.CommitAsync();
                await _transaction.DisposeAsync();
                _transaction = null;
            }
        }

        public async Task RollbackTransactionAsync()
        {
            if (_transaction != null)
            {
                await _transaction.RollbackAsync();
                await _transaction.DisposeAsync();
                _transaction = null;
            }
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }

        private bool _disposed = false;
        public virtual void Dispose(bool disposing)
        {
            if (!_disposed)
            {
                if (disposing)
                {
                    _context.Dispose();
                }
                _disposed = true;
            }
        }
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
    }
}
