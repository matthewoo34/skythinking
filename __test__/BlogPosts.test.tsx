import { render, screen } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import BlogPosts from '@/app/pages/blogPosts';
import '@testing-library/jest-dom';

const mock = new MockAdapter(axios);

describe('BlogPosts', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        mock.reset();
    });

    test('displays loader when isLoading is true', () => {
        window.alert = () => { };  // provide an empty implementation for window.alert

        render(<BlogPosts />);
        const loaderElement = screen.getByLabelText('tail-spin-loading');
        expect(loaderElement).toBeInTheDocument();
    });

    test('renders blog records when isLoading is false', async () => {
        window.alert = () => { };  // provide an empty implementation for window.alert
        const mockPosts = [
            { id: 1, title: 'Post 1', body: 'Lorem ipsum' },
            { id: 2, title: 'Post 2', body: 'Dolor sit amet' },
        ];
        mock.onGet('https://jsonplaceholder.typicode.com/posts').reply(200, mockPosts);

        render(<BlogPosts />);

        // Wait for the data to be loaded
        await screen.findByText('Post 1');

        const blogRecordElements = screen.getAllByTestId('blog-record');
        expect(blogRecordElements).toHaveLength(mockPosts.length);

        const paginationElement = screen.getByTestId('page-info');
        expect(paginationElement).toBeInTheDocument();
    });
});
