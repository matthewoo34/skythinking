import { renderHook, act } from '@testing-library/react';
import usePagination from '@/app/hooks/usePagination';

test('should initialize with correct initial values', () => {
    const pageSize = 5;
    const totalItems = 20;
    const { result } = renderHook(() => usePagination(pageSize, totalItems));

    expect(result.current.currentPage).toBe(1);
    expect(result.current.totalPages).toBe(4);
});

test('should update currentPage when goToPage is called with a valid page number', () => {
    const pageSize = 5;
    const totalItems = 20;
    const { result } = renderHook(() => usePagination(pageSize, totalItems));

    act(() => {
        result.current.goToPage(3);
    });

    expect(result.current.currentPage).toBe(3);
});

test('should not update currentPage when goToPage is called with an invalid page number', () => {
    const pageSize = 5;
    const totalItems = 20;
    const { result } = renderHook(() => usePagination(pageSize, totalItems));

    act(() => {
        result.current.goToPage(0);
    });

    expect(result.current.currentPage).toBe(1);

    act(() => {
        result.current.goToPage(10);
    });

    expect(result.current.currentPage).toBe(1);
});

test('should update currentPage when goToNextPage is called', () => {
    const pageSize = 5;
    const totalItems = 20;
    const { result } = renderHook(() => usePagination(pageSize, totalItems));

    act(() => {
        result.current.goToNextPage();
    });

    expect(result.current.currentPage).toBe(2);
});

test('should not update currentPage when goToNextPage is called and currentPage is already the last page', () => {
    const pageSize = 5;
    const totalItems = 20;
    const { result } = renderHook(() => usePagination(pageSize, totalItems));

    act(() => {
        result.current.goToPage(4); // Set currentPage to the last page
    });

    act(() => {
        result.current.goToNextPage();
    });

    expect(result.current.currentPage).toBe(4);
});

test('should update currentPage when goToPreviousPage is called', () => {
    const pageSize = 5;
    const totalItems = 20;
    const { result } = renderHook(() => usePagination(pageSize, totalItems));

    act(() => {
        result.current.goToPage(3); // Set currentPage to 3
    });

    act(() => {
        result.current.goToPreviousPage();
    });

    expect(result.current.currentPage).toBe(2);
});

test('should not update currentPage when goToPreviousPage is called and currentPage is already the first page', () => {
    const pageSize = 5;
    const totalItems = 20;
    const { result } = renderHook(() => usePagination(pageSize, totalItems));

    act(() => {
        result.current.goToPreviousPage();
    });

    expect(result.current.currentPage).toBe(1);
});
