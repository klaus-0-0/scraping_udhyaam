"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import wall from "@/app/assets/SignBI.png"; // Adjust path if assets folder is different

const Signup = () => {
  const [username, setName] = useState("");
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  // Check if user is already logged in
  useEffect(() => {
    const info = localStorage.getItem("user-info");
    if (info) {
      router.push("/dashboard");
    }
  }, [router]);

  const handleSignup = async () => {
    try {
      const res = await axios.post(`http://localhost:3000/api/signup`, {
        username,
        number,
        password,
      });

      localStorage.setItem("user-info", JSON.stringify(res.data));

      setTimeout(() => {
        router.push("/dashboard");
      }, 1500);
    } catch (error: any) {
      console.error("Signup Failed:", error?.response?.data || error.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Background Image */}
      <Image
        src={wall}
        alt="Background"
        fill
        className="object-cover opacity-100"
        priority
      />

      {/* Top Navigation Bar */}
      <nav className="w-full bg-white p-4 flex justify-end relative z-10">
        <div className="flex space-x-6">
          <button
            className="text-black font-bold mt-4"
            onClick={() => router.push("/about")}
          >
            About
          </button>
          <div className="flex justify-center pt-4 gap-4">
            <button
              className="w-50 bg-black hover:bg-cyan-700 text-white py-2 px-4 rounded font-medium transition"
              onClick={handleSignup}
            >
              Sign up
            </button>
            <button
              className="w-50 bg-white hover:bg-cyan-700 text-black border border-black py-2 px-4 rounded font-medium transition"
              onClick={() => router.push("/login")}
            >
              Log in
            </button>
          </div>
        </div>
      </nav>

      {/* Main Form Section */}
      <div className="flex-1 flex items-center justify-center lg:justify-start p-4 relative z-10">
        <div className="w-full max-w-md lg:ml-60 bg-white bg-opacity-90 p-6 rounded-lg">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Create Account</h2>
            <p className="text-gray-600 mt-2">Welcome</p>
          </div>

          <div className="space-y-4">
            <input
              type="text"
              className="w-full border border-black rounded p-2 focus:outline-none focus:ring-1 focus:ring-cyan-500"
              placeholder="Username"
              value={username}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="number"
              className="w-full border border-black rounded p-2 focus:outline-none focus:ring-1 focus:ring-cyan-500"
              placeholder="Your phone number"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
            />

            <input
              type="password"
              className="w-full border border-black rounded p-2 focus:outline-none focus:ring-1 focus:ring-cyan-500"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="flex justify-center pt-4 gap-4">
              <button
                className="w-50 bg-black hover:bg-cyan-700 text-white py-2 px-4 rounded font-medium transition"
                onClick={handleSignup}
              >
                Sign up
              </button>
              <button
                className="w-50 bg-white hover:bg-cyan-700 text-black border border-black py-2 px-4 rounded font-medium transition"
                onClick={() => router.push("/login")}
              >
                Log in
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
