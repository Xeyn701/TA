import React, { useState, useEffect } from 'react';
import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import { storage } from '../firebaseConfig';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import axios from 'axios';

function Setting() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userData, setUserData] = useState({
    id: '',
    name: '',
    email: '',
    profilePicture: '',
    userRole: '',
    language: '',
  });
  const [newProfilePic, setNewProfilePic] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users/me', {
          withCredentials: true, 
        });
        console.log("Data pengguna diterima:", response.data);
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleSave = async () => {
    try {
      await axios.put(
        'http://localhost:5000/api/users/me',
        {
          name: userData.name,
          userRole: userData.userRole,
          language: userData.language,
        },
        { withCredentials: true }
      );
      alert("Data berhasil diperbarui!");
    } catch (error) {
      console.error("Error updating user data:", error);
      alert("Gagal menyimpan perubahan.");
    }
  };

  const handleUploadProfilePic = async () => {
    if (!newProfilePic) return;

    try {
      // Gunakan userData.id sebagai identifier untuk penyimpanan
      const storageRef = ref(storage, `profile_pictures/${userData.id}`);
      await uploadBytes(storageRef, newProfilePic);
      const downloadURL = await getDownloadURL(storageRef);

      // Perbarui state lokal
      setUserData((prevData) => ({ ...prevData, profilePicture: downloadURL }));

      // Perbarui di database melalui endpoint /me
      await axios.put(
        'http://localhost:5000/api/users/me',
        { profile_picture: downloadURL },
        { withCredentials: true }
      );
      alert("Foto profil berhasil diperbarui!");
    } catch (error) {
      console.error("Error uploading profile picture:", error);
      alert("Gagal mengupload foto profil.");
    }
  };

  // Tampilkan loading selama data belum tersedia
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="grow">
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-2xl mx-auto">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">
              Pengaturan Akun
            </h1>
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
              <div className="flex items-center mb-6">
                <img
                  src={userData.profilePicture || "/default-avatar.png"}
                  alt="Profile"
                  className="w-16 h-16 rounded-full mr-4"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setNewProfilePic(e.target.files[0]);
                    }
                  }}
                  className="hidden"
                  id="uploadProfilePic"
                />
                <label
                  htmlFor="uploadProfilePic"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded cursor-pointer"
                >
                  Ubah Foto
                </label>
                <button
                  onClick={handleUploadProfilePic}
                  className="ml-2 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
                >
                  Simpan
                </button>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  value={userData.name}
                  onChange={(e) =>
                    setUserData({ ...userData, name: e.target.value })
                  }
                  className="mt-1 p-2 border rounded w-full dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Alamat Email
                </label>
                <input
                  type="email"
                  value={userData.email}
                  disabled
                  className="mt-1 p-2 border rounded w-full bg-gray-200 dark:bg-gray-700 dark:text-gray-400"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Apa tujuan Anda menggunakan aplikasi?
                </label>
                <select
                  value={userData.userRole}
                  onChange={(e) =>
                    setUserData({ ...userData, userRole: e.target.value })
                  }
                  className="mt-1 p-2 border rounded w-full dark:bg-gray-700 dark:text-white"
                >
                  <option value="Pelajar">Pelajar</option>
                  <option value="Profesional">Profesional</option>
                  <option value="Lainnya">Lainnya</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Bahasa
                </label>
                <select
                  value={userData.language}
                  onChange={(e) =>
                    setUserData({ ...userData, language: e.target.value })
                  }
                  className="mt-1 p-2 border rounded w-full dark:bg-gray-700 dark:text-white"
                >
                  <option value="Bahasa Indonesia">Bahasa Indonesia</option>
                  <option value="English">English</option>
                </select>
              </div>
              <button
                onClick={handleSave}
                className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
              >
                Simpan Perubahan
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Setting;
