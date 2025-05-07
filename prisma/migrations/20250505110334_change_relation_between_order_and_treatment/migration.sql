-- DropForeignKey
ALTER TABLE "Treatment" DROP CONSTRAINT "Treatment_orderId_fkey";

-- CreateTable
CREATE TABLE "_OrderToTreatment" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_OrderToTreatment_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_OrderToTreatment_B_index" ON "_OrderToTreatment"("B");

-- AddForeignKey
ALTER TABLE "_OrderToTreatment" ADD CONSTRAINT "_OrderToTreatment_A_fkey" FOREIGN KEY ("A") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrderToTreatment" ADD CONSTRAINT "_OrderToTreatment_B_fkey" FOREIGN KEY ("B") REFERENCES "Treatment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
