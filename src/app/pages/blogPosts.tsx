'use client'

import { Post } from '@/model/Post';
import axios from 'axios';
import { useCallback, useContext, useEffect, useState } from 'react';
import { BlogRecord } from '@/app/components/blog_record/blogRecord';
import { Pagination } from '@/app/components/pagination/pagination';
import usePagination from '@/app/hooks/usePagination';
import { PostPerPageSelector } from '@/app/components/post_per_page_selector/postPerPageSelector';
import { TopBar } from '@/app/components/top_bar/topBar';
import { TailSpin } from 'react-loader-spinner';
import { InPostContext, InPostProvider } from '@/app/context/InPostContext';

const BlogPosts: React.FC = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [postPerPage, setPostPerPage] = useState<number>(5);
    const [posts, setPosts] = useState<Post[]>([]);
    const [displayPost, setDisplayPost] = useState<Post[]>([]);
    const { inPost, setInPost } = useContext(InPostContext);
    const { currentPage, totalPages, goToNextPage, goToPreviousPage } = usePagination(postPerPage, posts.length);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get<Post[]>('https://jsonplaceholder.typicode.com/posts');
                setPosts(response.data);
                setIsLoading(false);
            } catch (error) {
                if (confirm('Unable to load the Posts, please try again')) {
                    fetchPosts();
                }
                console.error('Error fetching posts:', error);
            }
        };

        fetchPosts();
    }, []);

    const displayCurrentPagePost = (currentPage: number) => {
        const result = posts.filter(post =>
            post.id > (currentPage - 1) * postPerPage  //the first page should be the prev page number*postPerPage
            &&
            post.id <= currentPage * postPerPage); //the last page should be the current page number*postPerPage
        return result;
    }

    const handleDisplayPost = useCallback(() => {
        if (inPost !== null) {
            const selectedPost = posts.find((post) => post.id === inPost);
            setDisplayPost(selectedPost ? [selectedPost] : []);
        } else {
            setDisplayPost(displayCurrentPagePost(currentPage));
        }
    }, [inPost, currentPage, posts]);

    useEffect(() => {
        handleDisplayPost();
    }, [handleDisplayPost])

    return (
        <main className="pb-12">
            <div className='bg-yellow-400 p-4'>
                <TopBar />
                {
                    isLoading ?
                        <TailSpin
                            height="80"
                            width="80"
                            color="#4fa94d"
                            ariaLabel="tail-spin-loading"
                            radius="1"
                            wrapperClass="w-full justify-center h-64 items-center"
                            visible={true}
                        />
                        :
                        <>
                            <table className="table-fixed border border-collapse">
                                <thead>
                                    <tr>
                                        <th className="table-title"></th>
                                        <th className="table-title">Title</th>
                                        <th className="table-title">Body</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        displayPost.map((post) => (
                                            <BlogRecord
                                                key={post.id}
                                                post={post} />
                                        ))
                                    }
                                </tbody>
                            </table>
                            {
                                !inPost &&
                                <div className='paginationContainer'>
                                    <Pagination
                                        goToPreviousPage={goToPreviousPage}
                                        currentPage={currentPage}
                                        goToNextPage={goToNextPage}
                                        totalPages={totalPages}
                                    />
                                    <PostPerPageSelector
                                        setPostPerPage={setPostPerPage} />
                                </div>
                            }
                        </>
                }

            </div>
        </main>
    );
};

export default BlogPosts;
