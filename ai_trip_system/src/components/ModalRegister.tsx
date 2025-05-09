import React, { useState } from "react";
import useSWRMutation from "swr/mutation";

async function registerUser(url: string, { arg }: { arg: { username: string; password: string } }) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(arg),
  });
  if (!res.ok) throw new Error("Register failed");
  return res.json();
}

export default function ModalRegister({ open, onClose, onSuccess }: { open: boolean, onClose: () => void, onSuccess: () => void }) {
  const [form, setForm] = useState({ username: "", password: "" });
  const { trigger, isMutating, error } = useSWRMutation(
    "https://aitripsystem-api.onrender.com/api/v1/register",
    registerUser
  );
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-sm relative animate-fadeIn">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl font-bold">×</button>
        <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">Đăng ký tài khoản</h2>
        <form
          className="flex flex-col gap-4"
          onSubmit={async e => {
            e.preventDefault();
            await trigger(form).then(() => {
              onSuccess();
            }).catch(() => {});
          }}
        >
          <input
            type="text"
            placeholder="Email hoặc username"
            className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400"
            required
            name="username"
            value={form.username}
            onChange={e => setForm(f => ({ ...f, username: e.target.value }))}
          />
          <input
            type="password"
            placeholder="Mật khẩu"
            className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400"
            required
            name="password"
            value={form.password}
            onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
          />
          <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg shadow transition" disabled={isMutating}>
            {isMutating ? "Đang đăng ký..." : "Đăng ký"}
          </button>
          {error && <div className="text-red-500 text-center">Đăng ký thất bại</div>}
        </form>
      </div>
    </div>
  );
} 