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
const adminTableData = {
  columns: [
    { name: "Quản trị viên", align: "left" },
    { name: "Số điện thoại", align: "left" },
    { name: "Ngày tạo tài khoản", align: "center" },
  ],

  rows: [
    {
      "Quản trị viên": <Author image={team3} name="Michael Levi" email="michael@creative-tim.com" />,
      "Số điện thoại": (
        <SoftTypography variant="caption" color="text" fontWeight="medium">
          0999999999
        </SoftTypography>
      ),
      "Ngày tạo tài khoản": (
        <SoftTypography variant="caption" color="text" fontWeight="medium">
          24/12/2008
        </SoftTypography>
      ),
    },
  ],

};

export default adminTableData;
