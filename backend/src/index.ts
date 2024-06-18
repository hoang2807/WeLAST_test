import express, { Request, Response } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

import * as data from './data.json'

dotenv.config()

const app = express()
const port = process.env.PORT || 5000

interface ApiResponse {
  fork: boolean
  forks: number
}

app.use(cors())
app.get('/repos', async (req: Request, res: Response) => {
  try {
    // Rate limit
    // const response = await fetch('https://api.github.com/users/freeCodeCamp/repos')

    //  if (!response.ok) {
    //   throw new Error(`API request failed with status: ${response.status}`);
    // }

    // const data = await response.json()
    const filter = data.data.filter((f: ApiResponse) => f.fork === false && f.forks > 5)
    res.status(200).json({ repositories: filter })
  } catch (error) {
    console.error(error)
  }
})

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})
