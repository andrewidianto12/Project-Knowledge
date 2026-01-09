"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type User = {
    id: number;
    email: string;
    role: number;
};

export default function DashboardPage() {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const userStr = localStorage.getItem("user");
        if (!userStr) {
            router.push("/login");
            return;
        }
        setUser(JSON.parse(userStr));
        setLoading(false);
    }, [router]);

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
            {/* Header */}
            <header className="border-b bg-white shadow">
                <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-gray-900">
                        Knowledge Management System
                    </h1>
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-600">{user?.email}</span>
                        <button
                            onClick={handleLogout}
                            className="rounded-md bg-red-600 px-4 py-2 text-white font-medium hover:bg-red-700"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="grid gap-6 md:grid-cols-3">
                    {/* Card: Documents */}
                    <div className="rounded-lg bg-white p-6 shadow hover:shadow-lg transition-shadow cursor-pointer">
                        <div className="mb-4 flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900">Documents</h3>
                        <p className="mt-2 text-sm text-gray-600">Kelola dokumen dan file</p>
                    </div>

                    {/* Card: Knowledge Base */}
                    <div className="rounded-lg bg-white p-6 shadow hover:shadow-lg transition-shadow cursor-pointer">
                        <div className="mb-4 flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white">
                            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C6.5 6.253 2 10.998 2 17s4.5 10.747 10 10.747c5.5 0 10-4.998 10-10.747S17.5 6.253 12 6.253z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900">Knowledge Base</h3>
                        <p className="mt-2 text-sm text-gray-600">Cari dan akses artikel</p>
                    </div>

                    {/* Card: Settings */}
                    <div className="rounded-lg bg-white p-6 shadow hover:shadow-lg transition-shadow cursor-pointer">
                        <div className="mb-4 flex items-center justify-center h-12 w-12 rounded-md bg-purple-500 text-white">
                            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900">Settings</h3>
                        <p className="mt-2 text-sm text-gray-600">Atur preferensi akun</p>
                    </div>
                </div>

                {/* Admin Menu */}
                {user?.role === 2 && (
                    <div className="mt-12">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">Menu Admin</h2>
                        <div className="grid gap-6 md:grid-cols-3">
                            {/* Card: User Management */}
                            <div
                                onClick={() => router.push("/admin/users")}
                                className="rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 p-6 shadow hover:shadow-lg transition-shadow cursor-pointer"
                            >
                                <div className="mb-4 flex items-center justify-center h-12 w-12 rounded-md bg-white bg-opacity-20 text-white">
                                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-medium text-white">User Management</h3>
                                <p className="mt-2 text-sm text-purple-100">Kelola semua user</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Welcome Section */}
                <div className="mt-12 rounded-lg bg-white p-8 shadow">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">
                        Selamat datang, {user?.email}! 👋
                    </h2>
                    <p className="text-gray-600">
                        Anda telah berhasil login ke Knowledge Management System. Gunakan menu di atas untuk mulai mengelola dokumen dan pengetahuan.
                    </p>
                </div>
            </main>
        </div>
    );
}
