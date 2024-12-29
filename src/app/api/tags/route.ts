import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid"; // Pastikan Anda menginstal ini: npm install uuid

// Fungsi untuk menghasilkan warna acak
const generateRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

// Handler untuk GET request
export async function GET() {
  try {
    const tags = await prisma.tag.findMany({
      include: {
        entities: true, // Menyertakan entitas terkait
      },
    });
    return NextResponse.json(tags);
  } catch (error) {
    console.error("Error fetching tags:", error);
    return NextResponse.json({ error: "Failed to fetch tags" }, { status: 500 });
  }
}

// Handler untuk POST request
export async function POST(req: Request) {
  try {
    const { name, entityId, tagId } = await req.json();

    // Validasi input
    if (!name || !entityId) {
      return NextResponse.json({ error: "Name and Entity ID are required" }, { status: 400 });
    }

    // Generate warna acak jika tag baru dibuat
    const color = generateRandomColor();

    // Upsert untuk membuat atau memperbarui tag
    const tag = await prisma.tag.upsert({
      where: { id: tagId || uuidv4() },
      create: { id: uuidv4(), name, color },
      update: { name, color },
    });

    // Hubungkan tag ke entity
    await prisma.entity.update({
      where: { id: entityId },
      data: {
        tags: {
          connect: { id: tag.id },
        },
      },
    });

    return NextResponse.json(tag, { status: 201 });
  } catch (error) {
    console.error("Error handling POST request:", error);
    return NextResponse.json({ error: "Failed to create or update tag" }, { status: 500 });
  }
}

// Handler untuk DELETE request
export async function DELETE(req: Request) {
  try {
    const { tagId, entityId } = await req.json();

    // Validasi input
    if (!tagId || !entityId) {
      return NextResponse.json({ error: "Tag ID and Entity ID are required" }, { status: 400 });
    }

    // Hapus hubungan antara tag dan entity
    await prisma.entity.update({
      where: { id: entityId },
      data: {
        tags: {
          disconnect: { id: tagId },
        },
      },
    });

    return NextResponse.json({ message: "Tag removed successfully" });
  } catch (error) {
    console.error("Error removing tag:", error);
    return NextResponse.json({ error: "Failed to remove tag" }, { status: 500 });
  }
}
