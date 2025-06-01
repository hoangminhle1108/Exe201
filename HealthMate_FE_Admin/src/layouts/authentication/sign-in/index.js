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
import authService from "services/authService";

function SignIn() {
  const [rememberMe, setRememberMe] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [, dispatch] = useSoftUIController();
  const navigate = useNavigate();

  useEffect(() => {
    setLayout(dispatch, "authentication");
  }, [dispatch]);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await authService.login(email, password);
      
      if (result.success) {
        if (result.role === "Admin") {
          navigate("/bang-thong-ke");
        } else {
          setError("Bạn không có quyền truy cập vào hệ thống quản trị");
          authService.logout();
        }
      } else {
        setError(result.message || "Đăng nhập thất bại");
      }
    } catch (error) {
      setError("Có lỗi xảy ra khi đăng nhập");
    } finally {
      setLoading(false);
    }
  };

  return (
    <CoverLayout
      title="Hệ Thống Quản Lý HealthMate"
      description="Nhập email và mật khẩu để đăng nhập vào hệ thống"
      image={banner}
    >
      <SoftBox component="form" role="form" onSubmit={handleSignIn}>
        {error && (
          <SoftBox mb={2}>
            <SoftTypography variant="caption" color="error" fontWeight="bold">
              {error}
            </SoftTypography>
          </SoftBox>
        )}
        <SoftBox mb={1}>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              Email
            </SoftTypography>
          </SoftBox>
          <SoftInput 
            type="email" 
            placeholder="Nhập email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </SoftBox>
        <SoftBox mb={2}>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              Mật Khẩu
            </SoftTypography>
          </SoftBox>
          <SoftInput 
            type="password" 
            placeholder="Nhập mật khẩu" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </SoftBox>
        <SoftBox display="flex" alignItems="center">
          <Switch checked={rememberMe} onChange={() => setRememberMe(!rememberMe)} />
          <SoftTypography
            variant="button"
            fontWeight="regular"
            onClick={() => setRememberMe(!rememberMe)}
            sx={{ cursor: "pointer", userSelect: "none", textTransform: "none" }}
          >
            &nbsp;&nbsp;Ghi nhớ tài khoản
          </SoftTypography>
        </SoftBox>
        <SoftBox mt={5} mb={1}>
          <SoftButton 
            variant="gradient" 
            color="success" 
            fullWidth 
            type="submit"
            disabled={loading}
          >
            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
          </SoftButton>
        </SoftBox>
      </SoftBox>
    </CoverLayout>
  );
}

export default SignIn;
