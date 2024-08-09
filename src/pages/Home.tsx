import { useEffect, useState } from "react";
import * as UserService from "../services/userService";

interface UserData {
  username: string;
}

export default function Home() {
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem("userData");

    if (!userData) return;

    setUserData(JSON.parse(userData));

    UserService.getUser().then((response) => {
      console.log(response);
    });
  }, []);

  return (
    <div>
      <h1>Welcome, {userData?.username}</h1>
    </div>
  );
}
