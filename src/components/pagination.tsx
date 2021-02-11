import React, { MouseEventHandler } from 'react';

interface IPaginationProps {
  className: string;
  onPrevPageClick: MouseEventHandler;
  onNextPageClick: MouseEventHandler;
  currentPage: number;
  totalPages?: number | null;
}

export const Pagination: React.FC<IPaginationProps> = ({onPrevPageClick, onNextPageClick, currentPage, totalPages, className}) => (
  <div className={`grid grid-cols-3 text-center max-w-md mx-auto ${className}`}>
    {currentPage > 1 ? (
      <button onClick={onPrevPageClick} className="font-bold text-xl focus:outline-none">&larr;</button>
    ) : (
        <div></div>
      )
    }
    <span className="mx-5">
      Page {currentPage} of {totalPages}
    </span>
    {currentPage !== totalPages ? (
      <button onClick={onNextPageClick} className="font-bold text-xl focus:outline-none">&rarr;</button>
    ) : <div></div>
    }
  </div>
);