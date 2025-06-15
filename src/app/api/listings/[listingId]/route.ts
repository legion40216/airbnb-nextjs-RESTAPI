
export async function DELETE(request, { params }) {
  try {
    // Authenticate user
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" }, 
        { status: 401 }
      );
    }

    // 2. Parameter validation
    const { storeId, cutId } = params;
    if (!storeId || !cutId) {
      return NextResponse.json(
        { error: "Store ID and Cut ID are required" },
        { status: 400 }
      );
    }

   // 3. Verify store ownership
   const store = await prisma.store.findUnique({
    where: {
      id: storeId,
      userId,
    },
  });
  if (!store) {
    return NextResponse.json(
      { error: "Store not found" }, 
      { status: 404 }
  );
  }

  // Delete the cut
  const cut = await prisma.cut.delete({
    where: { 
      id: cutId,
      storeId: store.id 
    },
  });

    return NextResponse.json(
      { success: true, cut }, 
      { status: 200 }
    );
    
  } catch (error) {
    console.error('[cut_DELETE]', error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        return NextResponse.json(
          { error: "Cut not found within this store." },
          { status: 404 }
        );
      }
    }
    
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
