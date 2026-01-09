import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

export const runtime = "nodejs";

export async function GET() {
    try {
        const [rows] = await pool.query("SELECT 1 AS ok");
        return NextResponse.json({
            ok: true,
            db: {
                host: process.env.DB_HOST,
                port: process.env.DB_PORT,
                name: process.env.DB_NAME,
                ssl: (process.env.DB_SSL || '').toLowerCase() === 'true' || /rlwy\.net|railway/i.test(process.env.DB_HOST || ''),
            },
            rows,
        });
    } catch (err: any) {
        return NextResponse.json(
            {
                ok: false,
                error: err?.message || String(err),
                code: err?.code,
            },
            { status: 500 }
        );
    }
}
