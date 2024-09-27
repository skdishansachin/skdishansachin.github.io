import { z } from "zod"
import { useTurso } from "../../../utils/turso"
import { nanoid } from "nanoid"

const requestSchema = z.object({
    email: z.string().email(),
})

export default defineEventHandler(async (event) => {
    const turso = useTurso()
    const body = await readValidatedBody(event, (body) =>
        requestSchema.safeParse(body)
    )

    if (!body.success) {
        throw createError({
            statusCode: 422,
            statusMessage: "Please provide a valid email address.",
        })
    }

    const { rows } = await turso.execute({
        sql: "SELECT * FROM newsletters WHERE email = :email",
        args: { email: body.data.email },
    })

    if (rows.length > 0) {
        throw createError({
            statusCode: 409,
            statusMessage: "The email address is already subscribed.",
        })
    }

    await turso.execute({
        sql: "INSERT INTO newsletters (id, email) VALUES (:id, :email)",
        args: { id: nanoid(), email: body.data.email },
    })

    setResponseStatus(event, 201)
    return {
        message: "Thank you for subscribing!",
    }
})
