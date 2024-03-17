import { Injectable } from '@nestjs/common'
import { PrismaRepository } from './prisma.repository'
import { PrismaService } from '../config/prisma/prisma.service'
import { User } from '@prisma/client'
import { UserRepositoryI } from '../../domain/repositories/userRepository.interface'

@Injectable()
export class DatabaseUserRepository extends PrismaRepository<'user'> implements UserRepositoryI {
  constructor(
    protected readonly prisma: PrismaService,
    private readonly userEntity: PrismaRepository<'user'>,
  ) {
    super(prisma)
  }
  async updateRefreshToken(username: string, refreshToken: string): Promise<void> {
    await this.userEntity.update({
      where: {
        username: username,
      },
      data: {
        hashRefreshToken: refreshToken,
      },
    })
  }
  async getUserByUsername(username: string): Promise<User | null> {
    const adminUserEntity = await this.userEntity.findFirst({
      where: {
        username: username,
      },
    })
    if (!adminUserEntity) {
      return null
    }
    return adminUserEntity
  }
  async updateLastLogin(username: string): Promise<void> {
    await this.userEntity.update({
      where: {
        username: username,
      },
      data: {
        lastLogin: new Date().toISOString(),
      },
    })
  }
  async register(): Promise<void> {
    console.log('Hello register')
  }
}
