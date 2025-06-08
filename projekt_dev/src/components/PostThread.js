import React, { useState } from 'react';
export default function PostThread({ post, user, onVoteReply, onReply }) {
  const [replyText, setReplyText] = useState('');
  const [activeReplyTo, setActiveReplyTo] = useState(null);
  const topReplies = post.replies.filter(r => r.parentId == null);
  const childReplies = id => post.replies.filter(r => r.parentId === id);
  const handleSubmit = parentId => {
    if (!replyText) return;
    onReply(post.id, parentId, replyText);
    setReplyText(''); setActiveReplyTo(null);
  };
  const renderReply = reply => (
    <div key={reply.id} style={{ marginLeft: reply.parentId ? '2rem' : '1rem', borderLeft: reply.parentId ? '2px dashed #bbb' : '2px solid #ddd', padding: '0.5rem', marginTop: '0.5rem' }}>
      <p><strong>{reply.user}:</strong> {reply.text}</p>
      <div>
        <button onClick={() => onVoteReply(post.id, reply.id, 'up')}>Lubię</button>
        <button onClick={() => onVoteReply(post.id, reply.id, 'down')}>Nie lubię</button>
        <span> Polubień: {reply.score || 0}</span>
        <button style={{ marginLeft: '1rem' }} onClick={() => setActiveReplyTo(reply.id)}>Odpowiedz</button>
      </div>
      {activeReplyTo === reply.id && (
        <div style={{ marginTop: '0.5rem' }}>
          <textarea placeholder="Twoja odpowiedź..." value={replyText} onChange={e => setReplyText(e.target.value)} />
          <br/>
          <button onClick={() => handleSubmit(reply.id)}>Wyślij</button>
        </div>
      )}
      {childReplies(reply.id).map(r => renderReply(r))}
    </div>
  );
  return (
    <div style={{ marginTop: '0.5rem' }}>
      <h4>Odpowiedzi ({post.replies.length})</h4>
      {topReplies.map(r => renderReply(r))}
      <div style={{ marginTop: '1rem' }}>
        <textarea placeholder="Twoja odpowiedź..." value={replyText} onChange={e => setReplyText(e.target.value)} />
        <br/>
        <button onClick={() => handleSubmit(null)}>Odpowiedz</button>
      </div>
    </div>
  );
}