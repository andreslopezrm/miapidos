import { OpenAPIHono, createRoute, z } from '@hono/zod-openapi'
import { swaggerUI } from '@hono/swagger-ui'
import { handle } from 'hono/vercel'
import { sign } from 'hono/jwt'
import { users } from '../server/users.route.js'
import { info } from '../server/info.route.js'

const app = new OpenAPIHono().basePath('/api')

app.openapi(
  createRoute({
    method: 'get',
    path: '/hello',
    responses: {
      200: {
        description: 'Respond a message',
        content: {
          'application/json': {
            schema: z.object({
              message: z.string()
            })
          }
        }
      }
    }
  }),
  (c) => {
    return c.json({
      message: 'hello'
    })
  }
)


app.openapi(
  createRoute({
    method: 'get',
    path: '/',
    responses: {
      200: {
        description: 'Respond a message',
        content: {
          'application/json': {
            schema: z.object({
              status: z.number(),
              message: z.string(),
            })
          }
        }
      }
    }
  }),
  (c) => {
    return c.json({
      status: 200,
      message: 'segundo'
    })
  }
)


app.openapi(
  createRoute({
    method: 'get',
    path: '/decode',
    responses: {
      200: {
        description: 'Respond a message',
        content: {
          'application/json': {
            schema: z.object({
              status: z.number(),
              token: z.string(),
            })
          }
        }
      }
    }
  }),
  async (c) => {
    const payload = {
      sub: 'user123',
      role: 'admin',
      exp: Math.floor(Date.now() / 1000) + 60 * 5, // Token expires in 5 minutes
    }
    const secret = 'mySecretKey'
    const token = await sign(payload, secret)

    return c.json({
      status: 200,
      token
    })
  }
)


app.openapi(
  createRoute({
    method: 'get',
    path: '/fail',
    responses: {
      200: {
        description: 'Respond a message',
        content: {
          'application/json': {
            schema: z.object({
              status: z.number(),
              message: z.string(),
            })
          }
        }
      }
    }
  }),
  (c) => {
    return c.json({
      status: 200,
      message: 'fail'
    })
  }
)

app.route('/users', users)
app.route('/info', info)



app.get(
  '/sw',
  swaggerUI({
    url: '/api/doc'
  })
)

app.doc('/doc', {
  info: {
    title: 'An API',
    version: 'v1'
  },
  openapi: '3.1.0'
})

const handler = handle(app);

export const GET = handler;
export const POST = handler;
export const PATCH = handler;
export const PUT = handler;
export const OPTIONS = handler;