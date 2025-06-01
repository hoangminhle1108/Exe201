import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftPagination from "components/SoftPagination";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import DialogContent from "@mui/material/DialogContent";
import Table from "examples/Tables/Table";
import SoftButton from "components/SoftButton";
import SoftBadge from "components/SoftBadge";
import Icon from "@mui/material/Icon";
import articleService from "services/articleService";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import * as Yup from "yup";

const defaultImage = "https://cleverads.vn/wp-content/uploads/2023/10/thi-truong-healthy-food-1.jpg";
const imageStyle = {
  width: "150px",
  height: "80px",
  borderRadius: "5px",
  marginTop: "5px",
  marginBottom: "-5px",
  marginLeft: "10px",
};

function BlogList() {
    const [articles, setArticles] = useState([]);
    const [selectedTag, setSelectedTag] = useState("");
    const [openModal, setOpenModal] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    useEffect(() => {
        articleService.getAllArticles().then(setArticles);
    }, []);

    const columns = [
        { name: "Ảnh", align: "left" },
        { name: "Tên", align: "left" },
        { name: "Tác giả", align: "left" },
        { name: "Ngày đăng", align: "center" },
        { name: "Hành động", align: "center" },
    ];

    const rows = articles.map(article => ({
        "Ảnh": <img src={defaultImage} alt={article.title} style={imageStyle} />,
        "Tên": (
            <SoftTypography variant="caption" fontWeight="medium" color="text">
                {article.title}
            </SoftTypography>
        ),
        "Tác giả": (
            <SoftTypography variant="caption" color="text" fontWeight="medium">
                {article.author}
            </SoftTypography>
        ),
        "Ngày đăng": (
            <SoftTypography variant="caption" color="text" fontWeight="medium">
                {article.publishedAt}
            </SoftTypography>
        ),
        "Hành động": (
            <SoftBox display="flex" alignItems="center" justifyContent="center" gap={1}>
                <SoftButton variant="text" color="info" onClick={() => window.location.href = `/he-thong-quan-ly-healthmate/danh-sach-bai-dang/chi-tiet-bai-dang?articleId=${article.articleId}` }>
                    <Icon>visibility</Icon>&nbsp;Xem chi tiết
                </SoftButton>
                <SoftButton variant="text" color="error">
                    <Icon>delete</Icon>&nbsp;Xóa
                </SoftButton>
                <SoftButton variant="text" color="dark" onClick={() => window.location.href = `/he-thong-quan-ly-healthmate/danh-sach-bai-dang/chinh-sua-bai-dang?articleId=${article.articleId}`}>
                    <Icon>edit</Icon>&nbsp;Chỉnh sửa
                </SoftButton>
            </SoftBox>
        ),
    }));

    const formik = useFormik({
        initialValues: {
            title: "",
            content: "",
            author: "",
        },
        validationSchema: Yup.object({
            title: Yup.string().required("Vui lòng nhập tiêu đề bài viết"),
            content: Yup.string().required("Vui lòng nhập nội dung bài viết"),
            author: Yup.string().required("Vui lòng nhập tên tác giả"),
        }),
        onSubmit: async (values, { resetForm }) => {
            try {
                setIsSubmitting(true);
                await articleService.createArticle(values);
                handleCloseModal();
                resetForm();
                // Refresh the article list
                const updatedArticles = await articleService.getAllArticles();
                setArticles(updatedArticles);
            } catch (error) {
                console.error("Error creating article:", error);
            } finally {
                setIsSubmitting(false);
            }
        },
    });

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <SoftBox py={3}>
                <Card>
                    <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
                        <SoftTypography variant="h6">Danh sách bài đăng</SoftTypography>

                        <SoftBox display="flex" alignItems="center" gap={1}>
                            <SoftTypography
                                variant="h6"
                                fontWeight="medium"
                                sx={{ textTransform: "none" }}
                            >
                                Lọc theo thẻ:
                            </SoftTypography>

                            <FormControl size="small" sx={{ minWidth: 150 }}>
                                <Select
                                    value={selectedTag}
                                    onChange={(e) => setSelectedTag(e.target.value)}
                                    displayEmpty
                                    renderValue={(value) => (value === "" ? "Tất cả" : value)}
                                >
                                    <MenuItem value="">Tất cả</MenuItem>
                                    <MenuItem value="Giảm cân">Giảm cân</MenuItem>
                                    <MenuItem value="Dễ làm">Dễ làm</MenuItem>
                                    <MenuItem value="Ngọt">Ngọt</MenuItem>
                                    <MenuItem value="Chay">Chay</MenuItem>
                                    <MenuItem value="Healthy">Healthy</MenuItem>
                                </Select>
                            </FormControl>

                            <SoftButton
                                variant="gradient"
                                color="success"
                                onClick={handleOpenModal}
                                sx={{ height: 0, ml: "20px" }}
                            >
                                Thêm bài đăng
                            </SoftButton>

                        </SoftBox>
                    </SoftBox>

                    <SoftBox
                        sx={{
                            "& .MuiTableRow-root:not(:last-child)": {
                                "& td": {
                                    borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                                        `${borderWidth[1]} solid ${borderColor}`,
                                },
                            },
                        }}
                    >
                        <Table columns={columns} rows={rows} />
                    </SoftBox>
                </Card>
                <SoftBox display="flex" justifyContent="flex-end" p={2}>
                    <SoftPagination>
                        <SoftPagination item>{"<"}</SoftPagination>
                        <SoftPagination item>1</SoftPagination>
                        <SoftPagination item>2</SoftPagination>
                        <SoftPagination item>3</SoftPagination>
                        <SoftPagination item>...</SoftPagination>
                        <SoftPagination item>10</SoftPagination>
                        <SoftPagination item>{">"}</SoftPagination>
                    </SoftPagination>
                </SoftBox>
            </SoftBox>
            <Dialog
                open={openModal}
                onClose={(event, reason) => {
                    if (reason !== "backdropClick" && reason !== "escapeKeyDown") {
                        handleCloseModal();
                    }
                }}
                fullWidth
                maxWidth="md"
            >
                <form onSubmit={formik.handleSubmit}>
                    <DialogTitle sx={{ m: 0, p: 2, borderBottom: "1px solid #eee" }}>
                        <SoftTypography variant="h5" fontWeight="bold">
                            Thêm bài đăng mới
                        </SoftTypography>
                        <IconButton
                            aria-label="close"
                            onClick={handleCloseModal}
                            sx={{
                                position: "absolute",
                                right: 8,
                                top: 8,
                                color: (theme) => theme.palette.grey[500],
                            }}
                        >
                            <CloseIcon />
                        </IconButton>
                    </DialogTitle>
                    <DialogContent sx={{ p: 3 }}>
                        <SoftBox display="flex" flexDirection="column" gap={3}>
                            <TextField
                                fullWidth
                                label="Tiêu đề bài viết"
                                name="title"
                                value={formik.values.title}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.title && Boolean(formik.errors.title)}
                                helperText={formik.touched.title && formik.errors.title}
                                variant="outlined"
                            />
                            
                            <TextField
                                fullWidth
                                label="Tác giả"
                                name="author"
                                value={formik.values.author}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.author && Boolean(formik.errors.author)}
                                helperText={formik.touched.author && formik.errors.author}
                                variant="outlined"
                            />

                            <TextField
                                fullWidth
                                label="Nội dung bài viết"
                                name="content"
                                value={formik.values.content}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.content && Boolean(formik.errors.content)}
                                helperText={formik.touched.content && formik.errors.content}
                                multiline
                                rows={6}
                                variant="outlined"
                            />
                        </SoftBox>
                    </DialogContent>
                    <DialogActions sx={{ p: 2, borderTop: "1px solid #eee" }}>
                        <SoftButton
                            variant="outlined"
                            color="secondary"
                            onClick={handleCloseModal}
                            disabled={isSubmitting}
                        >
                            Hủy
                        </SoftButton>
                        <SoftButton
                            variant="gradient"
                            color="success"
                            type="submit"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Đang lưu..." : "Lưu bài viết"}
                        </SoftButton>
                    </DialogActions>
                </form>
            </Dialog>
        </DashboardLayout>
    );
}

export default BlogList;
