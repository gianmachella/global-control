import { NextResponse } from "next/server";
import { pool } from "@/libs/mysql";

export async function GET() {
  const response = await pool.query("SELECT * FROM users");
  return NextResponse.json({ users: response });
}

export function POST() {
  return NextResponse.json("Creando usuario");
}
