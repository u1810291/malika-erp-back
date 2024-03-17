import { DynamicModule, Module } from '@nestjs/common'
import { GetUserByUsername } from '../../usecases/user/GetUserByUsername.usecase'

import { ExceptionsModule } from '../exceptions/exceptions.module'
import { LoggerModule } from '../logger/logger.module'
import { LoggerService } from '../logger/logger.service'

import { BcryptModule } from '../services/bcrypt/bcrypt.module'
import { BcryptService } from '../services/bcrypt/bcrypt.service'
import { JwtModule } from '../services/jwt/jwt.module'
import { JwtTokenService } from '../services/jwt/jwt.service'
import { RepositoriesModule } from '../repositories/repositories.module'

import { DatabaseUserRepository } from '../repositories/user.repository'

import { EnvironmentConfigModule } from '../config/environment-config/environment-config.module'
import { EnvironmentConfigService } from '../config/environment-config/environment-config.service'
import { UseCaseProxy } from './usecases-proxy'
import { LoginUseCases } from '../../usecases/auth/login.usecases'
import { LogoutUseCases } from '../../usecases/auth/logout.usecases'
import { RegisterUseCases } from '../../usecases/auth/register.usecases'
import { IsAuthenticatedUseCases } from '../../usecases/auth/isAuthenticated.usecases'

@Module({
  imports: [LoggerModule, JwtModule, BcryptModule, EnvironmentConfigModule, RepositoriesModule, ExceptionsModule],
})
export class UseCasesProxyModule {
  // Auth
  static LOGIN_USECASES_PROXY = 'LoginUseCasesProxy'
  static IS_AUTHENTICATED_USECASES_PROXY = 'IsAuthenticatedUseCasesProxy'
  static LOGOUT_USECASES_PROXY = 'LogoutUseCasesProxy'
  static GET_USER_BY_USERNAME_USECASES_PROXY = 'GetUserByUsernameUseCasesProxy'
  static REGISTER_USECASES_PROXY = 'RegisterUseCasesProxy'

  static register(): DynamicModule {
    return {
      module: UseCasesProxyModule,
      providers: [
        {
          inject: [LoggerService, JwtTokenService, EnvironmentConfigService, DatabaseUserRepository, BcryptService],
          provide: UseCasesProxyModule.REGISTER_USECASES_PROXY,
          useFactory: () => new UseCaseProxy(new RegisterUseCases()),
        },
        {
          inject: [LoggerService, JwtTokenService, EnvironmentConfigService, DatabaseUserRepository, BcryptService],
          provide: UseCasesProxyModule.LOGIN_USECASES_PROXY,
          useFactory: (
            logger: LoggerService,
            jwtTokenService: JwtTokenService,
            config: EnvironmentConfigService,
            userRepo: DatabaseUserRepository,
            bcryptService: BcryptService,
          ) => new UseCaseProxy(new LoginUseCases(logger, jwtTokenService, config, userRepo, bcryptService)),
        },
        {
          inject: [DatabaseUserRepository],
          provide: UseCasesProxyModule.IS_AUTHENTICATED_USECASES_PROXY,
          useFactory: (userRepo: DatabaseUserRepository) => new UseCaseProxy(new IsAuthenticatedUseCases(userRepo)),
        },
        {
          inject: [],
          provide: UseCasesProxyModule.LOGOUT_USECASES_PROXY,
          useFactory: () => new UseCaseProxy(new LogoutUseCases()),
        },
        {
          inject: [LoggerService, DatabaseUserRepository],
          provide: UseCasesProxyModule.GET_USER_BY_USERNAME_USECASES_PROXY,
          useFactory: (logger: LoggerService, userRepository: DatabaseUserRepository) =>
            new UseCaseProxy(new GetUserByUsername(logger, userRepository)),
        },
      ],
      exports: [
        UseCasesProxyModule.LOGIN_USECASES_PROXY,
        UseCasesProxyModule.IS_AUTHENTICATED_USECASES_PROXY,
        UseCasesProxyModule.LOGOUT_USECASES_PROXY,
      ],
    }
  }
}
