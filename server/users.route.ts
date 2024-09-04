import { OpenAPIHono, createRoute, z } from "@hono/zod-openapi";
import { db } from './db.js'

export const users = new OpenAPIHono();

users.openapi(
	createRoute({
		method: "get",
		path: "/",
		responses: {
			200: {
				description: "Respond a user",
				content: {
					"application/json": {
						schema: z.object({
							id: z.number(),
							name: z.string(),
						}),
					},
				},
			},
		},
	}),
	async (c) => {
		const user = await db.query.users.findFirst()

		return c.json({
			id: user?.id ?? 1,
			name: user?.name ?? 'default',
		});
	},
);
