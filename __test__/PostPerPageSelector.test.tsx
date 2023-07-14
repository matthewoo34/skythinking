import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { PostPerPageSelector } from '@/app/components/post_per_page_selector/postPerPageSelector';

describe('PostPerPageSelector', () => {
    test('renders the correct number of options', () => {
        const setPostPerPageMock = jest.fn();
        const { container } = render(
            <PostPerPageSelector setPostPerPage={setPostPerPageMock} postPerPage={10} />
        );
        const options = container.querySelectorAll('option');
        expect(options.length).toBe(4);
    });

    test('calls setPostPerPage when an option is selected', () => {
        const setPostPerPageMock = jest.fn();
        const { getByTestId } = render(
            <PostPerPageSelector setPostPerPage={setPostPerPageMock} postPerPage={10} />
        );
        const selectElement = getByTestId('post-per-page-select');
        fireEvent.change(selectElement, { target: { value: '15' } });
        expect(setPostPerPageMock).toHaveBeenCalledTimes(1);
        expect(setPostPerPageMock).toHaveBeenCalledWith(15);
    });

    test('displays the current postPerPage value as selected', () => {
        const setPostPerPageMock = jest.fn();
        const { getByTestId } = render(
            <PostPerPageSelector setPostPerPage={setPostPerPageMock} postPerPage={10} />
        );
        const selectElement = getByTestId('post-per-page-select') as HTMLSelectElement;
        expect(selectElement.value).toBe('10');
    });
});
