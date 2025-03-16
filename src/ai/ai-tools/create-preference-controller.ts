import { PrismaContactRepository } from '../../databases/prisma/respositories/prisma-contact-respository'
import { prismaClient } from '../../lib/prisma'
import { CreatePreference } from '../../use-cases/ai/preference/create-preference-usecase'
import { PrismaPreferenceRepository } from '../../databases/prisma/respositories/prisma-preference-repository'
import {
  AiPreferenceMapper,
  RawPreference,
} from '../mappers/ai-preference-mapper'

interface IRequestPreference {
  phoneNumber: string
  content: string
}

export async function createPreferenceTool(
  requestUser: IRequestPreference,
): Promise<RawPreference> {
  const prismaContactRepository = new PrismaContactRepository(prismaClient)
  const prismaPreferenceRepository = new PrismaPreferenceRepository(
    prismaClient,
  )

  const createPreference = new CreatePreference(
    prismaPreferenceRepository,
    prismaContactRepository,
  )

  const contact = await createPreference.execute(requestUser)

  return AiPreferenceMapper.toRaw(contact)
}
