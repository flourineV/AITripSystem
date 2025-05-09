'use client'
import { FaChevronLeft, FaPen, FaXmark, FaCamera, FaUserCheck } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { useState, useRef, ChangeEvent, useEffect } from "react";
import Image from "next/image";

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedUser, setEditedUser] = useState({
    IDUser: "U00001",
    Name: "Nguyễn Văn A",
    Username: "nguyenvana",
    Friends: 218,
    Password: "123",
    Gender: 1,
    Email: "vana@example.com",
    PhoneNumber: "0901234567",
    Avatar: "/logo.png",
    Theme: 1,
    Language: 1,
    Aboutme: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sedeuismod, nunc a dapibus volutpat, quam velit euismod est, bibendum augue tortor sed nulla.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sedeuismod, nunc a dapibus volutpat, quam velit euismod est, abibendum augue tortor sed nulla.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Sedeuismod, nunc a dapibus volutpat, quam velit euismod est, abibendum augue tortor sed nulla."
  });
  const [step, setStep] = useState(1);
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isFriendRequestSent, setIsFriendRequestSent] = useState(false);

  const genderOptions = [
    { label: "Male", value: 1 },
    { label: "Female", value: 2 },
    { label: "None", value: 3 }
  ]

  const renderGender = () => {
    const gender = genderOptions.find(option => option.value === user.Gender);
    return <span>{gender ? gender.label : 'None'}</span>;
  }

  const handleBtnBack = () => {
    router.push("/");
  };

  const handleSaveBtn = async () => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
    if (!token) {
      router.push("/login");
      return;
    }

    try {
      const res = await fetch(`https://aitripsystem-api.onrender.com/api/v1/users/${user.IdUser}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          name: editedUser.Name,
          email: editedUser.Email,
          phonenumber: editedUser.PhoneNumber,
          gender: editedUser.Gender,
          description: editedUser.Aboutme
        })
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.detail || 'Update failed');
      }

      const updated = await res.json();
      setUser({
        ...user,
        Name: updated.name ?? user.Name,
        Email: updated.email ?? user.Email,
        PhoneNumber: updated.phonenumber ?? user.PhoneNumber,
        Gender: updated.gender ?? user.Gender,
        Aboutme: updated.description ?? user.Aboutme
      });
      setShowEditModal(false);
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Cập nhật thất bại!');
    }
  };

  const handleAvatarUpload = () => {
    fileInputRef.current?.click();
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) return;

    const reader = new FileReader();
    reader.onload = () => {
      setEditedUser(prev => ({
        ...prev,
        Avatar: reader.result as string,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditedUser(prev => ({
      ...prev,
      [name]: name === "Gender" ? parseInt(value) : value, // Parse Gender to integer
    }));
  };

  const handleOpenEditModal = () => {
    setEditedUser({ ...user });
    setStep(1);
    setShowEditModal(true);
  }

  const handleFriendRequestSent = () => {
    setIsFriendRequestSent(true);
  }

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
    const username = typeof window !== 'undefined' ? localStorage.getItem('username') : null;
    if (!token || !username) {
      router.push("/login");
      return;
    }
    fetch(`https://aitripsystem-api.onrender.com/api/v1/users/username?lookup=${username}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        if (!res.ok) throw new Error('Unauthorized');
        return res.json();
      })
      .then(data => {
        setUser({
          ...data,
          Avatar: data.avatar ? `data:image/png;base64,${data.avatar}` : "/logo.png",
          Name: data.name ?? "Chưa cập nhật",
          Email: data.email ?? "Chưa cập nhật",
          Friends: data.friends ?? 0,
          Gender: data.gender ?? 3,
          PhoneNumber: data.phonenumber ?? "Chưa cập nhật",
          Aboutme: data.description ?? "Chưa cập nhật",
          IdUser: data.iduser ?? "",
        });
        setLoading(false);
      })
      .catch(() => {
        router.push("/login");
      });
  }, [router]);

  if (loading || !user) {
    return <div className="flex justify-center items-center h-screen">Đang tải thông tin người dùng...</div>;
  }

  return (
    <div className="flex flex-col">
      <main className="flex-grow w-full mx-auto px-4 md:px-16 pt-8 pb-16 dark:bg-gradient-to-b from-black via-gray-800 to-blue-950 dark:border-b-2 border-gray-700">
        <div className="flex items-center gap-2 mb-6">
          <button
            onClick={handleBtnBack}
            className="p-2 rounded-full hover:bg-gray-300 dark:hover:bg-gray-700 dark:text-white transition-colors duration-200 cursor-pointer">
            <FaChevronLeft />
          </button>
          <h1 className="text-2xl font-bold text-black dark:text-white">{user.Name}</h1>
        </div>
        <div className="flex-grow flex-col bg-white rounded-lg p-6 mx-auto shadow-sm dark:bg-transparent text-black dark:text-white dark:border-2 border-gray-700">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
            <Image
              src={user.Avatar}
              width={200}
              height={200}
              alt="avatar"
              className="border-2 border-black rounded-full object-cover"
              style={{ width: '200px', height: '200px' }}
            />
            <div className="flex flex-col">
              <h2 className="text-2xl font-bold">{user.Name}</h2>
              <p>{user.Email}</p>
              <p>
                <span className="font-bold">{user.Friends}</span> Friends
              </p>
            </div>
            <div className="flex gap-2 sm:ml-auto justify-center">
              <button
                onClick={handleOpenEditModal} // Use the new handler
                className="flex items-center justify-center w-16 h-12 font-bold rounded-lg text-white bg-gray-800 hover:bg-gray-900 dark:bg-gray-800 dark:hover:bg-gray-700 dark:border-gray-700 cursor-pointer transition-colors duration-200"
              >
                <FaPen />
              </button>
              <button
                onClick={handleFriendRequestSent}
                className="flex items-center justify-center w-32 h-12 font-bold rounded-lg text-md text-white bg-gray-800 hover:bg-gray-900 dark:bg-gray-800 dark:hover:bg-gray-700 dark:border-gray-700 cursor-pointer transition-colors duration-200"
              >
                {isFriendRequestSent ? (<><FaUserCheck className="mr-2" /> Friend</>) : ("Add friend")}
              </button>
            </div>
          </div>
          <div className="flex-grow mt-8">
            <ul
              role="list"
              className="divide-y divide-gray-200 dark:divide-gray-700"
            >
              <li className="py-3 sm:py-4">
                <div className="text-justify">
                  <div className="font-bold text-lg">About me:</div>
                  {user.Aboutme}
                </div>
              </li>
              <li className="py-3 sm:py-4">
                <div>
                  <span className="font-bold text-lg">Phone number:</span> {user.PhoneNumber}
                </div>
              </li>
              <li className="py-3 sm:py-4">
                <div>
                  <span className="font-bold text-lg">Gender:</span> {renderGender()}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </main>

      {
        showEditModal && (
          <div className="flex fixed inset-0 z-50 items-center justify-center bg-black/50" draggable="false">
            <div className="flex flex-col bg-white rounded-lg shadow-lg w-full max-w-md mx-4 p-6 text-black">
              <h3 className="text-2xl font-semibold mb-4">Chỉnh sửa thông tin cá nhân</h3>
              <form className="flex flex-col gap-4" onSubmit={e => { e.preventDefault(); handleSaveBtn(); }}>
                <label className="flex flex-col gap-1">
                  <span className="font-semibold">Tên</span>
                  <input name="Name" value={editedUser.Name} onChange={handleInputChange} className="border border-gray-300 rounded p-2 text-black" />
                </label>
                <label className="flex flex-col gap-1">
                  <span className="font-semibold">Email</span>
                  <input name="Email" value={editedUser.Email} onChange={handleInputChange} className="border border-gray-300 rounded p-2 text-black" />
                </label>
                <label className="flex flex-col gap-1">
                  <span className="font-semibold">Số điện thoại</span>
                  <input name="PhoneNumber" value={editedUser.PhoneNumber} onChange={handleInputChange} className="border border-gray-300 rounded p-2 text-black" />
                </label>
                <label className="flex flex-col gap-1">
                  <span className="font-semibold">Giới tính</span>
                  <select name="Gender" value={editedUser.Gender} onChange={handleInputChange} className="border border-gray-300 rounded p-2 text-black">
                    <option value={1}>Nam</option>
                    <option value={2}>Nữ</option>
                    <option value={3}>Khác</option>
                  </select>
                </label>
                <label className="flex flex-col gap-1">
                  <span className="font-semibold">Giới thiệu</span>
                  <textarea name="Aboutme" value={editedUser.Aboutme} onChange={handleInputChange} className="border border-gray-300 rounded p-2 text-black" rows={3} />
                </label>
                <div className="flex gap-2 mt-4">
                  <button type="submit" className="flex-1 bg-blue-600 text-white rounded p-2 font-bold hover:bg-blue-700">Lưu</button>
                  <button type="button" onClick={() => setShowEditModal(false)} className="flex-1 bg-gray-200 rounded p-2 font-bold hover:bg-gray-300 text-black">Hủy</button>
                </div>
              </form>
            </div>
          </div>
        )
      }
    </div>
  );
}
