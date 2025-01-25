import { User as RawUser } from '@prisma/client';
import { User } from '../../../entities/user/user';

export class PrismaNotificationMapper {
  static toPrisma(user: User) {
    return {
      id: user.id,
      recipientId: user.name,
      phoneNumber: user.phoneNumber,
      category: user.botstatus,
      content: user.createdAt,
    };
  }

  static toDomain(raw: RawUser): User {
    return new User(
      {
        category: raw.category,
        recipientId: raw.recipientId,
        readAt: raw.readAt,
        canceledAt: raw.canceledAt,
        createdAt: raw.createdAt,
      },
      raw.id,
    );
  }
}
