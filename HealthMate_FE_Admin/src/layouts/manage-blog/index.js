import { useState } from "react";
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
import blogTableData from "layouts/manage-blog/data/blogTableData";
import SoftButton from "components/SoftButton";

function BlogList() {
    const { columns, rows } = blogTableData;
    const [selectedTag, setSelectedTag] = useState("");
    const [openModal, setOpenModal] = useState(false);
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

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
                maxWidth="sm"
            >
                <DialogTitle sx={{ m: 0, p: 2 }}>
                    Thêm bài đăng
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
                <DialogContent dividers>
                    <SoftTypography>
                        Đây là form để thêm bài đăng mới
                    </SoftTypography>
                </DialogContent>
            </Dialog>
        </DashboardLayout>
    );
}

export default BlogList;
