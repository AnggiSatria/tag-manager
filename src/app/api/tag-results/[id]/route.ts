import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// PATCH to update TagResult by ID
export async function PATCH(req: Request) {
  const id = req.url.split("/").pop();  // Get ID from params
  if (!id) {
    return NextResponse.json({ error: "TagResult ID is required" }, { status: 400 });
  }

  try {
    const { result } = await req.json();  // Get updated result from the request body

    // Find the TagResult to update
    const tagResult = await prisma.tagResult.findUnique({
      where: { id },
    });

    if (!tagResult) {
      return NextResponse.json({ error: "TagResult not found" }, { status: 404 });
    }

    const updatedTagResult = await prisma.tagResult.update({
      where: { id },
      data: {
        result: result || tagResult.result,  // Only update result if provided
      },
    });

    return NextResponse.json(updatedTagResult);
  } catch (error) {
    console.error("Error updating tag result:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// DELETE TagResult by ID
export async function DELETE(req: Request) {
  const id = req.url.split("/").pop();  // Get ID from params
  if (!id) {
    return NextResponse.json({ error: "TagResult ID is required" }, { status: 400 });
  }

  try {
    // Find and delete the TagResult by ID
    const tagResult = await prisma.tagResult.delete({
      where: { id },
    });

    return NextResponse.json({ message: "TagResult deleted successfully", tagResult });
  } catch (error) {
    console.error("Error deleting tag result:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
