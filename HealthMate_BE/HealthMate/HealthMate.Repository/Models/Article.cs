﻿using System;
using System.Collections.Generic;

namespace HealthMate.Repository.Models;

public partial class Article
{
    public int ArticleId { get; set; }

    public string Title { get; set; } = null!;

    public string Content { get; set; } = null!;

    public string? Author { get; set; }

    public DateTime PublishedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }

    public string? ImageUrl { get; set; }

    public int Likes { get; set; }

    public virtual ICollection<ArticleTagMapping> ArticleTagMappings { get; set; } = new List<ArticleTagMapping>();
}
