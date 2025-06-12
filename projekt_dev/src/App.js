import React, { useState, useEffect } from 'react';
import './App.css';
import Login       from './components/Login.js';
import NewPostForm from './components/NewPostForm.js';
import PostList    from './components/PostList.js';

const STORAGE_KEY = 'redditBlogData';

export default function App() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState(() => {
    try { const saved = localStorage.getItem(STORAGE_KEY); return saved ? JSON.parse(saved) : []; }
    catch { return []; }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  }, [posts]);

  const addPost = ({ title, text }) => {
    const newPost = {
      id: Date.now(),
      user,
      title,
      text,
      score: 0,
      upvotes: [],
      downvotes: [],
      replies: []
    };
    setPosts(prev => [newPost, ...prev]);
  };

  const deletePost = postId => {
    setPosts(prev => prev.filter(p => p.id !== postId));
  };

  const votePost = (postId, type) => {
    setPosts(prev => prev.map(p => {
      if (p.id !== postId) return p;
      const up   = (p.upvotes || []).filter(u => u !== user);
      const down = (p.downvotes || []).filter(u => u !== user);
      if (type === 'up')   up.push(user);
      if (type === 'down') down.push(user);
      return { ...p, upvotes: up, downvotes: down, score: up.length - down.length };
    }));
  };

  const voteReply = (postId, replyId, type) => {
    setPosts(prev => prev.map(p => {
      if (p.id !== postId) return p;
      const replies = p.replies.map(r => {
        if (r.id !== replyId) return r;
        const up   = (r.upvotes || []).filter(u => u !== user);
        const down = (r.downvotes || []).filter(u => u !== user);
        if (type === 'up')   up.push(user);
        if (type === 'down') down.push(user);
        return { ...r, upvotes: up, downvotes: down, score: up.length - down.length };
      });
      return { ...p, replies };
    }));
  };

  const addReply = (postId, parentId, text) => {
    setPosts(prev => prev.map(p => {
      if (p.id !== postId) return p;
      const reply = {
        id: Date.now(),
        user,
        text,
        parentId,
        upvotes: [],
        downvotes: [],
        score: 0
      };
      return { ...p, replies: [...p.replies, reply] };
    }));
  };

  const logout = () => setUser(null);

  if (!user) return <Login onLogin={setUser} />;

  return (
    <div className="container">
      <header>
        <h1>Witaj, {user}</h1>
        <button className="btn" onClick={logout}>Wyloguj</button>
      </header>

      <NewPostForm onPost={addPost} />

      <PostList
        posts={posts}
        user={user}
        onVote={votePost}
        onVoteReply={voteReply}
        onReply={addReply}
        onDelete={deletePost}
      />
    </div>
  );
}
