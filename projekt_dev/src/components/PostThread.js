import React, { useState } from 'react';
import '../App.css';

export default function PostThread({ post, user, onVoteReply, onReply }) {
  const [replyText, setReplyText]         = useState('');
  const [activeReplyTo, setActiveReplyTo] = useState(null);

  // Tu trzymamy stan open/closed dla każdego r.id
  const [openMap, setOpenMap] = useState({});

  const toggleOpen = id => {
    setOpenMap(m => ({
      ...m,
      [id]: m[id] === undefined ? false : !m[id]
    }));
  };

  // Pomocnik do top-level i dzieci
  const topReplies   = post.replies.filter(r => r.parentId == null);
  const childReplies = id => post.replies.filter(r => r.parentId === id);

  // Komponent pojedynczej odpowiedzi (rekurencyjnie)
  const ReplyItem = ({ r, depth = 0 }) => {
    const children = childReplies(r.id);
    // domyślnie open = true, jeśli undefined w mapie
    const open = openMap[r.id] ?? true;

    // wybór klasy score
    let cls = 'reply-score ';
    if (r.score > 0)      cls += 'positive';
    else if (r.score < 0) cls += 'negative';
    else                   cls += 'neutral';

    return (
      <div className="reply" style={{ marginLeft: depth * 20 }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {children.length > 0 && (
            <button
              className="toggle-btn"
              onClick={() => toggleOpen(r.id)}
              aria-label={open ? 'Zwiń wątek' : 'Rozwiń wątek'}
            >
              {open ? '⤴️' : '⤵️'}
            </button>
          )}
          <strong>{r.user}:</strong>&nbsp;{r.text}
        </div>

        {open && (
          <div style={{ margin: '0.25rem 0 0.75rem 1.5rem' }}>
            <button className="btn-like" onClick={() => onVoteReply(post.id, r.id, 'up')}>
              Lubię
            </button>
            <button className="btn-dislike" onClick={() => onVoteReply(post.id, r.id, 'down')}>
              Nie lubię
            </button>
            <span className={cls} style={{ margin: '0 1rem' }}>
              {r.score}
            </span>
            <button className="btn" onClick={() => setActiveReplyTo(r.id)}>
              Odpowiedz
            </button>

            {activeReplyTo === r.id && (
              <div style={{ marginTop: '.5rem' }}>
                <textarea
                  placeholder="Twoja odpowiedź..."
                  value={replyText}
                  onChange={e => setReplyText(e.target.value)}
                  style={{ width: '100%', minHeight: '3rem' }}
                />
                <button
                  className="btn"
                  onClick={() => {
                    if (!replyText) return;
                    onReply(post.id, r.id, replyText);
                    setReplyText('');
                    setActiveReplyTo(null);
                  }}
                >
                  Wyślij
                </button>
              </div>
            )}

            {children.map(cr => (
              <ReplyItem key={cr.id} r={cr} depth={depth + 1} />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="post-thread">
      <h4>Odpowiedzi ({post.replies.length})</h4>

      {topReplies.map(r => (
        <ReplyItem key={r.id} r={r} />
      ))}

      {/* dolny formularz tylko gdy nie odpowiadamy w wątku */}
      {activeReplyTo === null && (
        <div className="reply" style={{ marginTop: '1rem' }}>
          <textarea
            placeholder="Twoja odpowiedź..."
            value={replyText}
            onChange={e => setReplyText(e.target.value)}
            style={{ width: '100%', minHeight: '3rem' }}
          />
          <button
            className="btn"
            onClick={() => {
              if (!replyText) return;
              onReply(post.id, null, replyText);
              setReplyText('');
            }}
          >
            Odpowiedz
          </button>
        </div>
      )}
    </div>
  );
}
