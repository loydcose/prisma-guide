import express, { Request, Response } from "express"
import { prisma } from "./db"

const app = express()


app.get("/", async (req: Request, res: Response) => {
  const users = await prisma.user.findMany()
  // const users: any[] = []


  res.send(users)
})


const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
