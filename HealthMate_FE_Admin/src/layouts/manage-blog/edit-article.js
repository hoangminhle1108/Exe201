import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import articleService from "services/articleService";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";

function EditArticle() {
  const [form, setForm] = useState({ title: "", content: "", author: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const articleId = params.get("articleId");
    articleService.getArticleById(articleId).then(data => {
      setForm({
        title: data.title || "",
        content: data.content || "",
        author: data.author || ""
      });
      setLoading(false);
    }).catch(err => {
      setError("Không thể tải dữ liệu bài viết");
      setLoading(false);
    });
  }, [location.search]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const params = new URLSearchParams(location.search);
    const articleId = params.get("articleId");
    try {
      await articleService.updateArticle(articleId, form);
      navigate(`/he-thong-quan-ly-healthmate/danh-sach-bai-dang/chi-tiet-bai-dang?articleId=${articleId}`);
    } catch (err) {
      setError("Cập nhật bài đăng thất bại");
    }
  };

  if (loading) return <SoftTypography>Đang tải...</SoftTypography>;

  return (
    <SoftBox py={3}>
      <Card sx={{ maxWidth: 700, mx: "auto", p: 4 }}>
        <SoftTypography variant="h4" fontWeight="bold" mb={3}>
          Chỉnh sửa bài đăng
        </SoftTypography>
        {error && <SoftTypography color="error" mb={2}>{error}</SoftTypography>}
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Tiêu đề"
            name="title"
            value={form.title}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Tác giả"
            name="author"
            value={form.author}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Nội dung"
            name="content"
            value={form.content}
            onChange={handleChange}
            margin="normal"
            required
            multiline
            rows={8}
          />
          <SoftBox mt={3} display="flex" gap={2}>
            <SoftButton type="submit" color="success" variant="gradient">
              Lưu thay đổi
            </SoftButton>
            <SoftButton color="secondary" variant="outlined" onClick={() => navigate(-1)}>
              Hủy
            </SoftButton>
          </SoftBox>
        </form>
      </Card>
    </SoftBox>
  );
}

export default EditArticle; 