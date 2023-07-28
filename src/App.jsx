import { faker } from "@faker-js/faker";
import { useState } from "react";
import "./styles.css";

function createRandomPosts() {
  return {
    title: `${faker.hacker.adjective()} ${faker.hacker.noun()}`,
    body: faker.hacker.phrase(),
  };
}

function App() {
  const [posts, setPosts] = useState(
    Array.from({ length: 30 }, () => createRandomPosts())
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [isFakeDark, setIsFakeDark] = useState(false);

  const searchedPosts = () => {};

  function handleClearPosts() {
    setPosts([]);
  }

  return (
    <section>
      <Header
        posts={searchedPosts}
        onClearPosts={handleClearPosts}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
    </section>
  );
}

export default App;

function Header({ posts, onClearPosts, searchQuery, setSearchQuery }) {
  return (
    <header>
      <h1>
        <span>⚛️</span>The Atomic Blog
      </h1>
      <Results posts={posts} />
      <SearchPosts searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <button onClick={onClearPosts}>Clear posts</button>
    </header>
  );
}

function Results({ posts }) {
  return <p>🚀 {posts.length} atomic posts found</p>;
}

function SearchPosts({ searchQuery, setSearchQuery }) {
  return (
    <input
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      placeholder="Search posts..."
    />
  );
}
