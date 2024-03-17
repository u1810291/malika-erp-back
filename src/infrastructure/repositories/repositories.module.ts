import { Module } from '@nestjs/common'
import { DatabaseUserRepository } from './user.repository'
import { PrismaModule } from '../config/prisma/prisma.module'
import { PrismaRepository } from './prisma.repository'

@Module({
  imports: [PrismaModule],
  providers: [DatabaseUserRepository, PrismaRepository],
  exports: [DatabaseUserRepository, PrismaRepository],
})
export class RepositoriesModule {}
