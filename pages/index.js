import { useEffect } from "react";
import { fetch } from "../lib/fetch";

export default function Home() {
  useEffect(() => {
    const Login = async () => {
      const data = await fetch('login', {
        method: 'POST',
        data: {
          email: 'younes@gmail.com',
          password: '1234'
        }
      });
      console.log(data);
    };
    Login();
  }, []);
  return (
    <div>

    </div>
  )
}
