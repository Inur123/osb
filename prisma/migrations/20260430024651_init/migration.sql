-- CreateTable
CREATE TABLE "periode" (
    "id" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "periode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pendaftar" (
    "id" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "organisasi" TEXT NOT NULL,
    "alamat" TEXT NOT NULL,
    "asal_pac" TEXT NOT NULL,
    "minat_bakat" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "periodeId" TEXT NOT NULL,

    CONSTRAINT "pendaftar_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'admin',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "pendaftar" ADD CONSTRAINT "pendaftar_periodeId_fkey" FOREIGN KEY ("periodeId") REFERENCES "periode"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
