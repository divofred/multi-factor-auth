import { useRouter } from 'next/router';
import { useState } from 'react';
export default function Verify() {
  const [text, setText] = useState('');

  const router = useRouter();

  const handleChange = (e, func) => {
    func(e.target.value);
  };

  const onSubmit = async e => {
    //Handling Verification
    e.preventDefault();
    const response = await fetch('api/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        OTP: text,
      }),
    });
    const data = await response.json();
    data.success === true ? router.push('/protected') : alert('Invalid OTP');
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
            <h1>Verify</h1>
          </u>
          <label htmlFor="email">OTP: </label>
          <input
            type="text"
            name="text"
            value={text}
            style={{
              marginBottom: '10px',
              height: '20px',
              fontSize: '20px',
              outline: 'none',
            }}
            id="text"
            required
            onChange={e => handleChange(e, setText)}
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
