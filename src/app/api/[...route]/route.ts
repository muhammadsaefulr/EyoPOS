import server from "@/server"
import { handle } from "hono/vercel";

export const runtime = "edge"

const handler = handle(server)

export {
    handler as GET,
    handler as POST,
    handler as PUT,
    handler as DELETE,
}