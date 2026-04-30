import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";
import * as bcrypt from "bcryptjs";

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new pg.Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const email = "osbpelajarnumagetan@gmail.com";
  const password = "osbjayajayajaya";
  const hashedPassword = await bcrypt.hash(password, 10);

  // Buat User Admin jika belum ada
  const admin = await prisma.user.upsert({
    where: { email: email },
    update: {
      password: hashedPassword,
    },
    create: {
      email: email,
      name: "Admin OSB",
      password: hashedPassword,
      role: "admin",
    },
  });

  console.log("✅ Admin user created/updated:", admin.email);

  // Buat Periode Awal agar form bisa langsung dipakai
  const periode = await prisma.periode.upsert({
    where: { id: "p2025" },
    update: {},
    create: {
      id: "p2025",
      nama: "Periode 2025",
      isActive: true,
    },
  });

  console.log("✅ Default active period created:", periode.nama);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
