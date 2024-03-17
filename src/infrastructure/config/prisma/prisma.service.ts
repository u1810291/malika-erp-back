import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor(configService: ConfigService) {
    const dbConfig = configService.get<{ url: string }>('database')
    super({
      datasources: {
        db: {
          url: dbConfig.url,
        },
      },
    })
  }

  async onModuleInit() {
    await this.$connect()
  }

  async onModuleDestroy() {
    await this.$disconnect()
  }

  async enableShutdownHooks() {
    process.on('beforeExit', async () => {
      await this.$disconnect()
      console.log('Disconnected from database')
    })
  }
}
