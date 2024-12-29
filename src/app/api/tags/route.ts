import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

// Fungsi untuk menghasilkan warna acak
const generateRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

// Handler untuk GET dan POST
export async function handler(req: Request) {
  const method = req.method;
  const url = new URL(req.url);

  try {
    if (method === "GET") {
      const status = url.searchParams.get("status");

      if (!status) {
        const allTags = await prisma.tag.findMany({
          orderBy: { createdAt: "desc" },
        });
        return NextResponse.json(allTags);
      }

      if (status === "suggestions") {
        const suggestions = await prisma.tag.findMany({
          where: { status: "suggestions" },
          orderBy: { createdAt: "desc" },
          take: 10,
        });
        return NextResponse.json(suggestions);
      }

      if (status === "entities") {
        const entities = await prisma.tag.findMany({
          where: { status: "entities" },
          orderBy: { createdAt: "desc" },
        });
        return NextResponse.json(entities);
      }

      return NextResponse.json({ error: "Invalid status parameter" }, { status: 400 });
    }

    if (method === "POST") {
      const { name, status } = await req.json();

      if (!name || !status) {
        return NextResponse.json({ error: "Name and status are required" }, { status: 400 });
      }

      const color = generateRandomColor();

      const tag = await prisma.tag.create({
        data: { id: uuidv4(), name, color, status },
      });

      return NextResponse.json(tag, { status: 201 });
    }

    return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
  } catch (error) {
    console.error("Error handling tags:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export { handler as GET, handler as POST };
