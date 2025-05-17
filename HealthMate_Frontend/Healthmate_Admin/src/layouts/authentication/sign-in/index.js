import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Switch from "@mui/material/Switch";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
import CoverLayout from "layouts/authentication/components/CoverLayout";
import { useSoftUIController, setLayout } from "context";
import banner from "assets/images/loginBanner.png";

function SignIn() {
  const [rememberMe, setRememberMe] = useState(true);
  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const [, dispatch] = useSoftUIController();
  const navigate = useNavigate();

  useEffect(() => {
    setLayout(dispatch, "authentication");
  }, [dispatch]);

  const handleSignIn = (e) => {
    e.preventDefault(); // Prevent the form from submitting
    // Navigate to /bang-thong-ke regardless of input
    navigate("/bang-thong-ke");
  };

  return (
    <CoverLayout
      title="Hệ Thống Quản Lý HealthMate"
      description="Nhập email và mật khẩu để đăng nhập vào hệ thống"
      image={banner}
    >
      <SoftBox component="form" role="form" onSubmit={handleSignIn}>
        <SoftBox mb={1}>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              Email
            </SoftTypography>
          </SoftBox>
          <SoftInput type="email" placeholder="Nhập email" icon={{}} />
        </SoftBox>
        <SoftBox mb={2}>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              Mật Khẩu
            </SoftTypography>
          </SoftBox>
          <SoftInput type="password" placeholder="Nhập mật khẩu" icon={{}} />
        </SoftBox>
        <SoftBox display="flex" alignItems="center">
          <Switch checked={rememberMe} onChange={handleSetRememberMe} />
          <SoftTypography
            variant="button"
            fontWeight="regular"
            onClick={handleSetRememberMe}
            sx={{ cursor: "pointer", userSelect: "none", textTransform: "none" }}
          >
            &nbsp;&nbsp;Ghi nhớ tài khoản
          </SoftTypography>
        </SoftBox>
        <SoftBox mt={5} mb={1}>
          <SoftButton variant="gradient" color="success" fullWidth type="submit">
            Đăng nhập
          </SoftButton>
        </SoftBox>
      </SoftBox>
    </CoverLayout>
  );
}

export default SignIn;
