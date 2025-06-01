import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import UserList from "layouts/manage-user";
import PackageList from "layouts/manage-package";
import BlogList from "layouts/manage-blog";
import RecipeList from "layouts/manage-recipe";
import Billing from "layouts/billing";
import SignIn from "layouts/authentication/sign-in";
import EditArticle from "layouts/manage-blog/edit-article";

import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import ArticleIcon from "@mui/icons-material/Article";
import ScienceIcon from "@mui/icons-material/Science";
import LogoutIcon from "@mui/icons-material/Logout";

import RecipeDetail from "layouts/manage-recipe/detail";
import BlogDetail from "layouts/manage-blog/detail";

const routes = [
  { type: "title", title: "thống kê", key: "trang-thong-ke" },

  {
    type: "collapse",
    name: "Bảng thống kê",
    key: "bang-thong-ke",
    route: "/bang-thong-ke",
    icon: <DashboardIcon fontSize="small" />,
    component: <Dashboard />,
    noCollapse: true,
  },
  { type: "title", title: "quản lý", key: "trang-quan-ly" },
  {
    type: "collapse",
    name: "Quản lý người dùng",
    key: "danh-sach-nguoi-dung",
    route: "/danh-sach-nguoi-dung",
    icon: <GroupIcon fontSize="small" />,
    component: <UserList />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Quản lý gói trả phí",
    key: "danh-sach-goi-tra-phi",
    route: "/danh-sach-goi-tra-phi",
    icon: <MonetizationOnIcon fontSize="small" />,
    component: <PackageList />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Quản lý bài đăng",
    key: "danh-sach-bai-dang",
    route: "/danh-sach-bai-dang",
    icon: <ArticleIcon fontSize="small" />,
    component: <BlogList />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Quản lý công thức",
    key: "danh-sach-cong-thuc",
    route: "/danh-sach-cong-thuc",
    icon: <ScienceIcon fontSize="small" />,
    component: <RecipeList />,
    noCollapse: true,
  },
  { type: "title", title: "Tài khoản", key: "trang-tai-khoan" },
  {
    type: "collapse",
    name: "Đăng xuất",
    key: "dang-nhap",
    route: "/dang-nhap",
    icon: <LogoutIcon fontSize="small" />,
    component: <SignIn />,
    noCollapse: true,
  },
  {
    type: "route",
    name: "Chi tiết công thức",
    key: "chi-tiet-cong-thuc",
    // route: "/danh-sach-cong-thuc/chi-tiet-cong-thuc/:id",
    route: "/danh-sach-cong-thuc/chi-tiet-cong-thuc",
    component: <RecipeDetail />,
    noCollapse: true,
  },
  {
    type: "route",
    name: "Chi tiết bài đăng",
    key: "chi-tiet-bai-dang",
    // route: "/danh-sach-bai-dang/chi-tiet-bai-dang/:id",
    route: "/danh-sach-bai-dang/chi-tiet-bai-dang",
    component: <BlogDetail />,
    noCollapse: true,
  },
  {
    type: "route",
    name: "Chỉnh sửa bài đăng",
    key: "chinh-sua-bai-dang",
    route: "/danh-sach-bai-dang/chinh-sua-bai-dang",
    component: <EditArticle />,
    noCollapse: true,
  },
];

export default routes;
