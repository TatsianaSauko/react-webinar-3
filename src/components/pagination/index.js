import React, { useEffect, useState } from 'react';
import { generatePages } from '../../utils';
import './style.css';

const Pagination = ({ onPageChange, currentPage, totalPages }) => {
  const [pages, setPages] = useState([]);

  useEffect(() => {
    const pages = generatePages(currentPage, totalPages);
    setPages(pages);
  }, [currentPage, totalPages]);

  return (
    <div className="pagination">
      {pages.map((page, index) => (
        <button
          key={index}
          onClick={() => typeof page === 'number' && onPageChange(page)}
          className={`btn ${page === '...' ? 'btn-dots' : page === currentPage ? 'btn_active' : 'btn_pagination'}`}
          disabled={typeof page !== 'number'}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
