import { useCallback, useEffect, useState } from 'react';

interface PaginationResult {
    currentPage: number;
    totalPages: number;
    goToPage: (page: number) => void;
    goToNextPage: () => void;
    goToPreviousPage: () => void;
}

const usePagination = (pageSize: number, totalItems: number): PaginationResult => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const totalPages: number = Math.max(1, Math.ceil(totalItems / pageSize)); //in case it is a negative number

    const goToPage = (page: number): void => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const goToNextPage = (): void => {
        if (currentPage < totalPages) {
            setCurrentPage((prevPage) => prevPage + 1);
        }
    };

    const goToPreviousPage = (): void => {
        if (currentPage > 1) {
            setCurrentPage((prevPage) => prevPage - 1);
        }
    };

    const checkTotalPageRange = useCallback((): void => {//prevention of changing of postPerPage causing the totalPage less than the currentPage
        if (totalPages < currentPage) {
            goToPage(totalPages);
        }
    }, [totalPages, currentPage])

    useEffect(() => {
        checkTotalPageRange();
    }, [checkTotalPageRange])

    return {
        currentPage,
        totalPages,
        goToPage,
        goToNextPage,
        goToPreviousPage,
    };
};

export default usePagination;
