"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; 
import { register } from "@/utils/api";
import { toast } from "react-toastify";
import Link from 'next/link';

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState(""); // Added username field
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await register({ name, username, email, password });
      if (data.id) {
        toast.success("Registration successful!");
        router.push("/auth/login");
      } else {
        toast.error("Registration failed.");
      }
    } catch (error) {
      console.error("Registration error", error);
      toast.error("Registration failed. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6">Create an Account</h2>
        <form onSubmit={handleRegister} className="space-y-5">
          <div className="relative">
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder-gray-400"
              required
            />
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder-gray-400"
              required
            />
          </div>
          <div className="relative">
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder-gray-400"
              required
            />
          </div>
          <div className="relative">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder-gray-400"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-lg font-semibold transition transform hover:scale-105"
          >
            Register
          </button>
        </form>
        <p className="text-center text-gray-400 mt-4">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-blue-400 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
