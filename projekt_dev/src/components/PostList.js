import React, { useState } from 'react';
import PostThread from './PostThread';

export default function PostList({ posts, user, onVote, onVoteReply, onReply, onDelete }) {
  const [openPostId, setOpenPostId] = useState(null);

  return (
    <div>
      {posts.map(p => {
        const isOpen = openPostId === p.id;

        return (
          <div key={p.id} className="post">
            {/* Nagłówek z przyciskiem rozwijania */}
            <div className="post-header">
              <button
                className="toggle-btn"
                onClick={() => setOpenPostId(isOpen ? null : p.id)}
              >
                {isOpen ? '🔼' : '🔽'}
              </button>
              <h3>{p.title}</h3>
            </div>

            {/* Autor */}
            <p className="post-author">Autor: {p.user}</p>

            {/* Treść */}
            <p className="post-content">{p.text}</p>

            <hr/>

            {/* Polubienia i akcje */}
            <div className="post-footer">
              <span className={`post-score ${p.userVote === 'up' ? 'liked' : p.userVote === 'down' ? 'disliked' : ''}`}>
                Polubień: {p.score}
              </span>
              <div className="post-actions">
                <button
                  className={`btn-like ${p.userVote === 'up' ? 'active' : ''}`}
                  onClick={() => onVote(p.id, 'up')}
                >
                  Lubię
                </button>
                <button
                  className={`btn-dislike ${p.userVote === 'down' ? 'active' : ''}`}
                  onClick={() => onVote(p.id, 'down')}
                >
                  Nie lubię
                </button>
                <button
                  className="btn-delete"
                  onClick={() => onDelete(p.id)}
                >
                  Usuń
                </button>
              </div>
            </div>

            {/* Wątek komentarzy */}
            {isOpen && (
              <PostThread
                post={p}
                user={user}
                onVoteReply={onVoteReply}
                onReply={onReply}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
