import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET request untuk mendapatkan entity berdasarkan ID
export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json({ error: "Entity ID is required" }, { status: 400 });
    }

    // Mengambil entity berdasarkan ID
    const entity = await prisma.entity.findUnique({
      where: { id },
      include: {
        tags: true, // Menyertakan tag terkait
      },
    });

    if (!entity) {
      return NextResponse.json({ error: "Entity not found" }, { status: 404 });
    }

    return NextResponse.json(entity);
  } catch (error) {
    console.error("Error fetching entity by ID:", error);
    return NextResponse.json({ error: "Failed to fetch entity by ID" }, { status: 500 });
  }
}

// PUT request untuk memperbarui entity
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const { name } = await req.json();

    if (!name || !params.id) {
      return NextResponse.json({ error: "Entity ID and Name are required" }, { status: 400 });
    }

    const updatedEntity = await prisma.entity.update({
      where: { id: params.id },
      data: { name },
    });

    return NextResponse.json(updatedEntity);
  } catch (error) {
    console.error("Error updating entity:", error);
    return NextResponse.json({ error: "Failed to update entity" }, { status: 500 });
  }
}

// DELETE request untuk menghapus entity
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    if (!params.id) {
      return NextResponse.json({ error: "Entity ID is required" }, { status: 400 });
    }

    await prisma.entity.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: "Entity deleted successfully" });
  } catch (error) {
    console.error("Error deleting entity:", error);
    return NextResponse.json({ error: "Failed to delete entity" }, { status: 500 });
  }
}
