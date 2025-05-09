"use client";
import { useState } from "react";
import Home from "./home/page";
import useSWRMutation from "swr/mutation";
import ModalLogin from "../components/ModalLogin";
import ModalRegister from "../components/ModalRegister";

async function loginUser(url: string, { arg }: { arg: { username: string; password: string } }) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(arg),
  });
  if (!res.ok) throw new Error("Login failed");
  return res.json();
}

async function registerUser(url: string, { arg }: { arg: { username: string; password: string } }) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(arg),
  });
  if (!res.ok) throw new Error("Register failed");
  return res.json();
}

export default function Page() {
  const [showHome, setShowHome] = useState(false);
  const [modal, setModal] = useState<null | "login" | "register">(null);
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const [registerForm, setRegisterForm] = useState({ username: "", password: "" });

  const loginMutation = useSWRMutation(
    "https://aitripsystem-api.onrender.com/api/v1/login",
    loginUser
  );
  const registerMutation = useSWRMutation(
    "https://aitripsystem-api.onrender.com/api/v1/register",
    registerUser
  );

  if (showHome) return <Home />;

  return (
    <div className="relative w-full flex flex-col">
      {/* Ảnh nền toàn màn hình */}
      <img src="/bg-intro.jpg" alt="background" className="absolute inset-0 w-full h-full object-cover z-0" />
      {/* Overlay mờ */}
      <div className="absolute inset-0 bg-blue-900/60 z-10" />
      {/* Nội dung intro */}
      <div className="relative z-20 flex flex-col items-center justify-center w-full h-full min-h-screen">
        <img src="/logo.png" alt="logo" className="w-28 h-28 rounded-full shadow-2xl border-4 border-white mb-6 bg-white/80" />
        <h1 className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg text-center mb-4">Chào mừng đến với TravelGO!</h1>
        <p className="text-2xl md:text-3xl text-blue-100 text-center mb-8 max-w-2xl font-medium drop-shadow">Khám phá, kết nối bạn bè và lên kế hoạch cho chuyến đi mơ ước của bạn.</p>
        <div className="flex gap-8 w-full justify-center mb-2">
          <button
            className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold text-xl px-10 py-4 rounded-xl shadow-xl transition transform hover:scale-105"
            onClick={() => setModal("register")}
          >
            Đăng ký
          </button>
          <button
            className="bg-white/90 border-2 border-yellow-400 hover:bg-yellow-100 text-blue-900 font-bold text-xl px-10 py-4 rounded-xl shadow-xl transition transform hover:scale-105"
            onClick={() => setModal("login")}
          >
            Đăng nhập
          </button>
        </div>
      </div>

      {/* Section 2: Giới thiệu về TravelGO */}
      <section className="w-full flex flex-col items-center bg-white/90 py-16">
        <div className="max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-blue-800 mb-4">Về TravelGO</h2>
          <p className="text-lg text-gray-700 mb-4">
            <b>TravelGO</b> là nền tảng giúp bạn lên kế hoạch, kết nối bạn bè và khám phá những điểm đến tuyệt vời trên khắp thế giới. Chúng tôi mang đến trải nghiệm du lịch thông minh, tiện lợi và đầy cảm hứng cho mọi người.
          </p>
        </div>
      </section>

      {/* Section 3: Tính năng nổi bật */}
      <section className="w-full flex flex-col items-center bg-gradient-to-b from-blue-50 to-white py-16">
        <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
            <span className="text-4xl text-blue-500 mb-2">🗺️</span>
            <h3 className="font-bold text-lg mb-2">Lập kế hoạch chuyến đi</h3>
            <p className="text-gray-600 text-center">Tạo lịch trình cá nhân hoặc nhóm, quản lý điểm đến, thời gian, chi phí dễ dàng.</p>
          </div>
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
            <span className="text-4xl text-green-500 mb-2">🤝</span>
            <h3 className="font-bold text-lg mb-2">Kết nối bạn bè</h3>
            <p className="text-gray-600 text-center">Mời bạn bè, trò chuyện, chia sẻ hành trình và cùng nhau khám phá thế giới.</p>
          </div>
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
            <span className="text-4xl text-purple-500 mb-2">🤖</span>
            <h3 className="font-bold text-lg mb-2">Gợi ý AI thông minh</h3>
            <p className="text-gray-600 text-center">Nhận đề xuất địa điểm, lịch trình tối ưu nhờ trí tuệ nhân tạo.</p>
          </div>
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
            <span className="text-4xl text-yellow-500 mb-2">⭐</span>
            <h3 className="font-bold text-lg mb-2">Đánh giá & chia sẻ</h3>
            <p className="text-gray-600 text-center">Đánh giá chuyến đi, chia sẻ trải nghiệm, lưu giữ kỷ niệm cùng cộng đồng.</p>
          </div>
        </div>
      </section>

      {/* Section 4: Ảnh truyền cảm hứng */}
      <section className="w-full flex flex-col items-center bg-white py-16">
        <div className="max-w-4xl w-full flex flex-col items-center">
          <img src="/travel-inspire.jpg" alt="Travel Inspiration" className="rounded-2xl shadow-xl w-full max-h-96 object-cover mb-6" />
          <div className="italic text-blue-600 text-xl font-semibold">"Cùng TravelGO, mỗi chuyến đi là một hành trình đáng nhớ!"</div>
        </div>
      </section>

      {/* Section 5: Lời kêu gọi hành động */}
      <section className="w-full flex flex-col items-center bg-blue-50 py-16">
        <div className="max-w-2xl text-center">
          <h2 className="text-2xl font-bold text-blue-700 mb-4">Sẵn sàng khám phá thế giới?</h2>
          <p className="text-lg text-gray-700 mb-6">Tham gia TravelGO ngay hôm nay để bắt đầu hành trình của bạn!</p>
          <button
            className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold text-xl px-10 py-4 rounded-xl shadow-xl transition transform hover:scale-105"
            onClick={() => setModal("register")}
          >
            Đăng ký miễn phí
          </button>
        </div>
      </section>

      {/* Section 6: Footer đơn giản */}
      <footer className="w-full bg-blue-900 text-white text-center py-6 text-sm opacity-90">
        &copy; {new Date().getFullYear()} TravelGO. All rights reserved.
      </footer>

      {/* Modal Register */}
      <ModalRegister
        open={modal === "register"}
        onClose={() => setModal(null)}
        onSuccess={() => setShowHome(true)}
      />
      {/* Modal Login */}
      <ModalLogin
        open={modal === "login"}
        onClose={() => setModal(null)}
        onSuccess={() => setShowHome(true)}
      />
    </div>
  );
}
