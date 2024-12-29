import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// Handler untuk PATCH dan DELETE
export async function handler(req: Request) {
  const method = req.method;
  const url = new URL(req.url);
  const id = url.pathname.split("/").pop(); // Ambil ID dari URL path

  try {
    if (method === "PATCH") {
      if (!id) {
        return NextResponse.json({ error: "Tag ID is required" }, { status: 400 });
      }

      const { name, status } = await req.json();

      const tag = await prisma.tag.findUnique({
        where: { id },
      });

      if (!tag) {
        return NextResponse.json({ error: "Tag not found" }, { status: 404 });
      }

      const updatedTag = await prisma.tag.update({
        where: { id },
        data: {
          name: name || tag.name,
          status: status || tag.status,
          color: tag.color, // Tidak perlu mengubah warna
          updatedAt: new Date(),
        },
      });

      return NextResponse.json(updatedTag, { status: 200 });
    }

    if (method === "DELETE") {
      if (!id) {
        return NextResponse.json({ error: "Tag ID is required" }, { status: 400 });
      }

      const tag = await prisma.tag.delete({
        where: { id },
      });

      return NextResponse.json({ message: "Tag deleted successfully", tag });
    }

    return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
  } catch (error) {
    console.error("Error handling tags:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export { handler as PATCH, handler as DELETE };
