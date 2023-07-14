import { render, fireEvent } from '@testing-library/react';
import { InPostContext } from '@/app/context/InPostContext';
import { BlogRecord } from '@/app/components/blog_record/blogRecord';
import '@testing-library/jest-dom';


describe('BlogRecord', () => {
    const post = {
        id: 1,
        userId: 1,
        title: 'Example Post',
        body: 'This is the body of the post.',
    };
    it('should render the correct post details', () => {


        const setInPost = jest.fn();

        const { getByText } = render(
            <InPostContext.Provider value={{ inPost: null, setInPost }}>
                <table>
                    <tbody>
                        <BlogRecord post={post} />
                    </tbody>
                </table>
            </InPostContext.Provider>
        );

        const idElement = getByText('1');
        const titleElement = getByText('Example Post');
        const bodyElement = getByText('This is the body of the post.');

        expect(idElement).toBeInTheDocument();
        expect(titleElement).toBeInTheDocument();
        expect(bodyElement).toBeInTheDocument();

        fireEvent.click(idElement);

        expect(setInPost).toHaveBeenCalledWith(1);
    });

    it('should not call setInPost when inPost is already set', () => {
        const setInPost = jest.fn();

        const { getByText } = render(
            <InPostContext.Provider value={{ inPost: 1, setInPost }}>
                <table>
                    <tbody>
                        <BlogRecord post={post} />
                    </tbody>
                </table>
            </InPostContext.Provider>
        );

        const idElement = getByText('1');

        fireEvent.click(idElement);

        expect(setInPost).not.toHaveBeenCalled();
    });
});
