interface PaginationProps {
    currentPage: number;
    totalPages: number;
    goToPreviousPage: () => void;
    goToNextPage: () => void;
}


export const Pagination = (props: PaginationProps) => {
    const { currentPage, totalPages, goToNextPage, goToPreviousPage } = props;
    const isFirstPage = currentPage === 1;
    const isLastPage = currentPage === totalPages;

    return (
        <div>
            Page: {currentPage} / {totalPages}
            <button
                className={`${isFirstPage && 'opacity-20'} p-4`}
                onClick={goToPreviousPage}
                disabled={isFirstPage}>
                {'<'}
            </button>
            <button
                className={`${isLastPage && 'opacity-20'} p-4`}
                onClick={goToNextPage}
                disabled={isLastPage}>
                {'>'}
            </button>
        </div>
    );
};

