"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevents the default form submission behavior
    const data = {
      username: username,
      password: password,
    };
    try {
      const response = await axios.post("http://localhost:8000/login", data);
      console.log("POST request successful");
      console.log(response.data);
      if (response.data.token) {
        localStorage.setItem("customerId", response.data.customerId);
        router.push("/");
      } // Display response data
    } catch (error) {
      console.error("There was a problem with the POST request:", error);
    }
  };

  return (
    <div className="w-full flex justify-center h-[100vh]">
      <form
        className="w-[300px] h-[400px] flex flex-col self-center gap-4"
        onSubmit={handleSubmit} // Attach onSubmit to the form
      >
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            className="block w-full border rounded-md p-1"
            onChange={(event) => setUsername(event.target.value)}
            value={username}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password" // Change type to "password" for password fields
            id="password"
            name="password"
            className="block w-full border rounded-md p-1"
            onChange={(event) => setPassword(event.target.value)}
            value={password}
          />
        </div>
        <button
          type="submit"
          className="bg-black text-white px-1 py-1.5 text-[16px]"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
