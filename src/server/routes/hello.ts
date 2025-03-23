import { Hono } from "hono";

const app = new Hono().get('/hello', (c) => c.json({message: "hello this is example of hono in nextjs app"}))

export default app