import { PDFDocument, rgb } from "pdf-lib";

import { NextResponse } from "next/server";
import { pool } from "@/libs/mysql";
import qr from "qrcode";

export async function GET() {
  try {
    const response = await pool.query("SELECT * FROM lots");
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const {
      lot_number,
      destination,
      conveyance,
      updated,
      status,
      create_date,
      shipments,
    } = await request.json();

    const result = await pool.query(
      "INSERT INTO lots (lot_number, destination, conveyance, updated, status, create_date, shipments) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [
        lot_number,
        destination,
        conveyance,
        updated,
        status,
        create_date,
        JSON.stringify(shipments),
      ]
    );

    return NextResponse.json({ message: "Lote creado correctamente" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
