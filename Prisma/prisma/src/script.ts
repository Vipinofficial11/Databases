import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

/*
 Main Function to run the Queries.
*/
async function main() {
  updateData();
}

/*
 Query data in User Table.
*/
const findUser = async () => {
  const user = await prisma.user.findUnique({
    where: {
      age_name: {
        name: "Vipin",
        age: 23,
      },
    },
  });

  console.log("Found User : ", JSON.stringify(user));
};

/*
 Create data in User Table.
*/
const createData = async () => {
  const user = await prisma.user.create({
    data: {
      name: "Ravi",
      age: 21,
      email: "ravi@gmail.com",
      userPreference: {
        create: {
          email: true,
        },
      },
    },
    include: {
      userPreference: true,
    },
  });

  console.log("USER - " + JSON.stringify(user));
};

/*
 Delete data from User Table.
*/
const deleteData = async () => {
  const users = await prisma.user.deleteMany();
  console.log("No of Deleted Users : ", JSON.stringify(users));
};

/*
 Fetch data from User Table.
*/
const fetchAllUsers = async () => {
  const users = await prisma.user.findMany();
  console.log("All Users", JSON.stringify(users));
};

/*
 Update data.
*/
const updateData = async () => {
  const updatedUser = await prisma.user.update({
    data: {
      email: "Vipinbhatt@gmail.com",
    },
    where: {
      email: "vipinbhatt@cool.com",
    },
  });

  console.log("Updates User : ", updatedUser);
};

main()
  .catch((error) => {
    console.error(error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
