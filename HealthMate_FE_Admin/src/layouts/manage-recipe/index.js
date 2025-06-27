import { useState, useEffect } from "react";
import { useFormik } from "formik";
import {
    Card,
    Select,
    MenuItem,
    FormControl,
    Dialog,
    DialogTitle,
    DialogContent,
    IconButton,
    Grid,
    TextField,
    Box
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Icon from "@mui/material/Icon";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftPagination from "components/SoftPagination";
import SoftButton from "components/SoftButton";
import SoftBadge from "components/SoftBadge";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Table from "examples/Tables/Table";
import recipeService from "services/recipeService";

const imageStyle = {
    width: "150px",
    height: "80px",
    borderRadius: "5px",
    marginTop: "5px",
    marginBottom: "-5px",
    marginLeft: "10px",
};

function RecipeList() {
    const [allRecipes, setAllRecipes] = useState([]);
    const [rows, setRows] = useState([]);
    const [selectedTag, setSelectedTag] = useState("");
    const [openModal, setOpenModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const recipesPerPage = 3;
    const [categoryOptions, setCategoryOptions] = useState([]);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [selectedRecipeToDelete, setSelectedRecipeToDelete] = useState(null);

    const handleOpenDeleteModal = (recipe) => {
        setSelectedRecipeToDelete(recipe);
        setOpenDeleteModal(true);
    };

    const handleCloseDeleteModal = () => {
        setOpenDeleteModal(false);
        setSelectedRecipeToDelete(null);
    };

    const handleDeleteRecipe = async () => {
        try {
            await recipeService.deleteRecipe(selectedRecipeToDelete.recipeId);
            handleCloseDeleteModal();
            const updated = await recipeService.getAllRecipe();
            setAllRecipes(updated);
        } catch (error) {
            console.error("Delete failed:", error);
        }
    };


    const [openEditModal, setOpenEditModal] = useState(false);
    const [editRecipeId, setEditRecipeId] = useState(null);
    const [editFormValues, setEditFormValues] = useState({
        title: "",
        description: "",
        ingredients: "",
        instructions: "",
        cookingTime: 0,
        servings: 0,
        calories: 0,
        difficulty: "",
        imageUrl: ""
    });

    const handleEditOpen = (recipe) => {
        setEditFormValues({
            title: recipe.title,
            description: recipe.description,
            ingredients: recipe.ingredients,
            instructions: recipe.instructions,
            cookingTime: recipe.cookingTime,
            servings: recipe.servings,
            calories: recipe.calories,
            difficulty: recipe.difficulty,
            imageUrl: recipe.imageUrl,
        });
        setEditRecipeId(recipe.recipeId);
        setOpenEditModal(true);
    };

    const handleEditChange = (e) => {
        setEditFormValues({ ...editFormValues, [e.target.name]: e.target.value });
    };

    const handleEditSubmit = async () => {
        try {
            await recipeService.updateRecipe(editRecipeId, editFormValues);
            setOpenEditModal(false);
            const updated = await recipeService.getAllRecipe();
            setAllRecipes(updated);
        } catch (error) {
            console.error("Update failed:", error);
        }
    };

    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    const formik = useFormik({
        initialValues: {
            title: "",
            description: "",
            ingredients: "",
            instructions: "",
            cookingTime: 0,
            servings: 0,
            calories: 0,
            difficulty: "",
            imageUrl: "",
            categories: [],
            createdBy: 1,
        },
        onSubmit: async (values) => {
            try {
                const formatted = {
                    ...values,
                    categories: values.categories.map((id) => {
                        const cat = categoryOptions.find((c) => c.categoryId === id);
                        return { categoryId: cat.categoryId, categoryName: cat.categoryName };
                    }),
                };
                await recipeService.createRecipe(formatted);
                handleCloseModal();
                const data = await recipeService.getAllRecipe();
                setAllRecipes(data);
            } catch (error) {
                console.error("Failed to create recipe:", error);
            }
        },

    });

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const data = await recipeService.getAllRecipe();
                setAllRecipes(data);
            } catch (error) {
                console.error("Failed to load recipes:", error);
            }
        };

        const fetchCategories = async () => {
            try {
                const data = await recipeService.getAllCategory();
                setCategoryOptions(data);
            } catch (error) {
                console.error("Failed to fetch categories:", error);
            }
        };

        fetchCategories();
        fetchRecipes();
    }, []);

    useEffect(() => {
        const filtered = selectedTag
            ? allRecipes.filter((r) =>
                r.categories.some((c) => c.categoryName === selectedTag)
            )
            : allRecipes;

        const startIdx = (currentPage - 1) * recipesPerPage;
        const paginated = filtered.slice(startIdx, startIdx + recipesPerPage);

        const formattedRows = paginated.map((recipe) => ({
            Ảnh: (
                <img src={recipe.imageUrl} alt={recipe.title} style={imageStyle} />
            ),
            Tên: (
                <SoftTypography variant="caption" fontWeight="medium" color="text">
                    {recipe.title}
                </SoftTypography>
            ),
            Thẻ: (
                <SoftBox display="flex" flexWrap="wrap" gap={1}>
                    {recipe.categories.map((cat) => (
                        <SoftBadge
                            key={cat.categoryId}
                            variant="gradient"
                            badgeContent={cat.categoryName}
                            color="info"
                            size="xs"
                            container
                        />
                    ))}
                </SoftBox>
            ),
            "Lượt thích": (
                <SoftTypography variant="caption" color="text" fontWeight="medium">
                    {recipe.likes}
                </SoftTypography>
            ),
            "Hành động": (
                <SoftBox display="flex" alignItems="center" justifyContent="center" gap={1}>
                    <SoftButton
                        variant="text"
                        color="info"
                        onClick={() =>
                            (window.location.href = `/he-thong-quan-ly-healthmate/danh-sach-cong-thuc/chi-tiet-cong-thuc/${recipe.recipeId}`)
                        }
                    >
                        <Icon>visibility</Icon>&nbsp;Xem chi tiết
                    </SoftButton>
                    <SoftButton variant="text" color="error" onClick={() => handleOpenDeleteModal(recipe)}>
                        <Icon>delete</Icon>&nbsp;Xóa
                    </SoftButton>

                    <SoftButton
                        variant="text"
                        color="dark"
                        onClick={() => handleEditOpen(recipe)}
                    >
                        <Icon>edit</Icon>&nbsp;Chỉnh sửa
                    </SoftButton>
                </SoftBox>
            ),
        }));

        setRows(formattedRows);
    }, [allRecipes, selectedTag, currentPage]);

    const totalPages = Math.ceil(
        (selectedTag
            ? allRecipes.filter((r) =>
                r.categories.some((c) => c.categoryName === selectedTag)
            ).length
            : allRecipes.length) / recipesPerPage
    );

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <SoftBox py={3}>
                <Card>
                    <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
                        <SoftTypography variant="h6">Danh sách công thức</SoftTypography>
                        <SoftBox display="flex" alignItems="center" gap={1}>
                            <SoftTypography variant="h6" fontWeight="medium">
                                Lọc theo thẻ:
                            </SoftTypography>
                            <FormControl size="small" sx={{ minWidth: 150 }}>
                                <Select
                                    value={selectedTag}
                                    onChange={(e) => {
                                        setSelectedTag(e.target.value);
                                        setCurrentPage(1);
                                    }}
                                    displayEmpty
                                    renderValue={(value) => (value === "" ? "Tất cả" : value)}
                                    sx={{ height: 40 }}
                                >
                                    <MenuItem value="">Tất cả</MenuItem>
                                    <MenuItem value="Dinh dưỡng">Dinh dưỡng</MenuItem>
                                    <MenuItem value="Giảm cân">Giảm cân</MenuItem>
                                    <MenuItem value="Thể dục">Thể dục</MenuItem>
                                    <MenuItem value="Sức khỏe">Sức khỏe</MenuItem>
                                    <MenuItem value="Yoga">Yoga</MenuItem>
                                    <MenuItem value="Ăn chay">Ăn chay</MenuItem>
                                    <MenuItem value="Ăn kiêng">Ăn kiêng</MenuItem>
                                    <MenuItem value="Món chính">Món chính</MenuItem>
                                </Select>
                            </FormControl>

                            <SoftButton
                                variant="gradient"
                                color="success"
                                onClick={handleOpenModal}
                                sx={{ ml: "20px" }}
                            >
                                Thêm công thức
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
                        <Table columns={[
                            { name: "Ảnh", align: "left" },
                            { name: "Tên", align: "left" },
                            { name: "Thẻ", align: "left" },
                            { name: "Lượt thích", align: "center" },
                            { name: "Hành động", align: "center" },
                        ]} rows={rows} />
                    </SoftBox>
                </Card>

                <SoftBox display="flex" justifyContent="flex-end" p={2}>
                    <SoftPagination>
                        <SoftPagination item onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}>
                            {"<"}
                        </SoftPagination>
                        {Array.from({ length: totalPages }, (_, i) => (
                            <SoftPagination
                                key={i + 1}
                                item
                                onClick={() => setCurrentPage(i + 1)}
                                active={currentPage === i + 1}
                            >
                                {i + 1}
                            </SoftPagination>
                        ))}
                        <SoftPagination item onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}>
                            {">"}
                        </SoftPagination>
                    </SoftPagination>
                </SoftBox>
            </SoftBox>

            {/* ADD RECIPE MODAL */}
            <Dialog
                open={openModal}
                onClose={(e, reason) =>
                    reason !== "backdropClick" && reason !== "escapeKeyDown" && handleCloseModal()
                }
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle sx={{ m: 0, p: 2 }}>
                    Thêm công thức
                    <IconButton
                        aria-label="close"
                        onClick={handleCloseModal}
                        sx={{ position: "absolute", right: 8, top: 8, color: (theme) => theme.palette.grey[500] }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>

                <DialogContent dividers>
                    <form onSubmit={formik.handleSubmit}>
                        <Box display="flex" flexDirection="column" gap={2} mb={2}>
                            <SoftTypography sx={{ fontSize: "15px", mb: "-10px" }}>Tên công thức:</SoftTypography>
                            <TextField fullWidth name="title" value={formik.values.title} onChange={formik.handleChange} />

                            <SoftTypography sx={{ fontSize: "15px", mb: "-10px" }}>Mô tả:</SoftTypography>
                            <TextField
                                fullWidth
                                multiline
                                minRows={2}
                                name="description"
                                value={formik.values.description}
                                onChange={formik.handleChange}
                            />

                            <SoftTypography sx={{ fontSize: "15px", mb: "-10px" }}>Nguyên liệu:</SoftTypography>
                            <TextField
                                fullWidth
                                multiline
                                minRows={3}
                                name="ingredients"
                                value={formik.values.ingredients}
                                onChange={formik.handleChange}
                            />

                            <SoftTypography sx={{ fontSize: "15px", mb: "-10px" }}>Hướng dẫn:</SoftTypography>
                            <TextField
                                fullWidth
                                multiline
                                minRows={3}
                                name="instructions"
                                value={formik.values.instructions}
                                onChange={formik.handleChange}
                            />

                            <SoftTypography sx={{ fontSize: "15px", mb: "-10px" }}>Thời gian nấu (phút):</SoftTypography>
                            <TextField
                                fullWidth
                                type="number"
                                name="cookingTime"
                                value={formik.values.cookingTime}
                                onChange={formik.handleChange}
                            />

                            <SoftTypography sx={{ fontSize: "15px", mb: "-10px" }}>Khẩu phần:</SoftTypography>
                            <TextField
                                fullWidth
                                type="number"
                                name="servings"
                                value={formik.values.servings}
                                onChange={formik.handleChange}
                            />

                            <SoftTypography sx={{ fontSize: "15px", mb: "-10px" }}>Calories:</SoftTypography>
                            <TextField
                                fullWidth
                                type="number"
                                name="calories"
                                value={formik.values.calories}
                                onChange={formik.handleChange}
                            />

                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <SoftTypography sx={{ fontSize: "15px", mb: "7px" }}>Độ khó:</SoftTypography>
                                    <FormControl fullWidth>
                                        <Select
                                            name="difficulty"
                                            value={formik.values.difficulty}
                                            onChange={formik.handleChange}
                                            displayEmpty
                                        >
                                            <MenuItem value="Dễ">Dễ</MenuItem>
                                            <MenuItem value="Trung bình">Trung bình</MenuItem>
                                            <MenuItem value="Khó">Khó</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={6}>
                                    <SoftTypography sx={{ fontSize: "15px", mb: "7px" }}>Thẻ:</SoftTypography>
                                    <FormControl fullWidth>
                                        <Select
                                            multiple
                                            name="categories"
                                            value={formik.values.categories}
                                            onChange={formik.handleChange}
                                            renderValue={(selected) => selected
                                                .map((id) =>
                                                    categoryOptions.find((cat) => cat.categoryId === id)?.categoryName
                                                ).join(", ")
                                            }
                                        >
                                            {categoryOptions.map((cat) => (
                                                <MenuItem key={cat.categoryId} value={cat.categoryId}>
                                                    {cat.categoryName}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>


                            <SoftTypography sx={{ fontSize: "15px", mb: "-10px" }}>URL hình ảnh:</SoftTypography>
                            <TextField
                                fullWidth
                                name="imageUrl"
                                value={formik.values.imageUrl}
                                onChange={formik.handleChange}
                            />
                        </Box>

                        <Box display="flex" justifyContent="flex-end" gap={2} mt={2}>
                            <SoftButton variant="outlined" color="secondary" onClick={handleCloseModal}>
                                Hủy
                            </SoftButton>
                            <SoftButton variant="gradient" color="success" type="submit">
                                Thêm
                            </SoftButton>
                        </Box>
                    </form>
                </DialogContent>
            </Dialog>

            {/* UPDATE MODAL  */}
            <Dialog
                open={openEditModal}
                onClose={(e, reason) =>
                    reason !== "backdropClick" && reason !== "escapeKeyDown" && setOpenEditModal(false)
                }
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle sx={{ m: 0, p: 2 }}>
                    Chỉnh sửa công thức
                    <IconButton
                        aria-label="close"
                        onClick={() => setOpenEditModal(false)}
                        sx={{ position: "absolute", right: 8, top: 8, color: (theme) => theme.palette.grey[500] }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>

                <DialogContent dividers>
                    <form onSubmit={(e) => { e.preventDefault(); handleEditSubmit(); }}>
                        <Box display="flex" flexDirection="column" gap={2} mb={2}>
                            <SoftTypography sx={{ fontSize: "15px", mb: "-10px" }}>Tên công thức:</SoftTypography>
                            <TextField
                                fullWidth
                                name="title"
                                value={editFormValues.title}
                                onChange={handleEditChange}
                            />

                            <SoftTypography sx={{ fontSize: "15px", mb: "-10px" }}>Mô tả:</SoftTypography>
                            <TextField
                                fullWidth
                                multiline
                                minRows={2}
                                name="description"
                                value={editFormValues.description}
                                onChange={handleEditChange}
                            />

                            <SoftTypography sx={{ fontSize: "15px", mb: "-10px" }}>Nguyên liệu:</SoftTypography>
                            <TextField
                                fullWidth
                                multiline
                                minRows={3}
                                name="ingredients"
                                value={editFormValues.ingredients}
                                onChange={handleEditChange}
                            />

                            <SoftTypography sx={{ fontSize: "15px", mb: "-10px" }}>Hướng dẫn:</SoftTypography>
                            <TextField
                                fullWidth
                                multiline
                                minRows={3}
                                name="instructions"
                                value={editFormValues.instructions}
                                onChange={handleEditChange}
                            />

                            <SoftTypography sx={{ fontSize: "15px", mb: "-10px" }}>Thời gian nấu (phút):</SoftTypography>
                            <TextField
                                fullWidth
                                type="number"
                                name="cookingTime"
                                value={editFormValues.cookingTime}
                                onChange={handleEditChange}
                            />

                            <SoftTypography sx={{ fontSize: "15px", mb: "-10px" }}>Khẩu phần:</SoftTypography>
                            <TextField
                                fullWidth
                                type="number"
                                name="servings"
                                value={editFormValues.servings}
                                onChange={handleEditChange}
                            />

                            <SoftTypography sx={{ fontSize: "15px", mb: "-10px" }}>Calories:</SoftTypography>
                            <TextField
                                fullWidth
                                type="number"
                                name="calories"
                                value={editFormValues.calories}
                                onChange={handleEditChange}
                            />

                            <SoftTypography sx={{ fontSize: "15px", mb: "-10px" }}>Độ khó:</SoftTypography>
                            <TextField
                                fullWidth
                                name="difficulty"
                                value={editFormValues.difficulty}
                                onChange={handleEditChange}
                            />

                            <SoftTypography sx={{ fontSize: "15px", mb: "-10px" }}>URL hình ảnh:</SoftTypography>
                            <TextField
                                fullWidth
                                name="imageUrl"
                                value={editFormValues.imageUrl}
                                onChange={handleEditChange}
                            />
                        </Box>

                        <Box display="flex" justifyContent="flex-end" gap={2} mt={2}>
                            <SoftButton variant="outlined" color="secondary" onClick={() => setOpenEditModal(false)}>
                                Hủy
                            </SoftButton>
                            <SoftButton variant="gradient" color="info" type="submit">
                                Cập nhật
                            </SoftButton>
                        </Box>
                    </form>
                </DialogContent>
            </Dialog>
            {/* DELETE MODAL */}
            <Dialog
                open={openDeleteModal}
                onClose={(e, reason) =>
                    reason !== "backdropClick" && reason !== "escapeKeyDown" && handleCloseDeleteModal()
                }
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle sx={{ m: 0, p: 2 }}>
                    Xác nhận xóa công thức
                    <IconButton
                        aria-label="close"
                        onClick={handleCloseDeleteModal}
                        sx={{ position: "absolute", right: 8, top: 8, color: (theme) => theme.palette.grey[500] }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent dividers>
                    <SoftTypography>
                        Bạn có chắc chắn muốn xóa công thức &quot;
                        <strong>{selectedRecipeToDelete?.title}</strong>
                        &quot; không?
                    </SoftTypography>
                    <Box display="flex" justifyContent="flex-end" gap={2} mt={3}>
                        <SoftButton variant="outlined" color="secondary" onClick={handleCloseDeleteModal}>
                            Hủy
                        </SoftButton>
                        <SoftButton variant="gradient" color="error" onClick={handleDeleteRecipe}>
                            Xóa
                        </SoftButton>
                    </Box>
                </DialogContent>
            </Dialog>

        </DashboardLayout>
    );
}

export default RecipeList;
