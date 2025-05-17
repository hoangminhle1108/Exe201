const reportsBarChartData = {
  chart: {
    labels: ["T4", "T5", "T6", "T7", "T8", "T9", "T10", "T11", "T12"],
    datasets: {
      label: "Sales",
      data: [450, 200, 100, 220, 500, 100, 400, 230, 500],
      color: "primary",
      borderRadius: 4,
      maxBarThickness: 25,
    },
  },

  items: [
    {
      icon: { color: "primary", component: "library_books" },
      label: "users",
      progress: { content: "36K", percentage: 60 },
    },
    {
      icon: { color: "warning", component: "touch_app" },
      label: "clicks",
      progress: { content: "2M", percentage: 90 },
    },
    {
      icon: { color: "info", component: "payment" },
      label: "sales",
      progress: { content: "$435", percentage: 30 },
    },
    {
      icon: { color: "error", component: "extension" },
      label: "items",
      progress: { content: "43", percentage: 50 },
    },
  ],
};

export default reportsBarChartData;
