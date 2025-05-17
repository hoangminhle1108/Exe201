import { useParams, Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftBadge from "components/SoftBadge";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

function RecipeDetail() {
    const { id } = useParams();

    const recipe = {
        title: "Bún chả Hà Nội",
        image: "https://cleverads.vn/wp-content/uploads/2023/10/thi-truong-healthy-food-1.jpg",
        steps: [
            {
                title: "Sơ chế thịt ba chỉ",
                details: [
                    "Ướp với nước mắm, tiêu, tỏi trong 30 phút.",
                    "Sau khi ướp lấy ra để ráo.",
                ],
            },
            {
                title: "Nướng thịt",
                details: ["Nướng trên than hồng hoặc lò nướng cho đến khi vàng đều."],
            },
            {
                title: "Làm nước mắm chua ngọt",
                details: [
                    "Pha nước mắm, đường, giấm, tỏi, ớt theo khẩu vị.",
                    "Khuấy đều đến khi tan hết.",
                ],
            },
            {
                title: "Luộc bún và trình bày",
                details: [
                    "Luộc bún cho mềm, vớt ra để ráo.",
                    "Dọn bún kèm rau sống, chả nướng và nước mắm chua ngọt.",
                ],
            },
        ],
        tags: [
            { label: "Đặc sản", color: "info" },
            { label: "Món Việt", color: "success" },
            { label: "Nướng", color: "warning" },
        ],
        likes: 128,
    };

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <SoftBox py={3}>
                <Card sx={{ pl: 5, pr: 5, pb: 3, pt: 3 }}>
                    {/* Header row */}
                    <SoftBox display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                        <Link to="/danh-sach-cong-thuc" style={{ textDecoration: "none" }}>
                            <SoftTypography variant="h6" color="dark" fontWeight="medium">
                                &lt; Quay lại
                            </SoftTypography>
                        </Link>

                        <SoftTypography variant="h6" fontWeight="bold" textAlign="center" flex={1}>
                            {recipe.title}
                        </SoftTypography>

                        <SoftBox display="flex" alignItems="center" justifyContent="flex-end" gap={0.5} minWidth="120px">
                            <FavoriteIcon color="error" fontSize="small" sx={{ mb: "3px" }} />
                            <SoftTypography variant="h6" color="dark">
                                {recipe.likes} lượt thích
                            </SoftTypography>
                        </SoftBox>

                    </SoftBox>

                    {/* Image */}
                    <CardMedia
                        component="img"
                        image={recipe.image}
                        alt={recipe.title}
                        sx={{ borderRadius: 2, maxHeight: 400, objectFit: "cover", width: "100%", mb: 2, ml: 0, mt: 0 }}
                    />

                    {/* Tags outside image */}
                    <SoftBox display="flex" justifyContent="flex-end" flexWrap="wrap" gap={1} mb={1}>
                        {recipe.tags.map((tag, idx) => (
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
                        {recipe.steps.map((step, index) => (
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

export default RecipeDetail;
