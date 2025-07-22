import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const create = await prisma.categoria.create({
    data: {
      nome: "Eletronicos",
      subcategorias: {
        create: [
          { nome: "Tablet" },
          { nome: "Notebook" },
          { nome: "Celular" },
          { nome: "Smartwatch" },
          { nome: "Desktop" },
          { nome: "Impressora" },
        ],
      },
    },
  });

  const update = await prisma.categoria.update({
    where: {
      id: 1,
    },
    data: {
      nome: "Dispositivos",
    },
  });

  const remove = await prisma.subcategoria.delete({
    where: {
      id: 2,
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.log(e);
    await prisma.$disconnect();
    process.exit(1);
  });
