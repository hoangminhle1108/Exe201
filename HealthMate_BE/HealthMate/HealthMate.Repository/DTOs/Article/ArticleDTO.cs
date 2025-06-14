using System.ComponentModel.DataAnnotations;

namespace HealthMate.Repository.DTOs.Article
{
    public class ArticleDTO
    {
        public int ArticleId { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public string? Author { get; set; }
        public string? ImageUrl { get; set; }
        public DateTime PublishedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public List<TagDTO> Tags { get; set; } = new();

    }
    public class TagDTO
    {
        public int TagId { get; set; }
        public string TagName { get; set; } = null!;
    }
    public class CreateArticleRequest
    {
        public string Title { get; set; } = null!;
        public string Content { get; set; } = null!;
        public string? Author { get; set; }
        public string? ImageUrl { get; set; }

        public List<int> TagIds { get; set; } = new();
    }

    public class UpdateArticleRequest
    {
        public string Title { get; set; } = null!;
        public string Content { get; set; } = null!;
        public string? Author { get; set; }
        public string? ImageUrl { get; set; }
        public List<int> TagIds { get; set; } = new();
    }
} 