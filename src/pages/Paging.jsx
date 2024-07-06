import React, { useState } from "react";
import Pagination from "react-js-pagination";
import './index.css';

const Paging = ({onPageChange}) => {
  const [page, setPage] = useState(1);
  const [currentPage,setCurrentPage] = useState(1);
  const [lastPage,setLastPage] = useState(45);

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
    onPageChange(pageNumber);
    setCurrentPage(pageNumber);
    setLastPage(pageNumber);
  };

  return (
    <Pagination
      activePage={page} // 현재 페이지
      itemsCountPerPage={10} // 한 페이지랑 보여줄 아이템 갯수
      totalItemsCount={450} // 총 아이템 갯수
      pageRangeDisplayed={5} // paginator의 페이지 범위
      prevPageText={currentPage === 1 ? null: "‹"} // "이전"을 나타낼 텍스트
      nextPageText={lastPage===45 ? null:"›" } // "다음"을 나타낼 텍스트
      onChange={handlePageChange} // 페이지 변경을 핸들링하는 함수
    />
  );
};

export default Paging;