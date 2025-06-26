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
import SoftInput from "components/SoftInput";

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
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // ✅ add currentPage state
  const usersPerPage = 4; // ✅ 4 per page

  useEffect(() => {
    userService.getAllUsers().then(setUsers);
    userService.getAdmins().then(setAdmins);
  }, []);

  const formatDate = (isoDate) => {
    if (!isoDate) return "";
    const d = new Date(isoDate);
    if (isNaN(d)) return isoDate;
    return `${String(d.getDate()).padStart(2, "0")}/${String(
      d.getMonth() + 1
    ).padStart(2, "0")}/${d.getFullYear()}`;
  };

  // ✅ filter
  const filteredUsers = users.filter((u) =>
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ✅ paginate
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage); // ✅ totalPages

  const userColumns = [
    { name: "Người dùng", align: "left" },
    { name: "Email", align: "left" },
    { name: "Ngày sinh", align: "center" },
  ];
  const userRows = currentUsers.map((u) => ({
    "Người dùng": (
      <Author image={u.avatarUrl || undefined} name={u.fullName} email={u.email} />
    ),
    "Email": (
      <SoftTypography variant="caption" color="text" fontWeight="medium">
        {u.email}
      </SoftTypography>
    ),
    "Ngày sinh": (
      <SoftTypography variant="caption" color="text" fontWeight="medium">
        {formatDate(u.dateOfBirth)}
      </SoftTypography>
    ),
  }));

  const adminColumns = [
    { name: "Quản trị viên", align: "left" },
    { name: "Email", align: "left" },
    { name: "Ngày sinh", align: "center" },
  ];
  const adminRows = admins.map((a) => ({
    "Quản trị viên": (
      <Author image={a.avatarUrl || undefined} name={a.fullName} email={a.email} />
    ),
    "Email": (
      <SoftTypography variant="caption" color="text" fontWeight="medium">
        {a.email}
      </SoftTypography>
    ),
    "Ngày sinh": (
      <SoftTypography variant="caption" color="text" fontWeight="medium">
        {formatDate(a.dateOfBirth)}
      </SoftTypography>
    ),
  }));

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        {/* ADMIN TABLE */}
        <SoftBox mb={3}>
          <Card>
            <SoftBox
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              p={3}
            >
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

        {/* USER TABLE */}
        <Card>
          <SoftBox
            p={3}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <SoftTypography variant="h6">Danh sách người dùng</SoftTypography>
            <SoftBox pr={1} sx={{ width: "300px" }}>
              <SoftInput
                placeholder="Tìm kiếm người dùng bằng email..."
                icon={{ component: "search", direction: "left" }}
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1); // reset page on search
                }}
              />
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
            <Table columns={userColumns} rows={userRows} />
          </SoftBox>
        </Card>

        {/* ✅ PAGINATION */}
        <SoftBox display="flex" justifyContent="flex-end" p={2}>
          <SoftPagination>
            <SoftPagination
              item
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            >
              {"<"}
            </SoftPagination>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
              <SoftPagination
                key={number}
                item
                active={number === currentPage}
                onClick={() => setCurrentPage(number)}
              >
                {number}
              </SoftPagination>
            ))}

            <SoftPagination
              item
              onClick={() =>
                setCurrentPage((p) => Math.min(p + 1, totalPages))
              }
            >
              {">"}
            </SoftPagination>
          </SoftPagination>
        </SoftBox>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default UserList;
