"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, Search, MessageCircle, FileText } from "lucide-react";
import LeadersCarousel from "@/components/LeadersCarousel";

export default function CompanyProfile() {
    const [searchQuery, setSearchQuery] = useState("");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });
    const [sending, setSending] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSending(true);
        setError("");
        setSuccess(false);

        try {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            setSuccess(true);
            setFormData({ name: "", email: "", subject: "", message: "" });
            setTimeout(() => setSuccess(false), 3000);
        } catch (err) {
            setError("Gagal mengirim pesan. Silakan coba lagi.");
        } finally {
            setSending(false);
        }
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navbar */}
            <nav className="border-b-4 border-yellow-400 bg-blue-700 px-4 py-4 shadow-md sm:px-6 lg:px-8">
                <div className="mx-auto max-w-7xl flex justify-between items-center">
                    <div className="text-2xl font-bold text-white">KMS | LEARNING CENTER</div>
                    <div className="flex items-center gap-8">
                        <div className="hidden md:flex gap-6 text-white">
                            <Link href="/company" className="hover:text-yellow-300 transition">
                                Beranda
                            </Link>
                            <Link href="#pelatihan" className="hover:text-yellow-300 transition">
                                Pelatihan
                            </Link>
                            <Link href="#pusat" className="hover:text-yellow-300 transition">
                                KMS-Pedia
                            </Link>
                        </div>
                        <Link
                            href="/login"
                            className="rounded-md bg-yellow-400 px-4 py-2 text-sm font-medium text-blue-700 hover:bg-yellow-300 transition"
                        >
                            Login
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section with Search */}
            <section className="relative bg-gradient-to-br from-blue-700 via-blue-600 to-blue-800 px-4 py-20 text-white sm:px-6 lg:px-8">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0 bg-pattern"></div>
                </div>
                <div className="relative mx-auto max-w-7xl">
                    <h1 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
                        Hai Sobat Pelajar! Ingin belajar pengetahuan apa hari ini?
                    </h1>

                    {/* Search Bar */}
                    <form onSubmit={handleSearch} className="mx-auto mt-10 max-w-2xl">
                        <div className="relative flex items-center gap-3 rounded-full bg-white px-6 py-4 shadow-lg">
                            <Search className="h-5 w-5 text-gray-400" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Cari pengetahuan, kursus, artikel..."
                                className="flex-1 bg-transparent text-gray-900 placeholder-gray-500 outline-none"
                            />
                        </div>
                    </form>
                </div>
            </section>

            {/* Main Content */}
            <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="grid gap-8 md:grid-cols-3">
                    {/* Left Column - Info */}
                    <div className="md:col-span-2">
                        <div className="rounded-lg bg-white p-8 shadow">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Tentang Kami</h2>
                            <p className="text-gray-600 leading-relaxed">
                                Knowledge Management System (KMS) adalah platform terpadu untuk manajemen pengetahuan
                                dan kolaborasi tim Anda. Kami menyediakan solusi pembelajaran yang komprehensif untuk
                                meningkatkan produktivitas dan pengembangan sumber daya manusia di organisasi Anda.
                            </p>

                            {/* Features */}
                            <div className="mt-8 grid gap-6 md:grid-cols-2">
                                {[
                                    {
                                        title: "Manajemen Pengetahuan",
                                        description: "Kelola dan organisir pengetahuan perusahaan dengan sistem yang efisien.",
                                    },
                                    {
                                        title: "Kolaborasi Tim",
                                        description: "Tingkatkan kolaborasi dengan tools sharing knowledge yang powerful.",
                                    },
                                    {
                                        title: "Pelatihan Online",
                                        description: "Akses materi pelatihan berkualitas kapan saja dan dimana saja.",
                                    },
                                    {
                                        title: "Keamanan Data",
                                        description: "Lindungi data dengan sistem keamanan berlapis dan enkripsi enterprise.",
                                    },
                                ].map((feature, index) => (
                                    <div key={index} className="border-l-4 border-yellow-400 pl-4">
                                        <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                                        <p className="mt-1 text-sm text-gray-600">{feature.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Carousel */}
                    <div>
                        <LeadersCarousel />
                    </div>
                </div>
            </section>

            {/* Knowledge Sharing Section */}
            <section className="bg-gray-50 px-4 py-16 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-7xl">
                    {/* Tab Navigation */}
                    <div className="flex justify-center gap-8 mb-12">
                        <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium shadow-md">
                            Info Terbaru
                        </button>
                    </div>

                    {/* Cards Grid */}
                    <div className="grid gap-6 md:grid-cols-4">
                        {[
                            {
                                title: "Pengetahuan Digital",
                                description: "Akses berbagai sumber pengetahuan digital untuk meningkatkan kompetensi dan keterampilan Anda di era modern...",
                                time: "4 hari yang lalu",
                                image: "/knowledge/card1.jpg",
                                badge: "KNOWLEDGE SHARING",
                                color: "bg-blue-400",
                            },
                            {
                                title: "Transformasi Digital",
                                description: "Pelajari strategi dan implementasi transformasi digital untuk meningkatkan efisiensi organisasi di era Industry 4.0...",
                                time: "4 hari yang lalu",
                                image: "/knowledge/card2.jpg",
                                badge: "KNOWLEDGE SHARING",
                                color: "bg-orange-300",
                            },
                            {
                                title: "Literasi Digital & Keamanan Siber",
                                description: "Panduan lengkap tentang literasi digital dan praktik keamanan siber untuk melindungi data dan informasi penting...",
                                time: "1 minggu yang lalu",
                                image: "/knowledge/card3.jpg",
                                badge: "KNOWLEDGE SHARING",
                                color: "bg-yellow-400",
                            },
                            {
                                title: "Platform Pembelajaran Digital",
                                description: "Manfaatkan berbagai platform pembelajaran digital untuk pengembangan skill dan kompetensi profesional...",
                                time: "1 minggu yang lalu",
                                image: "/knowledge/card4.jpg",
                                badge: "KNOWLEDGE SHARING",
                                color: "bg-blue-400",
                            },
                        ].map((item, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow flex flex-col"
                            >
                                {/* Image with Badge */}
                                <div className={`relative h-48 ${item.color} flex items-center justify-center`}>
                                    <div className="absolute top-4 left-4 bg-gray-900 text-white text-xs px-3 py-1 rounded-full font-medium">
                                        {item.badge}
                                    </div>
                                    <div className="absolute bottom-4 right-4 bg-white text-gray-700 text-xs px-3 py-1.5 rounded-full flex items-center gap-1">
                                        <span>⏱</span> {item.time}
                                    </div>
                                    {/* Document Icon */}
                                    <FileText className="w-24 h-24 text-white opacity-20" strokeWidth={1.5} />
                                </div>

                                {/* Content */}
                                <div className="p-6 flex flex-col flex-1">
                                    <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 min-h-[3.5rem]">
                                        {item.title}
                                    </h3>
                                    <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-1">
                                        {item.description}
                                    </p>
                                    <button className="w-full border-2 border-blue-600 text-blue-600 px-4 py-2.5 rounded-lg font-medium hover:bg-blue-50 transition flex items-center justify-center gap-2 mt-auto">
                                        Lihat Detail <span>→</span>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* KMS Pedia Section */}
            <section className="bg-gradient-to-br from-blue-50 to-white px-4 py-16 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-7xl">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-blue-900 mb-4">KMS Pedia</h2>
                        <p className="text-gray-600 text-lg">
                            Ensiklopedia pengetahuan lengkap untuk mendukung pembelajaran Anda
                        </p>
                    </div>

                    <div className="grid gap-8 md:grid-cols-3">
                        {[
                            {
                                icon: "📚",
                                title: "Perpustakaan Digital",
                                description: "Akses ribuan e-book, jurnal, dan dokumen pembelajaran",
                                count: "5,000+",
                            },
                            {
                                icon: "🎓",
                                title: "Kursus Online",
                                description: "Video pembelajaran interaktif dari para ahli",
                                count: "250+",
                            },
                            {
                                icon: "📝",
                                title: "Artikel & Tutorial",
                                description: "Panduan praktis untuk berbagai topik",
                                count: "1,200+",
                            },
                        ].map((item, index) => (
                            <div
                                key={index}
                                className="group bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-all hover:-translate-y-2 border border-gray-100"
                            >
                                <div className="text-6xl mb-6">{item.icon}</div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                                    {item.title}
                                </h3>
                                <p className="text-gray-600 text-base mb-6 leading-relaxed">
                                    {item.description}
                                </p>
                                <div className="pt-4 border-t border-gray-100">
                                    <span className="text-3xl font-bold text-blue-600">
                                        {item.count}
                                    </span>
                                    <span className="text-gray-500 text-base ml-2">Konten</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* CTA Button */}
                    <div className="text-center mt-12">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition">
                            Jelajahi KMS Pedia
                        </button>
                    </div>
                </div>
            </section>

            {/* Program Pelatihan Section */}
            <section id="pelatihan" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">Program Pelatihan</h2>
                <div className="grid gap-8 md:grid-cols-3">
                    {[
                        {
                            title: "Leadership Development",
                            description: "Program pengembangan kepemimpinan untuk manager dan supervisor",
                            duration: "3 Bulan",
                            level: "Intermediate",
                            icon: "👔",
                        },
                        {
                            title: "Digital Transformation",
                            description: "Pelatihan transformasi digital dan teknologi terkini",
                            duration: "2 Bulan",
                            level: "Advanced",
                            icon: "💻",
                        },
                        {
                            title: "Soft Skills Mastery",
                            description: "Pengembangan komunikasi, teamwork, dan problem solving",
                            duration: "1 Bulan",
                            level: "Beginner",
                            icon: "🎯",
                        },
                        {
                            title: "Project Management",
                            description: "Sertifikasi project management profesional (PMP)",
                            duration: "4 Bulan",
                            level: "Intermediate",
                            icon: "📊",
                        },
                        {
                            title: "Data Analytics",
                            description: "Analisis data dan business intelligence untuk pengambilan keputusan",
                            duration: "3 Bulan",
                            level: "Advanced",
                            icon: "📈",
                        },
                        {
                            title: "Innovation Workshop",
                            description: "Workshop inovasi dan creative problem solving",
                            duration: "2 Minggu",
                            level: "All Levels",
                            icon: "💡",
                        },
                    ].map((program, index) => (
                        <div
                            key={index}
                            className="rounded-xl bg-white shadow-md hover:shadow-xl transition-shadow border-t-[6px] border-blue-600 overflow-hidden flex flex-col"
                        >
                            <div className="p-6 flex-1 flex flex-col">
                                <div className="text-5xl mb-4">{program.icon}</div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{program.title}</h3>
                                <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-1">
                                    {program.description}
                                </p>
                                <div className="flex gap-3 mb-4">
                                    <span className="bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-sm font-medium">
                                        {program.duration}
                                    </span>
                                    <span className="bg-yellow-50 text-yellow-700 px-4 py-1.5 rounded-full text-sm font-medium">
                                        {program.level}
                                    </span>
                                </div>
                                <button className="w-full rounded-lg bg-blue-600 px-4 py-3 text-white font-medium hover:bg-blue-700 transition">
                                    Daftar Sekarang
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Contact Section */}
            <section className="bg-blue-700 px-4 py-16 text-white sm:px-6 lg:px-8">
                <div className="mx-auto max-w-7xl">
                    <h2 className="mb-12 text-center text-3xl font-bold">Hubungi Kami</h2>
                    {/* Contact Form - Centered */}
                    <div className="mx-auto max-w-2xl mb-12">
                        <div className="rounded-lg bg-white p-8 shadow-lg">
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full rounded-md border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Nama Anda"
                                    />
                                </div>

                                <div>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full rounded-md border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="email@example.com"
                                    />
                                </div>

                                <div>
                                    <input
                                        type="text"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                        className="w-full rounded-md border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Subjek pesan"
                                    />
                                </div>

                                <div>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows={5}
                                        className="w-full rounded-md border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Tulis pesan Anda"
                                    />
                                </div>

                                {success && (
                                    <div className="rounded-md bg-green-500 bg-opacity-20 px-3 py-2 text-sm text-green-100 border border-green-300 border-opacity-30">
                                        Pesan berhasil dikirim!
                                    </div>
                                )}

                                {error && (
                                    <div className="rounded-md bg-red-500 bg-opacity-20 px-3 py-2 text-sm text-red-100 border border-red-300 border-opacity-30">
                                        {error}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={sending}
                                    className="w-full rounded-md bg-yellow-400 py-3 font-semibold text-blue-900 hover:bg-yellow-500 transition disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {sending ? "Mengirim..." : "Kirim Pesan"}
                                </button>
                            </form>
                        </div>
                    </div>

                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-gray-300 bg-gray-900 px-4 py-8 text-white sm:px-6 lg:px-8">
                <div className="mx-auto max-w-7xl text-center">
                    <p>&copy; 2026 Knowledge Management System. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}

