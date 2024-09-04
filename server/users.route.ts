import { OpenAPIHono, createRoute, z } from '@hono/zod-openapi'

export const users = new OpenAPIHono()

users.openapi(
  createRoute({
    method: 'get',
    path: '/',
    responses: {
      200: {
        description: 'Respond a user',
        content: {
          'application/json': {
            schema: z.object({
              id: z.number(),
              name: z.string()
            })
          }
        }
      }
    }
  }),
  (c) => {
    return c.json({
        id: 1,
      name: 'kal'
    })
  }
)






