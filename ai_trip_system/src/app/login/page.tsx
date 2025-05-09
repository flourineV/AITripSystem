"use client";
import React, { useState } from "react";
import useSWRMutation from "swr/mutation";

async function loginUser(url: string, { arg }: { arg: { username: string; password: string } }) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(arg),
  });
  if (!res.ok) throw new Error("Login failed");
  return res.json();
}

export default function LoginPage() {
  const [form, setForm] = useState({ username: "", password: "" });
  const { trigger, isMutating, error, data } = useSWRMutation(
    "https://aitripsystem-api.onrender.com/api/v1/login",
    loginUser
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await trigger(form);
  };

  return (
    <div className="max-w-sm mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          name="username"
          value={form.username}
          onChange={handleChange}
          placeholder="Username"
          className="border p-2 rounded"
        />
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          className="border p-2 rounded"
        />
        <button type="submit" disabled={isMutating} className="bg-blue-500 text-white p-2 rounded">
          {isMutating ? "Logging in..." : "Login"}
        </button>
        {error && <div className="text-red-500">Login failed</div>}
        {data && <div className="text-green-500">Login success! Token: {data.access_token}</div>}
      </form>
    </div>
  );
} 