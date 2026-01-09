"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [role, setRole] = useState("1");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError("");
        setSuccess(false);

        if (password !== confirmPassword) {
            setError("Password tidak sama");
            return;
        }

        if (password.length < 6) {
            setError("Password minimal 6 karakter");
            return;
        }

        setLoading(true);

        try {
            const res = await fetch("/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password, role: parseInt(role) }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data?.message || "Registrasi gagal");
                return;
            }

            setSuccess(true);
            setTimeout(() => {
                router.push("/login");
            }, 2000);
        } catch (err) {
            console.error("register error:", err);
            setError("Server tidak bisa dihubungi");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-md rounded-lg bg-white p-8 shadow">
                <h1 className="mb-1 text-2xl font-semibold text-gray-900">
                    Register
                </h1>
                <p className="mb-6 text-sm text-gray-600">
                    Buat akun baru di Knowledge Management System
                </p>

                {success && (
                    <div className="mb-4 rounded-md border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-700">
                        ✓ Registrasi berhasil! Mengalihkan ke halaman login...
                    </div>
                )}

                <form onSubmit={onSubmit} className="space-y-4">
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                            placeholder="nama@gmail.com"
                            required
                            disabled={success}
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                            placeholder="Minimal 6 karakter"
                            required
                            disabled={success}
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                            Konfirmasi Password
                        </label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                            placeholder="Ketik ulang password"
                            required
                            disabled={success}
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                            role
                        </label>
                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                            required
                            disabled={success}
                        >
                            <option value="1">User</option>
                            <option value="2">Admin</option>
                        </select>
                    </div>

                    {error && (
                        <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading || success}
                        className="w-full rounded-md bg-blue-600 py-2 font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {loading ? "Membuat akun..." : "Daftar"}
                    </button>
                </form>

                <div className="mt-6 text-center text-sm text-gray-600">
                    Sudah punya akun?{" "}
                    <Link href="/login" className="text-blue-600 hover:underline font-medium">
                        Login di sini
                    </Link>
                </div>
            </div>
        </div>
    );
}
