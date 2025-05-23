/* eslint-disable react/prop-types */
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";
import Icon from "@mui/material/Icon";

// New simplified Author for "Gói" column
function Package({ name }) {
  return (
    <SoftTypography variant="button" fontWeight="medium" color="text" ml={2}>
      {name}
    </SoftTypography>
  );
}

const packageTableData = {
  columns: [
    { name: "Gói", align: "left" },
    { name: "Giá", align: "center" },
    { name: "Lần cuối chỉnh sửa", align: "center" },
    { name: "Hành động", align: "center" },
  ],

  rows: [
    {
      Gói: (
        <SoftTypography variant="caption" color="text" fontWeight="medium" ml="10px">
          Gói dùng thử
        </SoftTypography>
      ),
      Giá: (
        <SoftTypography variant="caption" color="text" fontWeight="medium">
          0 VND
        </SoftTypography>
      ),
      "Lần cuối chỉnh sửa": (
        <SoftTypography variant="caption" color="text" fontWeight="medium">
          01/04/2024
        </SoftTypography>
      ),
      "Hành động": (
        <SoftBox
          display="flex"
          alignItems="center"
          mt={{ xs: 2, sm: 0 }}
          ml={{ xs: -1.5, sm: 0 }}
          justifyContent="center"
        >
          <SoftBox>
            <SoftButton variant="text" color="error">
              <Icon>delete</Icon>&nbsp;Xóa
            </SoftButton>
          </SoftBox>
          <SoftButton variant="text" color="dark">
            <Icon>edit</Icon>&nbsp;Chỉnh sửa
          </SoftButton>
        </SoftBox>
      ),

    },
    {
      Gói:
        (
          <SoftTypography variant="caption" color="text" fontWeight="medium" ml="10px">
            Gói tháng
          </SoftTypography>
        ),
      Giá: (
        <SoftTypography variant="caption" color="text" fontWeight="medium">
          49,000 VND
        </SoftTypography>
      ),
      "Lần cuối chỉnh sửa": (
        <SoftTypography variant="caption" color="text" fontWeight="medium">
          15/03/2024
        </SoftTypography>
      ),
      "Hành động": (
        <SoftBox
          display="flex"
          alignItems="center"
          mt={{ xs: 2, sm: 0 }}
          ml={{ xs: -1.5, sm: 0 }}
          justifyContent="center"
        >
          <SoftBox>
            <SoftButton variant="text" color="error">
              <Icon>delete</Icon>&nbsp;Xóa
            </SoftButton>
          </SoftBox>
          <SoftButton variant="text" color="dark">
            <Icon>edit</Icon>&nbsp;Chỉnh sửa
          </SoftButton>
        </SoftBox>
      ),
    },
    {
      Gói:
        (
          <SoftTypography variant="caption" color="text" fontWeight="medium" ml="10px">
            Gói năm
          </SoftTypography>
        ),
      Giá: (
        <SoftTypography variant="caption" color="text" fontWeight="medium">
          419,000 VND
        </SoftTypography>
      ),
      "Lần cuối chỉnh sửa": (
        <SoftTypography variant="caption" color="text" fontWeight="medium">
          20/02/2024
        </SoftTypography>
      ),
      "Hành động": (
        <SoftBox
          display="flex"
          alignItems="center"
          mt={{ xs: 2, sm: 0 }}
          ml={{ xs: -1.5, sm: 0 }}
          justifyContent="center"
        >
          <SoftBox>
            <SoftButton variant="text" color="error">
              <Icon>delete</Icon>&nbsp;Xóa
            </SoftButton>
          </SoftBox>
          <SoftButton variant="text" color="dark">
            <Icon>edit</Icon>&nbsp;Chỉnh sửa
          </SoftButton>
        </SoftBox>
      ),
    },
  ],
};

export default packageTableData;
