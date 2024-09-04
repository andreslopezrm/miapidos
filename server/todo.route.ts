import { OpenAPIHono, createRoute, z } from '@hono/zod-openapi'
import { swaggerUI } from '@hono/swagger-ui'

export const todos = new OpenAPIHono()

todos.openapi(
  createRoute({
    method: 'get',
    path: '/',
    responses: {
      200: {
        description: 'Respond a todo',
        content: {
          'application/json': {
            schema: z.object({
              id: z.number(),
              title: z.string()
            })
          }
        }
      }
    }
  }),
  (c) => {
    return c.json({
        id: 1,
      title: 'titulo 1'
    })
  }
)






