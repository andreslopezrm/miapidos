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
    const id = 1 / 0;
    return c.json({
        id: id,
      title: 'titulo 1'
    })
  }
)






