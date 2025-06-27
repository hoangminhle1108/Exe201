// layouts/manage-package/index.js
import { useState, useEffect } from "react";

import Card from "@mui/material/Card";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/material";

import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import Table from "examples/Tables/Table";

import packageService from "services/packageService";
import { packageTableColumns, makePackageTableRows } from "./data/packageTableData";

function PackageList() {
    const [openModal, setOpenModal] = useState(false);
    const [openUpdateModal, setOpenUpdateModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);

    const [selectedPackage, setSelectedPackage] = useState(null);
    const [formData, setFormData] = useState({
        packageName: "",
        description: "",
        price: 0,
        durationDays: 0,
    });

    const [newPackageData, setNewPackageData] = useState({
        packageName: "",
        description: "",
        price: 0,
        durationDays: 0,
    });
    const handleNewInputChange = (e) => {
        setNewPackageData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };
    const handleCreatePackage = async () => {
        try {
            await packageService.createPackage(newPackageData);
            const data = await packageService.getAllPackage();
            setPackages(data || []);
            handleCloseModal();
            setNewPackageData({ packageName: "", description: "", price: 0, durationDays: 0 });
        } catch (error) {
            console.error("Error creating package:", error);
        }
    };

    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(true);

    const handleCloseModal = () => setOpenModal(false);
    const handleCloseDeleteModal = () => setOpenDeleteModal(false);
    const handleCloseUpdateModal = () => setOpenUpdateModal(false);

    const handleOpenDeleteModal = (pkg) => {
        setSelectedPackage(pkg);
        setOpenDeleteModal(true);
    };
    const handleOpenUpdateModal = (pkg) => {
        setSelectedPackage(pkg);
        setFormData({
            packageName: pkg.packageName,
            description: pkg.description,
            price: pkg.price,
            durationDays: pkg.durationDays,
        });
        setOpenUpdateModal(true);
    };
    const handleOpenModal = () => setOpenModal(true);

    const handleInputChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleUpdatePackage = async () => {
        if (!selectedPackage) return;
        try {
            await packageService.updatePackage(selectedPackage.packageId, formData);
            const data = await packageService.getAllPackage();
            setPackages(data || []);
            handleCloseUpdateModal();
        } catch (error) {
            console.error("Error updating package:", error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const data = await packageService.getAllPackage();
                setPackages(data || []);
            } catch (error) {
                console.error("Error fetching packages:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <DashboardLayout>
            <DashboardNavbar />

            <SoftBox py={3}>
                <Card>
                    <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
                        <SoftTypography variant="h6">Danh sách gói trả phí</SoftTypography>
                        <SoftButton variant="gradient" color="success" onClick={handleOpenModal} sx={{ ml: "20px" }}>
                            Thêm gói trả phí
                        </SoftButton>
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
                        {loading ? (
                            <SoftTypography p={3}></SoftTypography>
                        ) : (
                            <Table
                                columns={packageTableColumns}
                                rows={makePackageTableRows(packages, handleOpenDeleteModal, handleOpenUpdateModal)}
                            />
                        )}
                    </SoftBox>
                </Card>
            </SoftBox>

            {/* Add Package Modal */}
            <Dialog
                open={openModal}
                onClose={(e, reason) => reason !== "backdropClick" && reason !== "escapeKeyDown" && handleCloseModal()}
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle sx={{ m: 0, p: 2 }}>
                    Thêm gói trả phí
                    <IconButton
                        aria-label="close"
                        onClick={handleCloseModal}
                        sx={{ position: "absolute", right: 8, top: 8, color: (theme) => theme.palette.grey[500] }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent dividers>
                    <Box display="flex" flexDirection="column" gap={2} mb={2}>
                        <SoftTypography sx={{ fontSize: "15px", mb: "-10px" }}>Tên gói:</SoftTypography>
                        <TextField
                            name="packageName"
                            value={newPackageData.packageName}
                            onChange={handleNewInputChange}
                            fullWidth
                        />

                        <SoftTypography sx={{ fontSize: "15px", mb: "-10px" }}>Mô tả:</SoftTypography>
                        <TextField
                            multiline
                            minRows={4}
                            name="description"
                            value={newPackageData.description}
                            onChange={handleNewInputChange}
                            fullWidth
                        />

                        <SoftTypography sx={{ fontSize: "15px", mb: "-10px" }}>Giá:</SoftTypography>
                        <TextField
                            type="number"
                            name="price"
                            value={newPackageData.price}
                            onChange={handleNewInputChange}
                            fullWidth
                        />

                        <SoftTypography sx={{ fontSize: "15px", mb: "-10px" }}>Thời hạn (ngày):</SoftTypography>
                        <TextField
                            type="number"
                            name="durationDays"
                            value={newPackageData.durationDays}
                            onChange={handleNewInputChange}
                            fullWidth
                        />
                    </Box>
                    <Box display="flex" justifyContent="flex-end" gap={2} mt={2}>
                        <SoftButton variant="outlined" color="secondary" onClick={handleCloseModal}>Hủy</SoftButton>
                        <SoftButton variant="gradient" color="success" onClick={handleCreatePackage}>Tạo</SoftButton>
                    </Box>
                </DialogContent>
            </Dialog>

            {/* Delete Modal */}
            <Dialog
                open={openDeleteModal}
                onClose={(e, reason) => reason !== "backdropClick" && reason !== "escapeKeyDown" && handleCloseDeleteModal()}
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle sx={{ m: 0, p: 2 }}>
                    Xác nhận xóa gói trả phí
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
                        Hiện tại không thể xóa &quot;{selectedPackage?.packageName}&quot; vì gói đang được người dùng sử dụng.
                    </SoftTypography>
                </DialogContent>
            </Dialog>

            {/* Update Modal */}
            <Dialog
                open={openUpdateModal}
                onClose={(e, reason) => reason !== "backdropClick" && reason !== "escapeKeyDown" && handleCloseUpdateModal()}
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle sx={{ m: 0, p: 2 }}>
                    Chỉnh sửa gói trả phí
                    <IconButton
                        aria-label="close"
                        onClick={handleCloseUpdateModal}
                        sx={{ position: "absolute", right: 8, top: 8, color: (theme) => theme.palette.grey[500] }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent dividers>
                    {/* Input fields */}
                    <Box display="flex" flexDirection="column" gap={2} mb={2}>
                        <SoftTypography sx={{ fontSize: "15px", marginBottom: "-10px" }}>Tên gói:</SoftTypography>
                        <TextField
                            // label="Tên gói"
                            name="packageName"
                            value={formData.packageName}
                            disabled
                            fullWidth
                        />
                        <SoftTypography sx={{ fontSize: "15px", marginBottom: "-10px" }}>Mô tả:</SoftTypography>
                        <TextField
                            multiline
                            minRows={4}
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            fullWidth
                        />
                        <SoftTypography sx={{ fontSize: "15px", marginBottom: "-10px" }}>Giá:</SoftTypography>
                        <TextField
                            // label="Giá"
                            name="price"
                            type="number"
                            value={formData.price}
                            onChange={handleInputChange}
                            fullWidth
                        />
                        <SoftTypography sx={{ fontSize: "15px", marginBottom: "-10px" }}>Thời hạn (ngày):</SoftTypography>
                        <TextField
                            // label="Thời hạn (ngày)"
                            name="durationDays"
                            type="number"
                            value={formData.durationDays}
                            onChange={handleInputChange}
                            fullWidth
                        />
                    </Box>
                    {/* Action Buttons */}
                    <Box display="flex" justifyContent="flex-end" gap={2} mt={2}>
                        <SoftButton variant="outlined" color="secondary" onClick={handleCloseUpdateModal}>
                            Hủy
                        </SoftButton>
                        <SoftButton variant="gradient" color="info" onClick={handleUpdatePackage}>
                            Cập nhật
                        </SoftButton>
                    </Box>
                </DialogContent>
            </Dialog>
        </DashboardLayout>
    );
}

export default PackageList;
