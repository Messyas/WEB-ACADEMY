import { PrismaClient}  from "@prisma/client";
import { UserTypes } from "../src/resources/userType/userType.constants";

const prisma = new PrismaClient();

async function seed() {
  await prisma.userType.createMany({
    data: [
      { label: "admin", id: UserTypes.admin },
      { label: "client", id: UserTypes.client },
    ],
    skipDuplicates: true,
  });
}

seed()
  .then(() => {
    console.log("seeds geradas");
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
