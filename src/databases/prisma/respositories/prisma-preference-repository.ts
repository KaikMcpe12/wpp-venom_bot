import { PrismaClient } from '@prisma/client'
import { Preference } from '../../../entities/preference/preference'
import { PreferenceRepository } from '../../repositories/preferenceRepository'
import { PrismaPreferenceMapper } from '../mappers/prisma-preference-mapper'

export class PrismaPreferenceRepository implements PreferenceRepository {
  constructor(private prisma: PrismaClient) {}

  async findById(id: string): Promise<Preference | null> {
    const preference = await this.prisma.preference.findUnique({
      where: { id },
    })

    if (!preference) {
      return null
    }

    return PrismaPreferenceMapper.toDomain(preference)
  }

  async listAll(contactId: string): Promise<Preference[]> {
    const preferences = await this.prisma.preference.findMany({
      where: { contactId },
    })

    return preferences.map(PrismaPreferenceMapper.toDomain)
  }

  async create(preference: Preference): Promise<Preference | null> {
    const raw = PrismaPreferenceMapper.toPrisma(preference)

    const response = await this.prisma.preference.create({
      data: raw,
    })

    return PrismaPreferenceMapper.toDomain(response)
  }

  async save(preference: Preference): Promise<void> {
    const raw = PrismaPreferenceMapper.toPrisma(preference)

    await this.prisma.preference.update({
      where: {
        id: raw.id,
      },
      data: raw,
    })
  }
}
