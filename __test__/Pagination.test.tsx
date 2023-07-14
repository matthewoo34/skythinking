import { render, fireEvent } from '@testing-library/react';
import { Pagination } from '@/app/components/pagination/pagination';
import '@testing-library/jest-dom';

describe('Pagination', () => {
    test('renders the correct page information', () => {
        const { getByTestId } = render(
            <Pagination
                currentPage={3}
                totalPages={5}
                goToPreviousPage={() => { }}
                goToNextPage={() => { }}
            />
        );
        expect(getByTestId('page-info')).toHaveTextContent('Page: 3 / 5');
    });

    test('calls goToPreviousPage when the previous button is clicked', () => {
        const goToPreviousPageMock = jest.fn();
        const { getByTestId, getByText } = render(
            <Pagination
                currentPage={3}
                totalPages={5}
                goToPreviousPage={goToPreviousPageMock}
                goToNextPage={() => { }}
            />
        );

        fireEvent.click(getByTestId('page-prev-btn'));
        expect(goToPreviousPageMock).toHaveBeenCalledTimes(1);
    });

    test('calls goToNextPage when the next button is clicked', () => {
        const goToNextPageMock = jest.fn();
        const { getByTestId } = render(
            <Pagination
                currentPage={3}
                totalPages={5}
                goToPreviousPage={() => { }}
                goToNextPage={goToNextPageMock}
            />
        );

        fireEvent.click(getByTestId('page-next-btn'));
        expect(goToNextPageMock).toHaveBeenCalledTimes(1);
    });
});
