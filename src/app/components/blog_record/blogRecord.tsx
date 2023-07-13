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
                className={`${!inPost && 'cursor-pointer hover:bg-green-500'} bg-white border-4 border-yellow-400 w-1/5 text-center p-4`}
                onClick={() => setInPost(post.id)}>
                {post.id}
            </td>
            <td className='bg-white custom-border w-1/5  p-4'>{post.title}</td>
            <td className='bg-white custom-border w-3/5  p-4 '>{post.body}</td>
        </tr>

    );
};

