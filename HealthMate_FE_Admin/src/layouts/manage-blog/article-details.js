import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import SoftButton from "components/SoftButton";
import Icon from "@mui/material/Icon";
import articleService from "services/articleService";
import { format } from "date-fns";
import { vi } from "date-fns/locale";

function ArticleDetails() {
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const params = new URLSearchParams(location.search);
                const articleId = params.get("articleId");
                
                if (!articleId) {
                    throw new Error("Không tìm thấy ID bài viết");
                }

                console.log("Fetching article with ID:", articleId);
                const data = await articleService.getArticleById(articleId);
                console.log("API Response:", data);
                
                if (!data) {
                    throw new Error("Không tìm thấy dữ liệu bài viết");
                }

                // Ensure we have all required fields
                if (!data.title || !data.content || !data.author) {
                    console.warn("Article data missing required fields:", data);
                }

                setArticle(data);
            } catch (err) {
                console.error("Error fetching article:", err);
                setError(err.message || "Có lỗi xảy ra khi tải bài viết");
            } finally {
                setLoading(false);
            }
        };

        fetchArticle();
    }, [location.search]);

    const formatDate = (dateString) => {
        if (!dateString) return "Chưa cập nhật";
        return format(new Date(dateString), "HH:mm 'ngày' dd 'tháng' MM 'năm' yyyy", { locale: vi });
    };

    if (loading) {
        return (
            <DashboardLayout>
                <DashboardNavbar />
                <SoftBox py={3}>
                    <Card>
                        <SoftBox p={3}>
                            <SoftTypography>Đang tải...</SoftTypography>
                        </SoftBox>
                    </Card>
                </SoftBox>
            </DashboardLayout>
        );
    }

    if (error) {
        return (
            <DashboardLayout>
                <DashboardNavbar />
                <SoftBox py={3}>
                    <Card>
                        <SoftBox p={3}>
                            <SoftTypography color="error">{error}</SoftTypography>
                            <SoftButton
                                variant="gradient"
                                color="info"
                                onClick={() => navigate("/he-thong-quan-ly-healthmate/danh-sach-bai-dang")}
                                sx={{ mt: 2 }}
                            >
                                <Icon>arrow_back</Icon>&nbsp;Quay lại danh sách
                            </SoftButton>
                        </SoftBox>
                    </Card>
                </SoftBox>
            </DashboardLayout>
        );
    }

    if (!article) {
        return null;
    }

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <SoftBox py={3}>
                <Card>
                    <SoftBox p={3}>
                        {/* Header Section */}
                        <SoftBox 
                            display="flex" 
                            justifyContent="space-between" 
                            alignItems="center" 
                            mb={4}
                            sx={{
                                borderBottom: "1px solid #eee",
                                pb: 3
                            }}
                        >
                            <SoftBox>
                                <SoftTypography variant="h3" fontWeight="bold" mb={1}>
                                    {article.title}
                                </SoftTypography>
                                <SoftBox display="flex" alignItems="center" gap={2}>
                                    <SoftTypography variant="h6" color="text" fontWeight="medium">
                                        <Icon sx={{ fontSize: "1.2rem", mr: 0.5, verticalAlign: "middle" }}>person</Icon>
                                        {article.author}
                                    </SoftTypography>
                                    <SoftTypography variant="body2" color="text">
                                        <Icon sx={{ fontSize: "1rem", mr: 0.5, verticalAlign: "middle" }}>schedule</Icon>
                                        {formatDate(article.publishedAt)}
                                    </SoftTypography>
                                </SoftBox>
                            </SoftBox>
                            <SoftButton
                                variant="gradient"
                                color="info"
                                onClick={() => navigate("/he-thong-quan-ly-healthmate/danh-sach-bai-dang")}
                            >
                                <Icon>arrow_back</Icon>&nbsp;Quay lại danh sách
                            </SoftButton>
                        </SoftBox>

                        {/* Content Section */}
                        <SoftBox 
                            sx={{ 
                                py: 3,
                                px: 2,
                                backgroundColor: "#fafafa",
                                borderRadius: "8px",
                                minHeight: "300px"
                            }}
                        >
                            <SoftTypography 
                                variant="body1" 
                                sx={{
                                    fontSize: "1.1rem",
                                    lineHeight: 1.8,
                                    whiteSpace: "pre-wrap",
                                    "& p": {
                                        mb: 2
                                    }
                                }}
                            >
                                {article.content}
                            </SoftTypography>
                        </SoftBox>

                        {/* Footer Section */}
                        <SoftBox 
                            mt={4} 
                            pt={3} 
                            borderTop="1px solid #eee"
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            <SoftTypography variant="body2" color="text">
                                {article.updatedAt && (
                                    <>
                                        <Icon sx={{ fontSize: "1rem", mr: 0.5, verticalAlign: "middle" }}>update</Icon>
                                        Cập nhật lần cuối: {formatDate(article.updatedAt)}
                                    </>
                                )}
                            </SoftTypography>
                            <SoftBox display="flex" gap={2}>
                                <SoftButton
                                    variant="gradient"
                                    color="dark"
                                    onClick={() => navigate(`/he-thong-quan-ly-healthmate/danh-sach-bai-dang/chinh-sua-bai-dang?articleId=${article.articleId}`)}
                                >
                                    <Icon>edit</Icon>&nbsp;Chỉnh sửa
                                </SoftButton>
                                <SoftButton
                                    variant="gradient"
                                    color="error"
                                    onClick={() => {
                                        // TODO: Implement delete functionality
                                        console.log("Delete article:", article.articleId);
                                    }}
                                >
                                    <Icon>delete</Icon>&nbsp;Xóa
                                </SoftButton>
                            </SoftBox>
                        </SoftBox>
                    </SoftBox>
                </Card>
            </SoftBox>
        </DashboardLayout>
    );
}

export default ArticleDetails; 