import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();

  const handleChange = (e, func) => {
    func(e.target.value);
  };

  const onSubmit = async e => {
    //Handling the registration
    e.preventDefault();
    const response = await fetch('api/auth', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });
    const data = await response.json();
    if (data.success === true) {
      try {
        const res = await fetch('api/email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
          }),
        });
        const sent = await res.json();
        sent.success === true
          ? router.push('/verify')
          : alert('an error occured');
      } catch (error) {
        console.log(error);
      }
    } else {
      alert(data.message);
    }
  };

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          fontSize: '30px',
        }}
      >
        <form onSubmit={onSubmit}>
          <u>
            <h1>Register</h1>
          </u>
          <label htmlFor="name">Name: </label>
          <input
            type="text"
            value={name}
            onChange={e => handleChange(e, setName)}
            style={{
              marginBottom: '10px',
              height: '20px',
              fontSize: '20px',
              outline: 'none',
            }}
          />
          <br />
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            name="email"
            value={email}
            style={{
              marginBottom: '10px',
              height: '20px',
              fontSize: '20px',
              outline: 'none',
            }}
            id="email"
            required
            onChange={e => handleChange(e, setEmail)}
          />
          <br />
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            name="password"
            value={password}
            style={{
              marginBottom: '10px',
              height: '20px',
              fontSize: '20px',
              outline: 'none',
            }}
            id="password"
            minLength="6"
            required
            onChange={e => handleChange(e, setPassword)}
          />
          <br />
          <button type="submit" style={{ width: '100px', height: '30px' }}>
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
