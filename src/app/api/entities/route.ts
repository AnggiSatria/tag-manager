import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET request untuk mendapatkan entities
export async function GET() {
  try {
    const entities = await prisma.entity.findMany({
      include: {
        tags: true, // Menyertakan tag terkait
      },
    });
    return NextResponse.json(entities);
  } catch (error) {
    console.error("Error fetching entities:", error);
    return NextResponse.json({ error: "Failed to fetch entities" }, { status: 500 });
  }
}

// POST request untuk membuat entity baru
export async function POST(req: Request) {
  try {
    const { name } = await req.json();

    if (!name) {
      return NextResponse.json({ error: "Entity name is required" }, { status: 400 });
    }

    const entity = await prisma.entity.create({
      data: { name },
    });

    return NextResponse.json(entity, { status: 201 });
  } catch (error) {
    console.error("Error creating entity:", error);
    return NextResponse.json({ error: "Failed to create entity" }, { status: 500 });
  }
}

