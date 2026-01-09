import { NextResponse } from "next/server";
import { pool } from "@/lib/db";
import type { RowDataPacket, ResultSetHeader } from "mysql2";

export const runtime = "nodejs";

type UserRow = RowDataPacket & {
    id: number;
    email: string;
    password: string;
    role: number;
};

export async function GET() {
    try {
        const [rows] = await pool.execute<UserRow[]>(
            "SELECT id, email, role FROM users ORDER BY id DESC"
        );

        return NextResponse.json({
            success: true,
            users: rows.map((user) => ({
                id: user.id,
                email: user.email,
                role: user.role,
            })),
        });
    } catch (err) {
        console.error("GET /api/users error:", err);
        return NextResponse.json(
            { message: "Terjadi kesalahan saat mengambil data user" },
            { status: 500 }
        );
    }
}

export async function POST(req: Request) {
    try {
        const body = (await req.json()) as {
            email?: string;
            password?: string;
            role?: number;
        };

        const { email, password, role } = body;

        if (!email || !password) {
            return NextResponse.json(
                { message: "Email dan password wajib diisi" },
                { status: 400 }
            );
        }

        if (password.length < 6) {
            return NextResponse.json(
                { message: "Password minimal 6 karakter" },
                { status: 400 }
            );
        }

        if (role && ![1, 2].includes(role)) {
            return NextResponse.json(
                { message: "Role tidak valid" },
                { status: 400 }
            );
        }

        const [existingUsers] = await pool.execute<UserRow[]>(
            "SELECT id FROM users WHERE email = ? LIMIT 1",
            [email]
        );

        if (existingUsers.length > 0) {
            return NextResponse.json(
                { message: "Email sudah digunakan" },
                { status: 409 }
            );
        }

        const [result] = await pool.execute<ResultSetHeader>(
            "INSERT INTO users (email, password, role) VALUES (?, ?, ?)",
            [email, password, role || 1]
        );

        return NextResponse.json(
            {
                success: true,
                userId: result.insertId,
                message: "User berhasil dibuat",
            },
            { status: 201 }
        );
    } catch (err) {
        console.error("POST /api/users error:", err);
        return NextResponse.json(
            { message: "Terjadi kesalahan saat membuat user" },
            { status: 500 }
        );
    }
}
