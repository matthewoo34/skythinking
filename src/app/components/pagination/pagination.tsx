import { useEffect, useState } from 'react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    goToPreviousPage: () => void;
    goToNextPage: () => void;
}


export const Pagination = (props: PaginationProps) => {
    const { currentPage, totalPages, goToNextPage, goToPreviousPage } = props;

    return (
        <div>
            Page: {currentPage} / {totalPages}
            <button
                className='p-4'
                onClick={goToPreviousPage}
                disabled={currentPage === 1}>
                {'<'}
            </button>
            <button
                className='p-4'
                onClick={goToNextPage}
                disabled={currentPage === totalPages}>
                {'>'}
            </button>
        </div>
    );
};

