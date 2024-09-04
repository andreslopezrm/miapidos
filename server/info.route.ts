import { OpenAPIHono, createRoute, z } from '@hono/zod-openapi'

export const info = new OpenAPIHono()

info.openapi(
  createRoute({
    method: 'get',
    path: '/',
    responses: {
      200: {
        description: 'Respond a user',
        content: {
          'application/json': {
            schema: z.object({
              data: z.object({
                id: z.number(),
                name: z.string()
              })
            })
          }
        }
      }
    }
  }),
  (c) => {
    const data = {
        id: 1,
      name: 'kal'
    }
    return c.json({ data })
  }
)






