import { useParams, Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftBadge from "components/SoftBadge";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

function BlogDetail() {
    const { id } = useParams();

    const blog = {
        title: "10 cách tự giảm cân tại nhà",
        image: "https://cleverads.vn/wp-content/uploads/2023/10/thi-truong-healthy-food-1.jpg",
        steps: [
            {
                title: "Uống đủ nước mỗi ngày",
                details: [
                    "Uống từ 2 đến 2.5 lít nước giúp tăng cường trao đổi chất và giảm cảm giác thèm ăn."
                ]
            },
            {
                title: "Ăn nhiều rau xanh và trái cây",
                details: [
                    "Chất xơ trong rau củ giúp bạn no lâu và hạn chế nạp thêm calo."
                ]
            },
            {
                title: "Hạn chế đồ ăn nhanh và thức ăn chế biến sẵn",
                details: [
                    "Những thực phẩm này thường chứa nhiều calo, muối và chất béo không tốt."
                ]
            },
            {
                title: "Tập thể dục đều đặn tại nhà",
                details: [
                    "Tập cardio, plank, squat hoặc nhảy dây mỗi ngày ít nhất 30 phút."
                ]
            },
            {
                title: "Ngủ đủ giấc",
                details: [
                    "Thiếu ngủ làm rối loạn hormone và khiến bạn ăn nhiều hơn vào ngày hôm sau."
                ]
            },
            {
                title: "Ăn sáng đầy đủ, ăn tối nhẹ",
                details: [
                    "Ăn sáng giúp khởi động cơ thể, còn ăn tối nhẹ giúp tiêu hóa tốt hơn trước khi ngủ."
                ]
            },
            {
                title: "Theo dõi lượng calo hằng ngày",
                details: [
                    "Ghi lại những gì bạn ăn sẽ giúp kiểm soát lượng calo và thay đổi thói quen ăn uống."
                ]
            },
            {
                title: "Hạn chế đường và nước ngọt có gas",
                details: [
                    "Đường dễ gây tích mỡ và nước ngọt chứa nhiều calo rỗng không cần thiết."
                ]
            },
            {
                title: "Tạo thói quen ăn chậm, nhai kỹ",
                details: [
                    "Ăn chậm giúp não bộ có thời gian nhận tín hiệu no, tránh ăn quá nhiều."
                ]
            },
            {
                title: "Giữ tinh thần thoải mái",
                details: [
                    "Căng thẳng dễ khiến bạn ăn uống không kiểm soát và ảnh hưởng đến việc giảm cân."
                ]
            }
        ],
        tags: [
            { label: "Giảm cân", color: "info" },
            { label: "Ở nhà", color: "success" },
        ],
        likes: 320
    };

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <SoftBox py={3}>
                <Card sx={{ pl: 5, pr: 5, pb: 3, pt: 3 }}>
                    {/* Header row */}
                    <SoftBox display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                        <Link to="/danh-sach-bai-dang" style={{ textDecoration: "none" }}>
                            <SoftTypography variant="h6" color="dark" fontWeight="medium">
                                &lt; Quay lại
                            </SoftTypography>
                        </Link>

                        <SoftTypography variant="h6" fontWeight="bold" textAlign="center" flex={1}>
                            {blog.title}
                        </SoftTypography>

                        <SoftBox display="flex" alignItems="center" justifyContent="flex-end" gap={0.5} minWidth="120px">
                            <FavoriteIcon color="error" fontSize="small" sx={{ mb: "3px" }} />
                            <SoftTypography variant="h6" color="dark">
                                {blog.likes} lượt thích
                            </SoftTypography>
                        </SoftBox>

                    </SoftBox>

                    {/* Image */}
                    <CardMedia
                        component="img"
                        image={blog.image}
                        alt={blog.title}
                        sx={{ borderRadius: 2, maxHeight: 400, objectFit: "cover", width: "100%", mb: 2, ml: 0, mt: 0 }}
                    />

                    {/* Tags outside image */}
                    <SoftBox display="flex" justifyContent="flex-end" flexWrap="wrap" gap={1} mb={1}>
                        {blog.tags.map((tag, idx) => (
                            <SoftBadge
                                key={idx}
                                variant="gradient"
                                badgeContent={tag.label}
                                color={tag.color}
                                size="xs"
                                container
                            />
                        ))}
                    </SoftBox>

                    {/* Steps */}
                    <SoftBox component="div" pl={3}>
                        {blog.steps.map((step, index) => (
                            <SoftBox key={index} mb={2}>
                                <SoftTypography variant="h6" fontWeight="bold" mt={2}>
                                    Bước {index + 1}: {step.title}
                                </SoftTypography>
                                <ul style={{ listStyleType: "disc", paddingLeft: "20px", marginTop: 4 }}>
                                    {step.details.map((detail, idx) => (
                                        <li key={idx}>
                                            <SoftTypography variant="body2" color="text">
                                                {detail}
                                            </SoftTypography>
                                        </li>
                                    ))}
                                </ul>
                            </SoftBox>
                        ))}
                    </SoftBox>

                </Card>
            </SoftBox>
        </DashboardLayout>
    );
}

export default BlogDetail;
