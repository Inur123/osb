import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import ExcelJS from "exceljs";

export async function GET() {
  try {
    // 1. Fetch all data
    const pendaftar = await prisma.pendaftar.findMany({
      include: {
        periode: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // 2. Create workbook and worksheet
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Data Pendaftar OSB");

    // 3. Define columns
    worksheet.columns = [
      { header: "NO", key: "no", width: 5 },
      { header: "NAMA LENGKAP", key: "nama", width: 30 },
      { header: "ORGANISASI", key: "organisasi", width: 15 },
      { header: "PAC", key: "pac", width: 25 },
      { header: "ALAMAT LENGKAP", key: "alamat", width: 40 },
      { header: "MINAT & BAKAT", key: "minat", width: 35 },
      { header: "PERIODE", key: "periode", width: 20 },
      { header: "TANGGAL DAFTAR", key: "tanggal", width: 20 },
    ];

    // 4. Style the header
    worksheet.getRow(1).font = { bold: true, color: { argb: "FFFFFFFF" } };
    worksheet.getRow(1).fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FF16A34A" }, // Green-600 color
    };
    worksheet.getRow(1).alignment = { vertical: "middle", horizontal: "center" };

    // 5. Add data rows
    pendaftar.forEach((p, index) => {
      worksheet.addRow({
        no: index + 1,
        nama: p.nama.toUpperCase(),
        organisasi: p.organisasi,
        pac: p.asal_pac.toUpperCase(),
        alamat: p.alamat,
        minat: p.minat_bakat.join(", "),
        periode: p.periode.nama,
        tanggal: new Date(p.createdAt).toLocaleDateString("id-ID", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        }),
      });
    });

    // 6. Add some basic borders and alignment to all cells
    worksheet.eachRow((row, rowNumber) => {
      row.eachCell((cell) => {
        cell.border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
        if (rowNumber > 1) {
          cell.alignment = { vertical: "middle", horizontal: "left" };
        }
      });
    });

    // 7. Generate buffer
    const buffer = await workbook.xlsx.writeBuffer();

    // 8. Return response with correct headers for download
    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": 'attachment; filename="Data_Pendaftar_OSB.xlsx"',
      },
    });
  } catch (error) {
    console.error("Export Error:", error);
    return NextResponse.json({ error: "Gagal mengeksport data" }, { status: 500 });
  }
}
