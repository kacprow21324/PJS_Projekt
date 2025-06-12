import React, { useState } from 'react';
import '../App.css';

export default function NewPostForm({ onPost }) {
  const [title, setTitle] = useState('');
  const [text, setText]   = useState('');

  const submit = () => {
    if (!title || !text) return;
    onPost({ title, text });
    setTitle('');
    setText('');
  };

  return (
    <div className="post new-post">
      <h2>Tworzenie nowego postu</h2>
      <p>Tu wpisz tytuł, a poniżej treść posta</p>
      <input
        type="text"
        placeholder="Tytuł"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Treść"
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <button className="btn" onClick={submit}>Dodaj post</button>
    </div>
  );
}
