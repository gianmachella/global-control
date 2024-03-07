import { NextResponse } from "next/server";
import { pool } from "@/libs/mysql";

export async function GET(request, { params }) {
  try {
    const result = await pool.query("SELECT * FROM lots WHERE id = ?", [
      params.id,
    ]);

    if (result.length === 0) {
      return NextResponse.json(
        { error: "Lote no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(result[0]);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const { id } = request.params; // Obtener el ID del parámetro de la solicitud
    const {
      lot_number,
      destination,
      conveyance,
      updated,
      status,
      create_date,
    } = await request.json();

    const result = await pool.query(
      "UPDATE lots SET lot_number = ?, destination = ?, conveyance = ?, updated = ?, status = ?, create_date = ? WHERE id = ?",
      [lot_number, destination, conveyance, updated, status, create_date, id]
    );

    // Comprobar si se actualizó correctamente el lote
    if (result.affectedRows === 0) {
      return NextResponse.json(
        { error: "No se pudo actualizar el lote" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Lote actualizado correctamente" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { id } = request.params; // Obtener el ID del parámetro de la solicitud
    const result = await pool.query("DELETE FROM lots WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { error: "No se pudo eliminar el lote" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Lote eliminado correctamente" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
