import React, { useState } from 'react';
export default function NewPostForm({ onPost }) {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const submit = () => {
    if (!title || !text) return;
    onPost({ title, text });
    setTitle(''); setText('');
  };
  return (
    <div style={{ margin: '1rem 0' }}>
      <input placeholder="Tytuł" value={title} onChange={e => setTitle(e.target.value)} />
      <br/>
      <textarea placeholder="Treść" value={text} onChange={e => setText(e.target.value)} />
      <br/>
      <button onClick={submit}>Dodaj post</button>
    </div>
  );
}