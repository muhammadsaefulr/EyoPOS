import { handleError } from './ErrorHandler'
import { Hono } from 'hono'
import helloRoute from './routes/hello'
const app = new Hono().basePath('/api')

app.onError(handleError)

const routes = app
  .route('/', helloRoute)

export default app

export type AppType = typeof routes