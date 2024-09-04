import { OpenAPIHono, createRoute, z } from '@hono/zod-openapi'
import { HTTPException } from 'hono/http-exception'

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
                name: z.string(),
              })
            })
          }
        }
      },
    }
  }),
  (c) => {

    throw new HTTPException(401, { message: 'Exception', cause: 'Valor excedido' })
    
    const data = {
        id: 1,
      name: 'kal',
    }

    return c.json({ data })
  }
)






