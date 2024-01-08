import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

async function main() {
  // create user
  // const res = await prisma.user.create({
  //   data: {
  //     name: "loyd",
  //     email: "loyd@gmail.com",
  //   }
  // })

  // get all users
  // const res = await prisma.user.findMany()

  // create article with relation to user
  // const res = await prisma.article.create({
  //   data: {
  //     title: "Hello world",
  //     body: "Hello world content",
  //     author: {
  //       connect: {
  //         id: 1,
  //       },
  //     },
  //   },
  // })

  // create article with relation to user in one command
  // const res = await prisma.user.create({
  //   data: {
  //     name: "sarah",
  //     email: "sarah.com",
  //     articles: {
  //       create: {
  //         title: "My first blog",
  //         body: "This is my first blog",
  //       },
  //     },
  //   },
  // })

  // populate user's article
  // const res = await prisma.user.findMany({
  //   include: {
  //     articles: true
  //   }
  // })

  // update user
  // const res = await prisma.user.update({
  //   where: {
  //     id: 1,
  //   },
  //   data: {
  //     name: "loyd jr.",
  //   },
  // })

  // delete user
  const res = await prisma.user.delete({
    where: {
      id: 1,
    },
  })

  console.log(res)

  // experiment more
}

main()
  .then(async () => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
