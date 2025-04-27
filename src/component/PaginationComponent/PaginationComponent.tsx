import { Button, Box } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

interface PaginationComponentProps {
  page: number;
  setPage: (page: number) => void;
  totalItems: number;
  limit: number;
  isLoading: boolean;
}

const PaginationComponent: React.FC<PaginationComponentProps> = ({
  page,
  setPage,
  totalItems,
  limit,
  isLoading,
}) => {
  const totalPages = Math.ceil(totalItems / limit);

  // Tạo mảng số trang xung quanh trang hiện tại
  const generatePageNumbers = () => {
    const range = [];
    let start = Math.max(1, page - 2); // Bắt đầu từ 2 trang trước
    let end = Math.min(totalPages, page + 2); // Kết thúc ở 2 trang sau

    // Điều chỉnh lại để hiển thị "..." nếu có quá nhiều trang
    if (start > 2) {
      range.push(1); // Thêm trang đầu tiên
      range.push("..."); // Hiển thị dấu "..."
    }
    for (let i = start; i <= end; i++) {
      range.push(i);
    }
    if (end < totalPages - 1) {
      range.push("..."); // Hiển thị dấu "..."
      range.push(totalPages); // Thêm trang cuối cùng
    }
    return range;
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const handlePrevPage = () => {
    if (page > 1 && !isLoading) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages && !isLoading) {
      setPage(page + 1);
    }
  };

  return (
    <Box display="flex" justifyContent="center" marginTop={2}>
      {/* Nút "Previous" */}
      <Button
        variant="outlined"
        onClick={handlePrevPage}
        disabled={page <= 1 || isLoading}
        style={{ marginRight: 8 }}
      >
        <ArrowBackIosIcon />
      </Button>

      {/* Hiển thị các số trang */}
      {generatePageNumbers().map((pageNum, index) => {
        if (pageNum === "...") {
          return (
            <Button
              key={index}
              disabled
              variant="text"
              style={{ margin: "0 5px" }}
            >
              {pageNum}
            </Button>
          );
        }
        return (
          <Button
            key={index}
            variant={pageNum === page ? "contained" : undefined}
            onClick={() => handlePageChange(Number(pageNum))}
            disabled={isLoading}
            style={{ margin: "0 5px" }}
          >
            {pageNum}
          </Button>
        );
      })}

      {/* Nút "Next" */}
      <Button
        variant="outlined"
        onClick={handleNextPage}
        disabled={page >= totalPages || isLoading}
        style={{ marginLeft: 8 }}
      >
        <ArrowForwardIosIcon />
      </Button>
    </Box>
  );
};

export default PaginationComponent;
