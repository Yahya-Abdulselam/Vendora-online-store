import prisma from "@/repos/prisma";
export async function get(id) {
    try {
        return await prisma.cart.findUnique({
            where: { buyerId: id },
          });
      } catch (e) {
        return {
          error: {
            message: e.message,
            status: 500,
          },
        };
      }
}