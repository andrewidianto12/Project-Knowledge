import { NextResponse } from "next/server";
import { pool } from "@/lib/db";
import type { RowDataPacket } from "mysql2";

export const runtime = "nodejs";

type UserRow = RowDataPacket & {
    id: number;
    email: string;
    password: string;
};

export async function POST(req: Request) {
    try {
        const body = (await req.json()) as {
            email?: string;
            password?: string;
        };

        const { email, password } = body;

        if (!email || !password) {
            return NextResponse.json(
                { message: "Email dan password wajib diisi" },
                { status: 400 }
            );
        }

        const [rows] = await pool.execute<UserRow[]>(
            "SELECT id, email, password FROM users WHERE email = ? LIMIT 1",
            [email]
        );

        if (!rows.length) {
            return NextResponse.json(
                { message: "Email atau password salah" },
                { status: 401 }
            );
        }

        const user = rows[0];

        if (user.password !== password) {
            return NextResponse.json(
                { message: "Email atau password salah" },
                { status: 401 }
            );
        }

        return NextResponse.json({
            success: true,
            user: {
                id: user.id,
                email: user.email,
            },
        });
    } catch (err) {
        console.error("POST /api/login error:", err);
        return NextResponse.json(
            { message: "Terjadi kesalahan saat login" },
            { status: 500 }
        );
    }
}
