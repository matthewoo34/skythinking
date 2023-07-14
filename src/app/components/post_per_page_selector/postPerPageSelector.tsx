import { useEffect } from "react";

interface PostPerPageSelectorProps {
    setPostPerPage: (value: number) => void;
}


export const PostPerPageSelector = (props: PostPerPageSelectorProps) => {
    const { setPostPerPage } = props;

    const handlePostPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const pageNum = parseInt(event.target.value)
        setPostPerPage(pageNum);
    }

    return (
        <div >
            Posts per page:
            <select
                className='ml-2'
                onChange={handlePostPerPageChange}>
                <option>
                    5
                </option>
                <option>
                    10
                </option>
                <option>
                    15
                </option>
                <option>
                    20
                </option>
            </select>
        </div>
    );
};

