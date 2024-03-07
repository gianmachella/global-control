import { pool } from "@/libs/mysql";

export async function savePDFToDatabase(pdfData) {
  try {
    const [result] = await pool.query("INSERT INTO pdfs (data) VALUES (?)", [
      pdfData,
    ]);

    return result.insertId;
  } catch (error) {
    throw new Error("Error al guardar el PDF en la base de datos");
  }
}
