import { ZodError } from 'zod'

interface ErrorStatusMapping {
  [key: string]: number
}

export const errorStatusMap: ErrorStatusMapping = {
  ZodError: 400,
  ResourceNotFoundError: 404,
  ContactAlredyExistsError: 409,
  MessageNotSentError: 422,
  WppNotInicializedError: 428,
}

export function handleApplicationError(error: Error, reply: any) {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error', issues: error.format() })
  }

  const errorType = error.constructor.name
  const statusCode = errorStatusMap[errorType]

  if (statusCode) {
    return reply.status(statusCode).send({ message: error.message })
  }

  return null
}
