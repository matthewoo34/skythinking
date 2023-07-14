import { Post } from '@/model/Post';
import { useEffect, useState } from 'react';

interface BlogRecordProps {
    post: Post;
    inPost: number | null;
    setInPost: (postId: number | null) => void;
}


export const BlogRecord = (props: BlogRecordProps) => {
    const { post, inPost, setInPost } = props;
    return (
        <tr >
            <td
                className={`${!inPost && 'cursor-pointer hover:bg-green-500'} record w-1/5 text-center`}
                onClick={() => setInPost(post.id)}>
                {post.id}
            </td>
            <td className='record w-1/5'>{post.title}</td>
            <td className='record w-3/5'>{post.body}</td>
        </tr>

    );
};

