import React, { useState } from 'react';
import '../App.css';

const USERS = { Admin: 'Admin123', Testownik: 'Testownik123' };

export default function Login({ onLogin }) {
  const [name, setName] = useState('');
  const [pass, setPass] = useState('');
  const [err, setErr]   = useState(null);

  const submit = () => {
    if (USERS[name] === pass) onLogin(name);
    else setErr('Błędne dane');
  };

  return (
    <div className="container login-panel">
      <h2>Logowanie</h2>
      <p><b>Dostępni użytkownicy:</b></p>
      <p>Użytkownik: <b>Admin</b> Hasło: <b>Admin123</b></p>
      <p>Użytkownik: <b>Testownik</b> Hasło: <b>Testownik123</b></p>
      <input
        type="text"
        placeholder="Nazwa"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <input
        type="password"
        placeholder="Hasło"
        value={pass}
        onChange={e => setPass(e.target.value)}
      />
      <button className="btn" onClick={submit}>Zaloguj</button>
      {err && <p style={{ color: 'tomato' }}>{err}</p>}
    </div>
  );
}
