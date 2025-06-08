import React, { useState } from 'react';
const USERS = { Admin: 'Admin123', Testownik: 'Testownik123' };
export default function Login({ onLogin }) {
  const [name, setName] = useState('');
  const [pass, setPass] = useState('');
  const [err, setErr] = useState(null);
  const submit = () => {
    if (USERS[name] === pass) onLogin(name);
    else setErr('Błędne dane');
  };
  return (
    <div style={{ maxWidth: '300px', margin: '1rem auto' }}>
      <h2>Logowanie</h2>
      <p><b>Dostępni użytkownicy:</b></p>
      <p>Admin Hasło: Admin123</p>
      <p>Testownik Hasło: Testownik123</p>
      <input placeholder="Nazwa" value={name} onChange={e => setName(e.target.value)} />
      <br/>
      <input placeholder="Hasło" type="password" value={pass} onChange={e => setPass(e.target.value)} />
      <br/>
      <button onClick={submit}>Zaloguj</button>
      {err && <p style={{ color: 'red' }}>{err}</p>}
    </div>
  );
}