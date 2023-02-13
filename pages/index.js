import { useRouter } from 'next/router';
export default function App() {
  const router = useRouter();
  const onClick = e => {
    if (e === 'login') {
      return router.push('/login');
    }
    return router.push('/signup');
  };
  return (
    <>
      <button onClick={() => onClick('login')}>Login</button>
      <button onClick={() => onClick()}>Signup</button>
    </>
  );
}
