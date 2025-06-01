import Card from "@mui/material/Card";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftPagination from "components/SoftPagination";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Table from "examples/Tables/Table";
import userService from "services/userService";
import { useEffect, useState } from "react";
import SoftAvatar from "components/SoftAvatar";
import PropTypes from "prop-types";

function Author({ image, name, email }) {
  return (
    <SoftBox display="flex" alignItems="center" px={1} py={0.5}>
      <SoftBox mr={2}>
        <SoftAvatar src={image} alt={name} size="sm" variant="rounded" />
      </SoftBox>
      <SoftBox display="flex" flexDirection="column">
        <SoftTypography variant="button" fontWeight="medium" color="text">
          {name}
        </SoftTypography>
        <SoftTypography variant="caption" color="text">
          {email}
        </SoftTypography>
      </SoftBox>
    </SoftBox>
  );
}

Author.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

function UserList() {
  const [users, setUsers] = useState([]);
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    userService.getAllUsers().then(setUsers);
    userService.getAdmins().then(setAdmins);
  }, []);

  const userColumns = [
    { name: "Người dùng", align: "left" },
    { name: "Email", align: "left" },
    { name: "Ngày sinh", align: "center" },
    { name: "Ngày tạo tài khoản", align: "center" },
  ];

  const userRows = users.map(u => ({
    "Người dùng": <Author image={u.avatarUrl || undefined} name={u.fullName} email={u.email} />,
    "Email": (
      <SoftTypography variant="caption" color="text" fontWeight="medium">
        {u.email}
      </SoftTypography>
    ),
    "Ngày sinh": (
      <SoftTypography variant="caption" color="text" fontWeight="medium">
        {u.dateOfBirth}
      </SoftTypography>
    ),
    "Ngày tạo tài khoản": (
      <SoftTypography variant="caption" color="text" fontWeight="medium">
        {u.createdAt}
      </SoftTypography>
    ),
  }));

  const adminColumns = [
    { name: "Quản trị viên", align: "left" },
    { name: "Email", align: "left" },
    { name: "Ngày sinh", align: "center" },
    { name: "Ngày tạo tài khoản", align: "center" },
  ];

  const adminRows = admins.map(a => ({
    "Quản trị viên": <Author image={a.avatarUrl || undefined} name={a.fullName} email={a.email} />,
    "Email": (
      <SoftTypography variant="caption" color="text" fontWeight="medium">
        {a.email}
      </SoftTypography>
    ),
    "Ngày sinh": (
      <SoftTypography variant="caption" color="text" fontWeight="medium">
        {a.dateOfBirth}
      </SoftTypography>
    ),
    "Ngày tạo tài khoản": (
      <SoftTypography variant="caption" color="text" fontWeight="medium">
        {a.createdAt}
      </SoftTypography>
    ),
  }));

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
              <Table columns={adminColumns} rows={adminRows} />
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
            <Table columns={userColumns} rows={userRows} />
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
