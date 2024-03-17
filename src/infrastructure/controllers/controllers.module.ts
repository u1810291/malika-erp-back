import { Module } from '@nestjs/common'
import { UseCasesProxyModule } from '../usecases-proxy/usecases-proxy.module'
import { AuthController } from './auth/auth.controller'

@Module({
  imports: [UseCasesProxyModule.register()],
  controllers: [AuthController],
})
export class ControllersModule {}
