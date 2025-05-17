/* eslint-disable react/prop-types */
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";
import SoftBadge from "components/SoftBadge";
import Icon from "@mui/material/Icon";

const imageStyle = {
  width: "150px",
  height: "80px",
  borderRadius: "5px",
  marginTop: "5px",
  marginBottom: "-5px",
  marginLeft: "10px",
};

const blogTableData = {
  columns: [
    { name: "Ảnh", align: "left" },
    { name: "Tên", align: "left" },
    { name: "Thẻ", align: "left" },
    { name: "Lượt thích", align: "center" },
    { name: "Hành động", align: "center" },
  ],

  rows: [
    {
      Ảnh: <img src="https://cleverads.vn/wp-content/uploads/2023/10/thi-truong-healthy-food-1.jpg" alt="Salad giảm cân" style={imageStyle} />,
      Tên: (
        <SoftTypography variant="caption" fontWeight="medium" color="text">
          Món ăn mọi nhà đều nên thử
        </SoftTypography>
      ),
      Thẻ: (
        <SoftBox display="flex" flexWrap="wrap" gap={1}>
          <SoftBadge variant="gradient" badgeContent="Giảm cân" color="info" size="xs" container />
          <SoftBadge variant="gradient" badgeContent="Dễ làm" color="success" size="xs" container />
        </SoftBox>
      ),
      "Lượt thích": (
        <SoftTypography variant="caption" color="text" fontWeight="medium">
          152
        </SoftTypography>
      ),
      "Hành động": (
        <SoftBox display="flex" alignItems="center" justifyContent="center" gap={1}>
          <SoftButton variant="text" color="info" onClick={() => window.location.href = "/he-thong-quan-ly-healthmate/danh-sach-bai-dang/chi-tiet-bai-dang"}>
            <Icon>visibility</Icon>&nbsp;Xem chi tiết
          </SoftButton>
          <SoftButton variant="text" color="error">
            <Icon>delete</Icon>&nbsp;Xóa
          </SoftButton>
          <SoftButton variant="text" color="dark">
            <Icon>edit</Icon>&nbsp;Chỉnh sửa
          </SoftButton>
        </SoftBox>
      ),
    },
    {
      Ảnh: <img src="https://cleverads.vn/wp-content/uploads/2023/10/thi-truong-healthy-food-1.jpg" alt="Bánh chuối yến mạch" style={imageStyle} />,
      Tên: (
        <SoftTypography variant="caption" fontWeight="medium" color="text">
          10 cách giảm cân tại nhà
        </SoftTypography>
      ),
      Thẻ: (
        <SoftBox display="flex" flexWrap="wrap" gap={1}>
          <SoftBadge variant="gradient" badgeContent="Ngọt" color="warning" size="xs" container />
          <SoftBadge variant="gradient" badgeContent="Dễ làm" color="success" size="xs" container />
        </SoftBox>
      ),
      "Lượt thích": (
        <SoftTypography variant="caption" color="text" fontWeight="medium">
          89
        </SoftTypography>
      ),
      "Hành động": (
        <SoftBox display="flex" alignItems="center" justifyContent="center" gap={1}>
          <SoftButton variant="text" color="info" onClick={() => window.location.href = "/he-thong-quan-ly-healthmate/danh-sach-bai-dang/chi-tiet-bai-dang"}>
            <Icon>visibility</Icon>&nbsp;Xem chi tiết
          </SoftButton>
          <SoftButton variant="text" color="error">
            <Icon>delete</Icon>&nbsp;Xóa
          </SoftButton>
          <SoftButton variant="text" color="dark">
            <Icon>edit</Icon>&nbsp;Chỉnh sửa
          </SoftButton>
        </SoftBox>
      ),
    },
    {
      Ảnh: <img src="https://cleverads.vn/wp-content/uploads/2023/10/thi-truong-healthy-food-1.jpg" alt="Gỏi cuốn chay" style={imageStyle} />,
      Tên: (
        <SoftTypography variant="caption" fontWeight="medium" color="text">
          Lý do phải ăn uống lành mạnh
        </SoftTypography>
      ),
      Thẻ: (
        <SoftBox display="flex" flexWrap="wrap" gap={1}>
          <SoftBadge variant="gradient" badgeContent="Chay" color="info" size="xs" container />
          <SoftBadge variant="gradient" badgeContent="Healthy" color="primary" size="xs" container />
        </SoftBox>
      ),
      "Lượt thích": (
        <SoftTypography variant="caption" color="text" fontWeight="medium">
          204
        </SoftTypography>
      ),
      "Hành động": (
        <SoftBox display="flex" alignItems="center" justifyContent="center" gap={1}>
          <SoftButton variant="text" color="info" onClick={() => window.location.href = "/he-thong-quan-ly-healthmate/danh-sach-bai-dang/chi-tiet-bai-dang"}>
            <Icon>visibility</Icon>&nbsp;Xem chi tiết
          </SoftButton>
          <SoftButton variant="text" color="error">
            <Icon>delete</Icon>&nbsp;Xóa
          </SoftButton>
          <SoftButton variant="text" color="dark">
            <Icon>edit</Icon>&nbsp;Chỉnh sửa
          </SoftButton>
        </SoftBox>
      ),
    },
  ],
};

export default blogTableData;
