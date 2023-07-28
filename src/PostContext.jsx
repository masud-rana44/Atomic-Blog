import { createContext, useContext, useState } from "react";
import { createRandomPost } from "./utils";

const PostContext = createContext();

function usePosts() {
  const context = useContext(PostContext);
  if (context === undefined)
    throw new Error("PostContext is used outside of the PostProvider");
  return context;
}

function PostProvider({ children }) {
  const [posts, setPosts] = useState(
    Array.from({ length: 30 }, () => createRandomPost())
  );
  const [searchQuery, setSearchQuery] = useState("");

  const searchedPosts =
    searchQuery.length > 0
      ? posts.filter((post) =>
          `${post.title} ${post.body}`
            .toLowerCase()
            .includes(searchQuery.toLocaleLowerCase())
        )
      : posts;

  function handleAddPost(post) {
    setPosts((posts) => [post, ...posts]);
  }

  function handleClearPosts() {
    setPosts([]);
  }

  return (
    <PostContext.Provider
      value={{
        posts: searchedPosts,
        onClearPosts: handleClearPosts,
        onAddPost: handleAddPost,
        searchQuery,
        setSearchQuery,
      }}
    >
      {children}
    </PostContext.Provider>
  );
}

export { PostProvider, usePosts };
