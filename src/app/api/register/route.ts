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

export async function POST(req: Request) {
    try {
        const body = (await req.json()) as {
            email?: string;
            password?: string;
            role?: number;
        };

        const { email, password, role = 1 } = body;

        if (!email || !password) {
            return NextResponse.json(
                { message: "Email dan password wajib diisi" },
                { status: 400 }
            );
        }

        if (![1, 2].includes(role)) {
            return NextResponse.json(
                { message: "Role tidak valid" },
                { status: 400 }
            );
        }

        const [rows] = await pool.execute<UserRow[]>(
            "SELECT id FROM users WHERE email = ? LIMIT 1",
            [email]
        );

        if (rows.length > 0) {
            return NextResponse.json(
                { message: "Email sudah terdaftar" },
                { status: 409 }
            );
        }

        const [result] = await pool.execute<ResultSetHeader>(
            "INSERT INTO users (email, password, role) VALUES (?, ?, ?)",
            [email, password, role]
        );

        return NextResponse.json({
            success: true,
            user: {
                id: result.insertId,
                email,
                role,
            },
        });
    } catch (err) {
        console.error("POST /api/register error:", err);
        return NextResponse.json(
            { message: "Terjadi kesalahan saat register" },
            { status: 500 }
        );
    }
}
