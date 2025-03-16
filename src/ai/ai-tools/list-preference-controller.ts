import { PrismaContactRepository } from '../../databases/prisma/respositories/prisma-contact-respository'
import { prismaClient } from '../../lib/prisma'
import { PrismaPreferenceRepository } from '../../databases/prisma/respositories/prisma-preference-repository'
import {
  AiPreferenceMapper,
  RawPreference,
} from '../mappers/ai-preference-mapper'
import { ListPreference } from '../../use-cases/ai/preference/list-preference-usercase'

interface IRequestPreference {
  phoneNumber: string
}

export async function listPreferenceTool(
  requestUser: IRequestPreference,
): Promise<RawPreference[]> {
  const prismaContactRepository = new PrismaContactRepository(prismaClient)
  const prismaPreferenceRepository = new PrismaPreferenceRepository(
    prismaClient,
  )

  const listPreference = new ListPreference(
    prismaPreferenceRepository,
    prismaContactRepository,
  )

  const preferences = await listPreference.execute(requestUser)

  if (!preferences) {
    return []
  }

  return preferences.map((preference) => AiPreferenceMapper.toRaw(preference))
}
