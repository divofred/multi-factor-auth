import { useRouter } from 'next/router';

export default function App() {
  const router = useRouter();

  const onLogout = async () => {
    const response = await fetch('api/auth');
    const data = await response.json();
    if (data.success === true) return router.push('/login');
    alert(data.message);
  };
  return (
    <>
      <h2>This is a Protected route. Unauthorized users can't see this</h2>
      <button onClick={onLogout}>Logout</button>
    </>
  );
}
