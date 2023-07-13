'use client'

import { Post } from '@/model/Post';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { BlogRecord } from './components/blog_record/blogRecord';
import { Pagination } from './components/pagination/pagination';
import usePagination from './hooks/usePagination';

const BlogPosts: React.FC = () => {
  const postPerPage = 5;

  const [posts, setPosts] = useState<Post[]>([]);
  const [displayPost, setDisplayPost] = useState<Post[]>([]);
  const [inPost, setInPost] = useState<number | null>(null);;
  const { currentPage, totalPages, goToPage, goToNextPage, goToPreviousPage } = usePagination(postPerPage, posts.length);


  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get<Post[]>('https://jsonplaceholder.typicode.com/posts');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    handleDisplayPost();
  }, [posts, inPost, currentPage])

  const handleDisplayPost = () => {
    if (inPost) {
      const selectedPost = posts.find((post) => post.id === inPost);
      setDisplayPost(selectedPost ? [selectedPost] : []);
    } else {
      setDisplayPost(displayCurrentPagePost(currentPage));
    }
  }

  const displayCurrentPagePost = (currentPage: number) => {
    const result = posts.filter(post =>
      post.id > (currentPage - 1) * postPerPage  //the first 
      &&
      post.id <= currentPage * postPerPage);
    return result;
  }

  return (
    <main className="flex">
      <div className='bg-yellow-400 p-4'>
        <div className='text-white text-center font-serif text-2xl font-semibold p-3 flex'>
          {
            inPost &&
            <button onClick={() => setInPost(null)}>
              {'<'}
            </button>
          }
          <div className='grow'> {inPost ? 'Post Details' : 'Blog Posts'}</div>
        </div>
        <table className="table-fixed border border-collapse">
          <thead>
            <tr>
              <th className="bg-green-500 border-4 border-yellow-400  p-4"></th>
              <th className="bg-green-500 border-4 border-yellow-400  p-4">Title</th>
              <th className="bg-green-500 border-4 border-yellow-400  p-4">Body</th>
            </tr>
          </thead>
          {
            displayPost.map((post) => (
              <BlogRecord
                key={post.id}
                post={post}
                inPost={inPost}
                setInPost={setInPost} />
            ))
          }
        </table>

        {
          !inPost &&
          <Pagination
            goToPreviousPage={goToPreviousPage}
            currentPage={currentPage}
            goToNextPage={goToNextPage}
            totalPages={totalPages}
          />
        }

      </div>
    </main>
  );
};

export default BlogPosts;
