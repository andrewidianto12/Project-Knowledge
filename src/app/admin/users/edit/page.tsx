"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

function EditUserForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const rawId = searchParams.get("id");
    const userId = rawId ? parseInt(rawId, 10) : NaN;

    const [currentEmail, setCurrentEmail] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("1");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        async function load() {
            if (Number.isNaN(userId)) {
                setError("ID user tidak valid");
                setLoading(false);
                return;
            }
            try {
                const res = await fetch(`/api/users/${userId}`);
                const data = await res.json();
                if (!res.ok) {
                    setError(data.message || "Gagal mengambil data user");
                    setLoading(false);
                    return;
                }
                setCurrentEmail(data.user.email);
                setEmail(data.user.email);
                setRole(String(data.user.role));
            } catch (err) {
                setError("Server tidak bisa dihubungi");
            } finally {
                setLoading(false);
            }
        }
        load();
    }, [userId]);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError("");
        setSaving(true);
        try {
            const body: any = { email, role: parseInt(role) };
            if (password) body.password = password;
            const res = await fetch(`/api/users/${userId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });
            const data = await res.json();
            if (!res.ok) {
                setError(data.message || "Gagal mengupdate user");
                return;
            }
            router.push("/admin/users");
        } catch (err) {
            setError("Server tidak bisa dihubungi");
        } finally {
            setSaving(false);
        }
    }

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
                    <h1 className="text-2xl font-bold text-gray-900">Edit User</h1>
                    <Link href="/admin/users" className="text-sm text-gray-600 hover:text-gray-900">← Kembali</Link>
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
                                placeholder={currentEmail}
                                required
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">Password (opsional)</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                                placeholder="Kosongkan jika tidak diubah"
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
                                disabled={saving}
                                className="flex-1 rounded-md bg-blue-600 py-2.5 font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {saving ? "Menyimpan..." : "Simpan Perubahan"}
                            </button>
                            <Link href="/admin/users" className="flex-1 rounded-md border border-gray-300 bg-white py-2.5 text-center font-medium text-gray-700 hover:bg-gray-50">Batal</Link>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
}

export default function EditUserPage() {
    return (
        <Suspense fallback={
            <div className="flex h-screen items-center justify-center bg-gray-50">
                <p className="text-gray-600">Loading...</p>
            </div>
        }>
            <EditUserForm />
        </Suspense>
    );
}
