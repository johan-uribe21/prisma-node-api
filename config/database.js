const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function testDB() {
  try {
    await prisma.connect();
    console.log("DB Connection has been established successfully");
  } catch (e) {
    console.error("Unable to connect to database", e);
  }
}

testDB();

module.exports = prisma;
