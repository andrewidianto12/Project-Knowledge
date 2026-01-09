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

export async function GET(
    _req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const userId = parseInt(params.id, 10);

        if (isNaN(userId)) {
            return NextResponse.json(
                { message: "ID user tidak valid" },
                { status: 400 }
            );
        }

        const [rows] = await pool.execute<UserRow[]>(
            "SELECT id, email, role FROM users WHERE id = ? LIMIT 1",
            [userId]
        );

        if (!rows.length) {
            return NextResponse.json(
                { message: "User tidak ditemukan" },
                { status: 404 }
            );
        }

        const user = rows[0];
        return NextResponse.json({
            success: true,
            user: {
                id: user.id,
                email: user.email,
                role: user.role,
            },
        });
    } catch (err) {
        console.error("GET /api/users/[id] error:", err);
        return NextResponse.json(
            { message: "Terjadi kesalahan saat mengambil data user" },
            { status: 500 }
        );
    }
}

export async function PUT(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const userId = parseInt(params.id, 10);

        if (isNaN(userId)) {
            return NextResponse.json(
                { message: "ID user tidak valid" },
                { status: 400 }
            );
        }

        const body = (await req.json()) as {
            email?: string;
            password?: string;
            role?: number;
        };

        const { email, password, role } = body;

        if (!email) {
            return NextResponse.json(
                { message: "Email wajib diisi" },
                { status: 400 }
            );
        }

        if (role && ![1, 2].includes(role)) {
            return NextResponse.json(
                { message: "Role tidak valid" },
                { status: 400 }
            );
        }

        if (password && password.length < 6) {
            return NextResponse.json(
                { message: "Password minimal 6 karakter" },
                { status: 400 }
            );
        }

        const [existingUsers] = await pool.execute<UserRow[]>(
            "SELECT id FROM users WHERE id = ? LIMIT 1",
            [userId]
        );

        if (existingUsers.length === 0) {
            return NextResponse.json(
                { message: "User tidak ditemukan" },
                { status: 404 }
            );
        }

        const [emailCheck] = await pool.execute<UserRow[]>(
            "SELECT id FROM users WHERE email = ? AND id != ? LIMIT 1",
            [email, userId]
        );

        if (emailCheck.length > 0) {
            return NextResponse.json(
                { message: "Email sudah digunakan user lain" },
                { status: 409 }
            );
        }

        if (password) {
            await pool.execute(
                "UPDATE users SET email = ?, password = ?, role = ? WHERE id = ?",
                [email, password, role || 1, userId]
            );
        } else {
            await pool.execute(
                "UPDATE users SET email = ?, role = ? WHERE id = ?",
                [email, role || 1, userId]
            );
        }

        return NextResponse.json({
            success: true,
            message: "User berhasil diupdate",
        });
    } catch (err) {
        console.error("PUT /api/users/[id] error:", err);
        return NextResponse.json(
            { message: "Terjadi kesalahan saat mengupdate user" },
            { status: 500 }
        );
    }
}

export async function DELETE(
    _req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const userId = parseInt(params.id, 10);

        if (isNaN(userId)) {
            return NextResponse.json(
                { message: "ID user tidak valid" },
                { status: 400 }
            );
        }

        const [existingUsers] = await pool.execute<UserRow[]>(
            "SELECT id FROM users WHERE id = ? LIMIT 1",
            [userId]
        );

        if (existingUsers.length === 0) {
            return NextResponse.json(
                { message: "User tidak ditemukan" },
                { status: 404 }
            );
        }

        await pool.execute<ResultSetHeader>(
            "DELETE FROM users WHERE id = ?",
            [userId]
        );

        return NextResponse.json({
            success: true,
            message: "User berhasil dihapus",
        });
    } catch (err) {
        console.error("DELETE /api/users/[id] error:", err);
        return NextResponse.json(
            { message: "Terjadi kesalahan saat menghapus user" },
            { status: 500 }
        );
    }
}
