import Icon from "@mui/material/Icon";
import SoftButton from "components/SoftButton";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

export const packageTableColumns = [
  { name: "Gói", align: "left" },
  { name: "Thời hạn", align: "center" },
  { name: "Giá", align: "center" },
  { name: "Chi tiết", align: "center" },
  { name: "Hành động", align: "center" },
];

export const formatCurrency = (amount) => {
  return amount.toLocaleString("vi-VN") + " VND";
};

export const formatDate = (dateStr) => {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d
    ? `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(
      2,
      "0"
    )}/${d.getFullYear()}`
    : "";
};
export const makePackageTableRows = (packages, onDelete, onUpdate) => {
  return packages.map((pkg) => ({
    Gói: (
      <SoftTypography variant="caption" color="text" fontWeight="medium" ml="10px">
        {pkg.packageName}
      </SoftTypography>
    ),
    Giá: (
      <SoftTypography variant="caption" color="text" fontWeight="medium">
        {formatCurrency(pkg.price)}
      </SoftTypography>
    ),
    "Chi tiết": (
      <SoftTypography variant="caption" color="text" fontWeight="medium" ml="10px">
        {pkg.description}
      </SoftTypography>
    ),
    "Thời hạn": (
      <SoftTypography variant="caption" color="text" fontWeight="medium" ml="10px">
        {pkg.durationDays} ngày
      </SoftTypography>
    ),
    "Hành động": (
      <SoftBox display="flex" alignItems="center" justifyContent="center">
        <SoftButton
          variant="text"
          color="error"
          onClick={() => onDelete(pkg)}
        >
          <Icon>delete</Icon>&nbsp;Xóa
        </SoftButton>
        <SoftButton
          variant="text"
          color="dark"
          onClick={() => onUpdate(pkg)}
        >
          <Icon>edit</Icon>&nbsp;Chỉnh sửa
        </SoftButton>
      </SoftBox>
    ),
  }));
};