import React from 'react';
import './style.css';

const Pagination = ({ currentPage, pages, onPageChange }) => {
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
