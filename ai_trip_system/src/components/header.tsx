// src/app/components/header.tsx
"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { AiOutlineHeart, AiOutlineUser } from "react-icons/ai";
import { FiMap, FiUsers, FiCalendar, FiMenu } from "react-icons/fi";
import { FaBell, FaUserCircle, FaSearch, FaCog } from "react-icons/fa";
import { MdOutlineLogin } from "react-icons/md";

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <header className="w-full bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-800 shadow-lg px-6 py-3 flex items-center justify-between sticky top-0 z-50">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <Link href="/">
          <Image src="/logo.png" width={40} height={40} alt="logo" className="rounded-full shadow border-2 border-white bg-white" />
        </Link>
        <Link href="/">
          <span className="text-white font-bold text-2xl tracking-wide select-none drop-shadow">TravelGO</span>
        </Link>
      </div>
      {/* Search bar */}
      <div className="flex-1 flex justify-center px-4">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Tìm kiếm điểm đến, tour, ..."
            className="w-full py-2 pl-10 pr-4 rounded-full bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>
      </div>
      {/* Actions desktop */}
      <div className="hidden md:flex items-center gap-2">
        <button className="p-2 rounded-full hover:bg-indigo-700 transition">
          <FaBell className="text-white text-lg" />
        </button>
        <button className="p-2 rounded-full hover:bg-indigo-700 transition">
          <FaCog className="text-white text-lg" />
        </button>
        <Link href="/profile" className="p-2 rounded-full hover:bg-indigo-700 transition">
          <FaUserCircle className="text-white text-2xl" />
        </Link>
        <Link href="/login" className="flex items-center gap-2 bg-gradient-to-r from-pink-500 to-violet-500 text-white font-bold px-4 py-2 rounded-full shadow hover:scale-105 transition">
          <MdOutlineLogin className="text-xl" />
          Đăng nhập
        </Link>
      </div>
      {/* Mobile menu */}
      <div className="md:hidden relative" ref={dropdownRef}>
        <button
          className="flex items-center justify-center w-12 h-12 rounded-full bg-white/30 hover:bg-white/50 transition shadow-lg"
          onClick={toggleDropdown}
          aria-label="Menu"
          aria-expanded={isDropdownOpen}
        >
          <FiMenu size={32} />
        </button>
        <div
          className={`absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl py-2 transition-all duration-300 z-50 ${isDropdownOpen ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'}`}
        >
          <Link href="/profile" className="flex items-center gap-2 px-4 py-3 text-gray-700 hover:bg-blue-50 rounded-lg transition" onClick={() => setIsDropdownOpen(false)}>
            <FaUserCircle size={22} />
            Trang cá nhân
          </Link>
          <Link href="/login" className="flex items-center gap-2 px-4 py-3 text-gray-700 hover:bg-blue-50 rounded-lg transition" onClick={() => setIsDropdownOpen(false)}>
            <MdOutlineLogin size={22} />
            Đăng nhập
          </Link>
          <button className="flex items-center gap-2 px-4 py-3 text-gray-700 hover:bg-blue-50 rounded-lg transition w-full">
            <FaBell size={22} />
            Thông báo
          </button>
          <button className="flex items-center gap-2 px-4 py-3 text-gray-700 hover:bg-blue-50 rounded-lg transition w-full">
            <FaCog size={22} />
            Cài đặt
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;