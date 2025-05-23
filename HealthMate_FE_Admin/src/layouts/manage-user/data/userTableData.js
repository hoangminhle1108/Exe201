import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftAvatar from "components/SoftAvatar";
import SoftBadge from "components/SoftBadge";
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import PropTypes from "prop-types";

Author.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

Function.propTypes = {
  job: PropTypes.string.isRequired,
  org: PropTypes.string.isRequired,
};

function Author({ image, name, email }) {
  return (
    <SoftBox display="flex" alignItems="center" px={1} py={0.5}>
      <SoftBox mr={2}>
        <SoftAvatar src={image} alt={name} size="sm" varia nt="rounded" />
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

function Function({ job, org }) {
  return (
    <SoftBox display="flex" flexDirection="column">
      <SoftTypography variant="caption" fontWeight="medium" color="text">
        {job}
      </SoftTypography>
      <SoftTypography variant="caption" color="text">
        {org}
      </SoftTypography>
    </SoftBox>
  );
}
const userTableData = {
  columns: [
    { name: "Người dùng", align: "left" },
    { name: "Số điện thoại", align: "left" },
    { name: "Gói đăng ký", align: "center" },
    { name: "Ngày tạo tài khoản", align: "center" },
  ],

  rows: [
    {
      "Người dùng": <Author image={team2} name="John Michael" email="john@creative-tim.com" />,
      "Số điện thoại": (
        <SoftTypography variant="caption" color="text" fontWeight="medium">
          0999999999
        </SoftTypography>
      ),
      "Gói đăng ký": (
        <SoftBadge variant="gradient" badgeContent="Miễn phí" color="warning" size="xs" container />
      ),
      "Ngày tạo tài khoản": (
        <SoftTypography variant="caption" color="text" fontWeight="medium">
          23/04/2018
        </SoftTypography>
      ),
    },
    {
      "Người dùng": <Author image={team3} name="Alexa Liras" email="alexa@creative-tim.com" />,
      "Số điện thoại": (
        <SoftTypography variant="caption" color="text" fontWeight="medium">
          0999999999
        </SoftTypography>
      ),
      "Gói đăng ký": (
        <SoftBadge variant="gradient" badgeContent="Gói tháng" color="success" size="xs" container />
      ),
      "Ngày tạo tài khoản": (
        <SoftTypography variant="caption" color="text" fontWeight="medium">
          11/01/2019
        </SoftTypography>
      ),
    },
    {
      "Người dùng": <Author image={team4} name="Laurent Perrier" email="laurent@creative-tim.com" />,
      "Số điện thoại": (
        <SoftTypography variant="caption" color="text" fontWeight="medium">
          0999999999
        </SoftTypography>
      ),
      "Gói đăng ký": (
        <SoftBadge variant="gradient" badgeContent="Gói năm" color="primary" size="xs" container />
      ),
      "Ngày tạo tài khoản": (
        <SoftTypography variant="caption" color="text" fontWeight="medium">
          19/09/2017
        </SoftTypography>
      ),
    },
    {
      "Người dùng": <Author image={team3} name="Michael Levi" email="michael@creative-tim.com" />,
      "Số điện thoại": (
        <SoftTypography variant="caption" color="text" fontWeight="medium">
          0999999999
        </SoftTypography>
      ),
      "Gói đăng ký": (
        <SoftBadge variant="gradient" badgeContent="Miễn phí" color="warning" size="xs" container />
      ),
      "Ngày tạo tài khoản": (
        <SoftTypography variant="caption" color="text" fontWeight="medium">
          24/12/2008
        </SoftTypography>
      ),
    },
    {
      "Người dùng": <Author image={team2} name="Richard Gran" email="richard@creative-tim.com" />,
      "Số điện thoại": (
        <SoftTypography variant="caption" color="text" fontWeight="medium">
          0999999999
        </SoftTypography>
      ),
      "Gói đăng ký": (
        <SoftBadge variant="gradient" badgeContent="Gói tháng" color="success" size="xs" container />
      ),
      "Ngày tạo tài khoản": (
        <SoftTypography variant="caption" color="text" fontWeight="medium">
          04/10/2021
        </SoftTypography>
      ),
    },
    {
      "Người dùng": <Author image={team4} name="Miriam Eric" email="miriam@creative-tim.com" />,
      "Số điện thoại": (
        <SoftTypography variant="caption" color="text" fontWeight="medium">
          0999999999
        </SoftTypography>
      ),
      "Gói đăng ký": (
        <SoftBadge variant="gradient" badgeContent="Gói năm" color="primary" size="xs" container />
      ),
      "Ngày tạo tài khoản": (
        <SoftTypography variant="caption" color="text" fontWeight="medium">
          14/09/2020
        </SoftTypography>
      ),
    },
  ],

};

export default userTableData;
