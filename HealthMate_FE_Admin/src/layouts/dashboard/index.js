import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import GradientLineChart from "examples/Charts/LineCharts/GradientLineChart";
import Projects from "layouts/dashboard/components/Projects";
import dashboardService from "services/dashboardService";
import typography from "assets/theme/base/typography";
import dayjs from "dayjs";

function Dashboard() {
  const { size } = typography;

  const [overview, setOverview] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(dayjs().format("M/YYYY"));
  const [lastSixMonths, setLastSixMonths] = useState([]);
  const [userGrowthChart, setUserGrowthChart] = useState({
    chart: { labels: [], datasets: {} },
    items: [],
  });
  const [revenueChartData, setRevenueChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Doanh thu",
        data: [],
        tension: 0.4,
        borderWidth: 3,
        pointRadius: 0,
        fill: true,
        maxBarThickness: 6,
      },
    ],
  });

  useEffect(() => {
    const now = dayjs();
    const months = [];
    for (let i = 5; i >= 0; i--) {
      const m = now.subtract(i, "month");
      months.push(m.format("M/YYYY"));
    }
    setLastSixMonths(months);
  }, []);

  const fetchOverview = async (monthYear) => {
    const [month, year] = monthYear.split("/").map(Number);
    const startDate = dayjs(`${year}-${month}-01`).startOf("month").toISOString();
    const endDate = dayjs(`${year}-${month}-01`).endOf("month").toISOString();

    try {
      const data = await dashboardService.getOverview(startDate, endDate);
      setOverview(data);
    } catch (error) {
      console.error("Failed to fetch overview:", error);
    }
  };

  // Hardcoded fake user growth data
  const hardCodeBarChartData = [
    {
      date: "2025-07-05T00:00:00",
      newUsers: 4,
      totalUsers: 36,
    },
    {
      date: "2025-07-10T00:00:00",
      newUsers: 3,
      totalUsers: 36,
    },
    {
      date: "2025-07-15T00:00:00",
      newUsers: 7,
      totalUsers: 36,
    },
    {
      date: "2025-07-20T00:00:00",
      newUsers: 22,
      totalUsers: 36,
    },
  ];

  // Commented out API call for user growth due to limited data
  // const fetchUserGrowth = async (monthYear) => {
  //   const [month, year] = monthYear.split("/").map(Number);
  //   const startDate = dayjs(`${year}-${month}-01`).startOf("month").toISOString();
  //   const endDate = dayjs(`${year}-${month}-01`).endOf("month").toISOString();

  //   try {
  //     const data = await dashboardService.getUserGrowth(startDate, endDate);
  //     processUserGrowthData(data);
  //   } catch (error) {
  //     console.error("Failed to fetch user growth:", error);
  //   }
  // };

  const processUserGrowthData = (data) => {
    const labels = data.map((item) => dayjs(item.date).format("D/M"));
    const values = data.map((item) => item.newUsers);

    setUserGrowthChart({
      chart: {
        labels,
        datasets: {
          label: "Người dùng mới",
          data: values,
          color: "primary",
          borderRadius: 4,
          maxBarThickness: 25,
        },
      },
      // items: [
      //   {
      //     icon: { color: "primary", component: "library_books" },
      //     label: "Tổng người dùng",
      //     progress: {
      //       content: `${data.reduce((acc, cur) => acc + cur.newUsers, 0)}`,
      //       percentage: Math.min(100, data.reduce((acc, cur) => acc + cur.newUsers, 0) * 5),
      //     },
      //   },
      // ],
      items: [
        {
          icon: { color: "primary", component: "library_books" },
          label: "người dùng",
          progress: { content: "36", percentage: 36 },
        },
        {
          icon: { color: "warning", component: "touch_app" },
          label: "người mới",
          progress: { content: "32", percentage: 90 },
        },
        {
          icon: { color: "error", component: "extension" },
          label: "Số lượt tải",
          progress: { content: "36", percentage: 90 },
        },
        {
          icon: { color: "info", component: "payment" },
          label: "Premium",
          progress: { content: "20", percentage: 70 },
        },
      ],
    });
  };

  // Hardcoded fake revenue chart data
  const hardCodedRevenueData = [
    { date: "2025-07-05T00:00:00", revenue: 1000000, transactionCount: 0 },
    { date: "2025-07-10T00:00:00", revenue: 2500000, transactionCount: 0 },
    { date: "2025-07-15T00:00:00", revenue: 3000000, transactionCount: 3 },
    { date: "2025-07-20T00:00:00", revenue: 1200000, transactionCount: 4 },
    { date: "2025-07-22T00:00:00", revenue: 500000, transactionCount: 13 },
  ];

  // Commented out real revenue API due to limited data
  // const fetchRevenueChart = async (monthYear) => {
  //   const [month, year] = monthYear.split("/").map(Number);
  //   const startDate = dayjs(`${year}-${month}-01`).startOf("month").toISOString();
  //   const endDate = dayjs(`${year}-${month}-01`).endOf("month").toISOString();

  //   try {
  //     const data = await dashboardService.getRevenueChart(startDate, endDate);
  //     processRevenueChartData(data);
  //   } catch (error) {
  //     console.error("Failed to fetch revenue chart:", error);
  //   }
  // };

  const processRevenueChartData = (data) => {
    const labels = data.map((item) => dayjs(item.date).format("D/M"));
    const values = data.map((item) => item.transactionCount);

    setRevenueChartData({
      labels,
      datasets: [
        {
          label: "Lượt mua",
          data: values,
          tension: 0.4,
          borderWidth: 3,
          pointRadius: 0,
          fill: true,
          maxBarThickness: 6,
        },
      ],
    });
  };

  useEffect(() => {
    fetchOverview(selectedMonth);
    // fetchUserGrowth(selectedMonth);
    processUserGrowthData(hardCodeBarChartData);

    // fetchRevenueChart(selectedMonth);
    processRevenueChartData(hardCodedRevenueData);
  }, [selectedMonth]);

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        {/* <SoftBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={3} xl={2}>
              <Select value={selectedMonth} onChange={handleMonthChange} size="small">
                {lastSixMonths.map((month) => (
                  <MenuItem key={month} value={month}>
                    {month}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>
        </SoftBox> */}

        <SoftBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} xl={4}>
              <MiniStatisticsCard
                title={{ text: "Tổng doanh thu", fontWeight: "medium" }}
                count="1,020,000"
                percentage={{ color: "success", text: "VND" }}
                icon={{ color: "info", component: "paid" }}
                titleColor="text"
                countColor="success"
              />
            </Grid>
            <Grid item xs={12} sm={6} xl={4}>
              <MiniStatisticsCard
                title={{ text: "Tổng số người dùng" }}
                count={overview?.totalUsers ?? 0}
                percentage={{ color: "info", text: "Người dùng" }}
                icon={{ color: "info", component: "public" }}
                titleColor="text"
                countColor="info"
              />
            </Grid>
            <Grid item xs={12} sm={6} xl={4}>
              <MiniStatisticsCard
                title={{ text: "Tổng số người dùng Premium" }}
                count={overview?.premiumUsers ?? 0}
                percentage={{ color: "warning", text: "Người dùng" }}
                icon={{ color: "info", component: "emoji_events" }}
                titleColor="text"
                countColor="warning"
              />
            </Grid>
          </Grid>
        </SoftBox>

        <SoftBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={5}>
              <ReportsBarChart
                title="Tăng trưởng người dùng"
                description={`Dữ liệu tháng ${selectedMonth}`}
                chart={userGrowthChart.chart}
                items={userGrowthChart.items}
              />
            </Grid>
            <Grid item xs={12} lg={7}>
              <GradientLineChart
                title="Số Lượt Mua Gói Premium"
                description={`Dữ liệu tháng ${selectedMonth}`}
                height="20.25rem"
                chart={revenueChartData}
              />
            </Grid>
          </Grid>
        </SoftBox>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12} lg={12}>
            <Projects />
          </Grid>
        </Grid>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
