import express, { Request, Response } from "express"
import { prisma } from "./db"

const app = express()

app.get("/", async (req: Request, res: Response) => {
  res.send("Hello world!")
})

app.get("/users", async (req: Request, res: Response) => {
  const users = await prisma.user.findMany({
    include: {
      articles: {
        include: {
          tags: true,
        },
      },
    },
  })

  res.send(users)
})

app.get("/posts/:tag", async (req: Request, res: Response) => {
  const { tag } = req.params

  try {
    const articles = await prisma.article.findMany({
      where: {
        tags: {
          some: {
            slug: tag,
          },
        },
      },
      include: {
        author: true,
        tags: true
      }
    })

    res.send(articles)
  } catch (e: any) {
    console.error(e.message)
    res.status(500).send(e.message)
  }
})

app.post("/user", async (req: Request, res: Response) => {
  const user = await prisma.user.create({
    data: {
      name: "jun",
      age: 32,
      isAdmin: true,
      email: "jun@gmail.com",
    },
  })

  res.send(user)
})

app.post("/tags", async (req: Request, res: Response) => {
  const user = await prisma.tag.create({
    data: {
      title: "Self improvement",
      slug: "self-improvement",
    },
  })

  res.send(user)
})

app.get("/posts", async (req: Request, res: Response) => {
  const articles = await prisma.article.findMany({
    include: {
      tags: true,
    },
  })

  res.send(articles)
})

app.post("/post", async (req: Request, res: Response) => {
  const article = await prisma.article.create({
    data: {
      title: "Amazing article content",
      authorId: 3,
      body: "Mazing article content",
      isPublish: false,
      tags: {
        connect: [{ id: 2 }, { id: 1 }],
      },
    },
  })

  res.send(article)
})

app.delete("/users", async (req: Request, res: Response) => {
  const users = await prisma.user.deleteMany()

  res.send(users)
})

app.delete("/posts", async (req: Request, res: Response) => {
  const articles = await prisma.user.delete({
    where: {
      id: 4,
    },
  })

  res.send(articles)
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
