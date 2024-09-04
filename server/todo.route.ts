import { OpenAPIHono, createRoute, z } from '@hono/zod-openapi'
import { HTTPException } from 'hono/http-exception'

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
    throw new HTTPException(401, { message: 'mi error personalizado' })
  }
)






