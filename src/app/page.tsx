'use client'

import { InPostProvider } from "./context/InPostContext";
import BlogPosts from "./pages/blogPosts";


const Home: React.FC = () => {

  return (
    <InPostProvider>
      <BlogPosts />
    </InPostProvider>
  );
};

export default Home;
