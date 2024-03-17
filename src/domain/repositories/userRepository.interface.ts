import { User } from '@prisma/client'
import { PrismaRepositoryI } from './prismaRepository.interface'

export interface UserRepositoryI extends PrismaRepositoryI<'user'> {
  getUserByUsername(username: string): Promise<User>
  updateLastLogin(username: string): Promise<void>
  updateRefreshToken(username: string, refreshToken: string): Promise<void>
  register(user: User): Promise<void>
}
