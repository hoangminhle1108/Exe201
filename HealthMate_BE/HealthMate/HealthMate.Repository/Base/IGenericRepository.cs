﻿using System.Linq.Expressions;

namespace HealthMate.Repository.Base
{
    public interface IGenericRepository<T> where T : class
    {
        Task<IEnumerable<T>> GetAllAsync();
        Task<IEnumerable<T>> GetAllWithIncludeAsync(params Expression<Func<T, object>>[] includeProperties);
        T? GetById(int id);
        Task<T?> GetByIdAsync(int TId);
        Task<T?> GetByIdWithIncludeAsync(int TId, string typeId, params Expression<Func<T, object>>[] includeProperties);
        void Add(T item);
        Task<int> AddAsync(T item);
        void Update(T item);
        bool Delete(T item);
        Task<bool> DeleteAsync(T? item);
        Task<T> UpdateAsync(T item);
    }
}
