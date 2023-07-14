interface PostPerPageSelectorProps {
    setPostPerPage: (value: number) => void;
}

export const PostPerPageSelector = (props: PostPerPageSelectorProps) => {
    const { setPostPerPage } = props;
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
                onChange={handlePostPerPageChange}>
                {options.map((value) => (
                    <option key={value + 'pageOption'} value={value}>
                        {value}
                    </option>
                ))}
            </select>
        </div>
    );
};

