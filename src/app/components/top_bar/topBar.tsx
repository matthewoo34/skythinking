import { InPostContext } from "@/app/context/InPostContext";
import { useContext } from "react";

interface TopBarProps {
}

export const TopBar = (props: TopBarProps) => {
    const { inPost, setInPost } = useContext(InPostContext);
    return (
        <div className='topBar'>
            {
                inPost &&
                <button onClick={() => setInPost(null)}>
                    {'<'}
                </button>
            }
            <div className='grow'> {inPost ? 'Post Details' : 'Blog Posts'}</div>
        </div>
    );
};

