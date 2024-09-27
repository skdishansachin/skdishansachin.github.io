import { useTurso } from "../../../../utils/turso"

export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, "id")
    const turso = useTurso()

    if (!id) {
        throw createError({
            statusCode: 404,
            statusMessage: `Page not found: ${event.node.req.url}`,
        })
    }

    const { rows } = await turso.execute({
        sql: "SELECT * FROM newsletters WHERE id = :id",
        args: { id: id },
    })

    if (rows.length === 0) {
        throw createError({
            statusCode: 404,
            statusMessage: `No subscriber found: ${id}`,
        })
    }

    await turso.execute({
        sql: "DELETE FROM newsletters WHERE id = :id",
        args: { id: id },
    })

    setResponseStatus(event, 2040)
    return {
        message: "You have successfully unsubscribed from the newsletter.",
    }
})
