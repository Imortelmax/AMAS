import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";
import "dotenv/config";

const adapter = new PrismaPg({ connectionString: process.env.DIRECT_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🚀 Tentative de création de l'admin...");
  
  const hashedPassword = await bcrypt.hash("admin123", 10);
  
  const admin = await prisma.admin.upsert({
    where: { email: "gauthier.watelain@hotmail.fr" },
    update: { password: hashedPassword },
    create: {
      email: "gauthier.watelain@hotmail.fr",
      password: hashedPassword,
    },
  });

  console.log("✅ Admin configuré :", admin.email);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("❌ Erreur lors du seed :", e);
    await prisma.$disconnect();
    process.exit(1);
  });