interface PostPerPageSelectorProps {
    setPostPerPage: (value: number) => void;
    postPerPage: number;
}

export const PostPerPageSelector = (props: PostPerPageSelectorProps) => {
    const { postPerPage, setPostPerPage } = props;
    const options = [5, 10, 15, 20];

    const handlePostPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const pageNum = parseInt(event.target.value)
        setPostPerPage(pageNum);
    }

    return (
        <div >
            Posts per page:
            <select
                className='ml-2'
                onChange={handlePostPerPageChange}
                value={postPerPage}
                data-testid={'post-per-page-select'}
            >
                {options.map((value) => (
                    <option key={value + 'pageOption'} value={value}>
                        {value}
                    </option>
                ))}
            </select>
        </div>
    );
};

