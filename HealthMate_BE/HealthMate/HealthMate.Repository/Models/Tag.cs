using System;
using System.Collections.Generic;

namespace HealthMate.Repository.Models;

public partial class Tag
{
    public int TagId { get; set; }

    public string TagName { get; set; } = null!;

    public string? Description { get; set; }

    public DateTime CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }

    public virtual ICollection<ArticleTagMapping> ArticleTagMappings { get; set; } = new List<ArticleTagMapping>();
}
