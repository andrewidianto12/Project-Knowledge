"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type User = {
    id: number;
    email: string;
    role: number;
};

export default function AdminUsersPage() {
    const router = useRouter();
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const userStr = localStorage.getItem("user");
        if (!userStr) {
            router.push("/login");
            return;
        }

        const user = JSON.parse(userStr);
        setCurrentUser(user);

        if (user.role !== 2) {
            router.push("/dashboard");
            return;
        }

        fetchUsers();
    }, [router]);

    const fetchUsers = async () => {
        try {
            const res = await fetch("/api/users");
            const data = await res.json();

            if (res.ok) {
                setUsers(data.users || []);
            } else {
                setError(data.message || "Gagal mengambil data user");
            }
        } catch (err) {
            setError("Server tidak bisa dihubungi");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (userId: number) => {
        if (!confirm("Yakin ingin menghapus user ini?")) {
            return;
        }

        try {
            const res = await fetch(`/api/users/${userId}`, {
                method: "DELETE",
            });

            const data = await res.json();

            if (!res.ok) {
                alert(data.message || "Gagal menghapus user");
                return;
            }

            fetchUsers();
        } catch (err) {
            alert("Server tidak bisa dihubungi");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("user");
        router.push("/login");
    };

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center bg-gray-50">
                <p className="text-gray-600">Loading...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="border-b bg-white shadow">
                <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-gray-900">
                        User Management
                    </h1>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => router.push("/dashboard")}
                            className="text-sm text-gray-600 hover:text-gray-900"
                        >
                            Dashboard
                        </button>
                        <span className="text-sm text-gray-600">{currentUser?.email}</span>
                        <button
                            onClick={handleLogout}
                            className="rounded-md bg-red-600 px-3 py-1.5 text-sm text-white hover:bg-red-700"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </header>

            <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-900">
                        Daftar User
                    </h2>
                    <Link
                        href="/admin/users/add"
                        className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                    >
                        + Tambah User
                    </Link>
                </div>

                {error && (
                    <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                        {error}
                    </div>
                )}

                <div className="overflow-hidden rounded-lg bg-white shadow">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                    ID
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                    Email
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                    Role
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                                    Aksi
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                            {users.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-8 text-center text-sm text-gray-500">
                                        Belum ada user
                                    </td>
                                </tr>
                            ) : (
                                users.map((user) => (
                                    <tr key={user.id}>
                                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                                            {user.id}
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                                            {user.email}
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                                            <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${user.role === 2
                                                ? "bg-purple-100 text-purple-800"
                                                : "bg-green-100 text-green-800"
                                                }`}>
                                                {user.role === 2 ? "Admin" : "User"}
                                            </span>
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                                            <Link
                                                href={`/admin/users/edit?id=${user.id}`}
                                                className="mr-3 text-blue-600 hover:text-blue-900"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(user.id)}
                                                className="text-red-600 hover:text-red-900"
                                                disabled={user.id === currentUser?.id}
                                            >
                                                Hapus
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </main>

        </div>
    );
}
