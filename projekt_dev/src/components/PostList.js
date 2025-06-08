import React, { useState } from 'react';
import PostThread from './PostThread.js';
export default function PostList({ posts, user, onVote, onVoteReply, onReply, onDelete }) {
  const [openPostId, setOpenPostId] = useState(null);
  return (
    <div>
      {posts.map(p => (
        <div key={p.id} style={{ border: '1px solid #ccc', padding: '0.5rem', margin: '0.5rem 0' }}>
          <h3 style={{ cursor: 'pointer' }} onClick={() => setOpenPostId(openPostId === p.id ? null : p.id)}>
            {p.title} (Polubień: {p.score})
          </h3>
          <p>{p.text}</p>
          <button onClick={() => onVote(p.id, 'up')}>Lubię</button>
          <button onClick={() => onVote(p.id, 'down')}>Nie lubię</button>
          <button onClick={() => onDelete(p.id)} style={{ marginLeft: '1rem' }}>Usuń</button>
          {openPostId === p.id && (
            <PostThread post={p} user={user} onVoteReply={onVoteReply} onReply={onReply} />
          )}
        </div>
      ))}
    </div>
  );
}