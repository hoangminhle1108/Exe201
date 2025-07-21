import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import Table from "examples/Tables/Table";
import dashboardService from "services/dashboardService";
import { CircularProgress } from "@mui/material";
import SoftPagination from "components/SoftPagination";
import SoftButton from "components/SoftButton";

function Projects() {
  const [columns] = useState([
    { name: "email", align: "center" },
    { name: "mã đơn", align: "center" },
    { name: "gói", align: "center" },
    { name: "giá", align: "center" },
    { name: "ngày tạo", align: "center" },
    { name: "ngày thanh toán", align: "center" },
    { name: "tình trạng", align: "center" },
    { name: "đã nhận tiền", align: "center" },

  ]);

  const [allTransactions, setAllTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const transactionsPerPage = 6;

  const mapPackageNameToId = {
    "Gói 30 ngày": 1,
    "Gói 90 ngày": 2,
    "Gói 365 ngày": 3,
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const isOverdue = (createdDate) => {
    const created = new Date(createdDate);
    const now = new Date();
    return now - created > 24 * 60 * 60 * 1000;
  };

  const formatCurrency = (amount) =>
    amount.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });

  const renderStatus = (status) => {
    let text = "";
    let color = "";

    switch (status) {
      case "Paid":
        text = "Đã thanh toán";
        color = "success";
        break;
      case "Expired":
        text = "Hết hạn";
        color = "error";
        break;
      case "Unpaid":
        text = "Chưa thanh toán";
        color = "warning";
        break;
      default:
        text = status;
        color = "text";
    }

    return (
      <SoftTypography variant="caption" fontWeight="medium" color={color}>
        {text}
      </SoftTypography>
    );
  };

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const data = await dashboardService.getAllTransactions();
      setAllTransactions(data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleMarkAsPaid = async (transaction) => {
    const packageId = mapPackageNameToId[transaction.packageName];
    if (!packageId) {
      alert("Không xác định được gói dịch vụ cho giao dịch này.");
      return;
    }

    try {
      await dashboardService.updateStatusToPaid({
        transactionId: transaction.transactionId,
        userId: transaction.userId,
        packageId,
      });
      fetchTransactions();
    } catch (err) {
      console.error("Error updating to paid:", err);
    }
  };

  const handleMarkExpired = async () => {
    setUpdating(true);
    try {
      const unpaidOverdue = allTransactions.filter(
        (t) => t.status === "Unpaid" && isOverdue(t.createdDate)
      );

      for (const t of unpaidOverdue) {
        const packageId = mapPackageNameToId[t.packageName];
        if (!packageId) {
          console.warn("Không tìm thấy gói:", t.packageName);
          continue;
        }
        await dashboardService.updateStatusToExpired(t.transactionId);
      }

      fetchTransactions();
    } catch (err) {
      console.error("Error updating expired transactions:", err);
    } finally {
      setUpdating(false);
    }
  };

  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = allTransactions.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
  );
  const totalPages = Math.ceil(allTransactions.length / transactionsPerPage);

  const rows = currentTransactions.map((transaction) => ({
    email: (
      <SoftTypography variant="caption" color="text">
        {transaction.email}
      </SoftTypography>
    ),
    "mã đơn": (
      <SoftTypography variant="caption" color="text">
        {transaction.transactionCode}
      </SoftTypography>
    ),
    gói: (
      <SoftTypography variant="caption" color="text">
        {transaction.packageName}
      </SoftTypography>
    ),
    giá: (
      <SoftTypography variant="caption" color="text">
        {formatCurrency(transaction.packagePrice)}
      </SoftTypography>
    ),
    "ngày tạo": (
      <SoftTypography variant="caption" color="text">
        {formatDate(transaction.createdDate)}
      </SoftTypography>
    ),
    "ngày thanh toán": (
      <SoftTypography variant="caption" color="text">
        {transaction.status === "Paid" && transaction.paymentDate
          ? formatDate(transaction.paymentDate)
          : "-"}
      </SoftTypography>
    ),
    "tình trạng": renderStatus(transaction.status),
    "đã nhận tiền": (
      <SoftButton
        variant="gradient"
        color={transaction.status === "Unpaid" ? "success" : "secondary"}
        size="small"
        disabled={transaction.status !== "Unpaid"}
        onClick={() => handleMarkAsPaid(transaction)}
      >
        Đã nhận tiền
      </SoftButton>
    ),
  }));

  return (
    <div>
      <Card>
        <SoftBox
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          p={3}
        >
          <SoftTypography variant="h6" gutterBottom>
            Các Đơn Thanh Toán
          </SoftTypography>

          <SoftButton
            variant="gradient"
            color="info"
            size="small"
            onClick={handleMarkExpired}
            disabled={updating}
          >
            Cập nhật đơn hết hạn
          </SoftButton>
        </SoftBox>

        <SoftBox
          sx={{
            "& .MuiTableRow-root:not(:last-child)": {
              "& td": {
                borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                  `${borderWidth[1]} solid ${borderColor}`,
              },
            },
          }}
        >
          {loading ? (
            <SoftBox display="flex" justifyContent="center" py={4}>
              <CircularProgress size={24} />
            </SoftBox>
          ) : (
            <Table columns={columns} rows={rows} />
          )}
        </SoftBox>
      </Card>

      {!loading && totalPages > 1 && (
        <SoftBox display="flex" justifyContent="flex-end" p={2}>
          <SoftPagination>
            <SoftPagination
              item
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            >
              {"<"}
            </SoftPagination>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
              <SoftPagination
                key={number}
                item
                active={number === currentPage}
                onClick={() => setCurrentPage(number)}
              >
                {number}
              </SoftPagination>
            ))}

            <SoftPagination
              item
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            >
              {">"}
            </SoftPagination>
          </SoftPagination>
        </SoftBox>
      )}
    </div>
  );
}

export default Projects;
