import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// Get all TagResults
export async function GET() {
  try {
    const tagResults = await prisma.tagResult.findMany({
      include: {
        tag: true,  // Optional, if you want to include tag data with each result
      },
      orderBy: {
        createdAt: 'desc', // You can adjust sorting if necessary
      },
    });

    return NextResponse.json(tagResults);
  } catch (error) {
    console.error("Error fetching tag results:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// POST to create a new TagResult
export async function POST(req: Request) {
  try {
    const { tag_id, result } = await req.json();

    if (!tag_id || !result) {
      return NextResponse.json({ error: "Tag ID and result are required" }, { status: 400 });
    }

    const tagResult = await prisma.tagResult.create({
      data: { 
        tag_id, 
        result 
      },
    });

    return NextResponse.json(tagResult, { status: 201 });
  } catch (error) {
    console.error("Error creating tag result:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
