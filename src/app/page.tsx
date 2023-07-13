'use client'

import { Post } from '@/model/Post';
import axios from 'axios';
import Image from 'next/image'
import { useEffect, useState } from 'react';
import { BlogRecord } from './components/blog_record/blogRecord';

const BlogPosts: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

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

  return (
    <div>
      <div>Blog Posts</div>
      <table>
        <tr>
          <th></th>
          <th>Title</th>
          <th>Body</th>
        </tr>
        {
          posts.map((post) => (
            <BlogRecord
              post={post} />
          ))
        }
      </table>

    </div>
  );
};

export default BlogPosts;
