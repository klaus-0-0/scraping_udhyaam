"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [username, setUsername] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Get user info from localStorage (assumes user-info stored as JSON string)
    const userInfo = localStorage.getItem("user-info");
    if (userInfo) {
      const parsed = JSON.parse(userInfo);
      setUsername(parsed.username || parsed.name || "User");
    } else {
      // If no user info, redirect to login or signup page
      router.push("/udyaam");
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("user-info");
    router.push("/udyaam");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">
          Welcome, <span className="text-cyan-600">{username}</span>!
        </h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </header>

      <main>
        <p className="text-gray-700 text-lg">
          This is your dashboard. You can add your dashboard content here.
        </p>
      </main>
    </div>
  );
}
