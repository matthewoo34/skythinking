import { InPostContext } from '@/app/context/InPostContext';
import { Post } from '@/model/Post';
import { useContext } from 'react';

interface BlogRecordProps {
    post: Post;
}

export const BlogRecord = (props: BlogRecordProps) => {
    const { post } = props;
    const { inPost, setInPost } = useContext(InPostContext);

    return (
        <tr data-testid={`blog-record`}>
            <td
                className={`${!inPost && 'cursor-pointer hover:bg-green-500'} record w-1/5 text-center`}
                onClick={() => { if (!inPost) setInPost(post?.id); }}>
                {post?.id}
            </td>
            <td className='record w-1/5'>
                <div
                    className={`${!inPost && 'record-content'}`}>
                    {post?.title}
                </div>
            </td>
            <td className='record w-3/5'>
                <div
                    className={`${!inPost && 'record-content'}`}>
                    {post?.body}
                </div>
            </td>
        </tr >

    );
};

