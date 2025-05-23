import Card from "@mui/material/Card";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftPagination from "components/SoftPagination";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Table from "examples/Tables/Table";
import userTableData from "layouts/manage-user/data/userTableData";
import adminTableData from "layouts/manage-user/data/adminTableData";

function UserList() {
    const { columns, rows } = userTableData;
    const { columns: adCols, rows: adRows } = adminTableData;

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <SoftBox py={3}>
                <SoftBox mb={3}>
                    <Card>
                        <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
                            <SoftTypography variant="h6">Quản trị viên</SoftTypography>
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
                            <Table columns={adCols} rows={adRows} />
                        </SoftBox>
                    </Card>
                </SoftBox>
                <Card>
                    <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
                        <SoftTypography variant="h6">Danh sách người dùng</SoftTypography>
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
            <Footer />
        </DashboardLayout>
    );
}

export default UserList;
