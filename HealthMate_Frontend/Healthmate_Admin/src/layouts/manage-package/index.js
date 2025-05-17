import Card from "@mui/material/Card";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useState } from "react";
import PackageTable from "examples/Tables/Table";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import DialogContent from "@mui/material/DialogContent";
import Table from "examples/Tables/Table";
import SoftButton from "components/SoftButton";
import packageTableData from "layouts/manage-package/data/packageTableData";

function PackageList() {
    const { columns, rows } = packageTableData;
    const [openModal, setOpenModal] = useState(false);
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <SoftBox py={3}>
                <Card>
                    <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
                        <SoftTypography variant="h6">Danh sách gói trả phí</SoftTypography>

                        <SoftBox display="flex" alignItems="center" gap={1}>

                            <SoftButton
                                variant="gradient"
                                color="success"
                                onClick={handleOpenModal}
                                sx={{ height: 0, ml: "20px" }}
                            >
                                Thêm gói trả phí
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
                        <PackageTable columns={columns} rows={rows} />
                    </SoftBox>
                </Card>
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
                    Thêm gói trả phí
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
                        Đây là form để thêm gói trả phí mới
                    </SoftTypography>
                </DialogContent>
            </Dialog>
        </DashboardLayout>
    );
}

export default PackageList;
