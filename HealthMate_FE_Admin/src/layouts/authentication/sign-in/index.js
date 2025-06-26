import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Switch from "@mui/material/Switch";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput"; // still using SoftInput for email
import SoftButton from "components/SoftButton";
import CoverLayout from "layouts/authentication/components/CoverLayout";
import { useSoftUIController, setLayout } from "context";
import banner from "assets/images/loginBanner.png";
import authService from "services/authService";

// ✅ Import Material UI's TextField for the password input
import { TextField, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

function SignIn() {
  const [rememberMe, setRememberMe] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [, dispatch] = useSoftUIController();
  const navigate = useNavigate();

  useEffect(() => {
    setLayout(dispatch, "authentication");
    const savedEmail = localStorage.getItem("reEmail");
    const savedPass = localStorage.getItem("rePass");
    if (savedEmail && savedPass) {
      setEmail(savedEmail);
      setPassword(savedPass);
      setRememberMe(true);
    } else {
      setRememberMe(false);
    }
  }, [dispatch]);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await authService.login(email, password);
      if (result.success) {
        if (result.role === "Admin") {
          if (rememberMe) {
            localStorage.setItem("reEmail", email);
            localStorage.setItem("rePass", password);
          } else {
            localStorage.removeItem("reEmail");
            localStorage.removeItem("rePass");
          }
          navigate("/bang-thong-ke");
        } else {
          setError("Bạn không có quyền truy cập vào hệ thống quản trị");
          authService.logout();
        }
      } else {
        setError(result.message || "Đăng nhập thất bại");
      }
    } catch {
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

        {/* EMAIL */}
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

        {/* PASSWORD — using normal MUI TextField */}
        <SoftBox mb={2}>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              Mật Khẩu
            </SoftTypography>
          </SoftBox>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Nhập mật khẩu"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                    sx={{ ml: "180px" }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>

                </InputAdornment>
              ),
            }}
          />
        </SoftBox>

        {/* REMEMBER ME */}
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

        {/* SUBMIT */}
        <SoftBox mt={5} mb={1}>
          <SoftButton variant="gradient" color="success" fullWidth type="submit" disabled={loading}>
            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
          </SoftButton>
        </SoftBox>
      </SoftBox>
    </CoverLayout>
  );
}

export default SignIn;
