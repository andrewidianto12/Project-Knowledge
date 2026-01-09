"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type CurrentUser = {
    id: number;
    email: string;
    role: number;
};

export default function AddUserPage() {
    const router = useRouter();
    const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [role, setRole] = useState("1");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const userStr = localStorage.getItem("user");
        if (!userStr) {
            router.push("/login");
            return;
        }
        const user = JSON.parse(userStr) as CurrentUser;
        setCurrentUser(user);
        if (user.role !== 2) {
            router.push("/dashboard");
        }
    }, [router]);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError("");

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
            const res = await fetch("/api/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password, role: parseInt(role) }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.message || "Gagal menambahkan user");
                return;
            }

            router.push("/admin/users");
        } catch (err) {
            setError("Server tidak bisa dihubungi");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="border-b bg-white shadow">
                <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-gray-900">Tambah User Baru</h1>
                    <div className="flex items-center gap-4">
                        <Link href="/admin/users" className="text-sm text-gray-600 hover:text-gray-900">← Kembali</Link>
                        <span className="text-sm text-gray-600">{currentUser?.email}</span>
                    </div>
                </div>
            </header>

            <main className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="rounded-lg bg-white p-8 shadow">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                                placeholder="nama@contoh.com"
                                required
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                                placeholder="Minimal 6 karakter"
                                required
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">Konfirmasi Password</label>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                                placeholder="Ketik ulang password"
                                required
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">Role</label>
                            <select
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                            >
                                <option value="1">User</option>
                                <option value="2">Admin</option>
                            </select>
                        </div>

                        {error && (
                            <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
                        )}

                        <div className="flex gap-3">
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex-1 rounded-md bg-blue-600 py-2.5 font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {loading ? "Menyimpan..." : "Simpan User"}
                            </button>
                            <Link href="/admin/users" className="flex-1 rounded-md border border-gray-300 bg-white py-2.5 text-center font-medium text-gray-700 hover:bg-gray-50">Batal</Link>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
}
