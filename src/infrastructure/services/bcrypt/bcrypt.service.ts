import { Injectable } from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import { IBcryptService } from '../../../domain/adapters/bcrypt.interface'

@Injectable()
export class BcryptService implements IBcryptService {
  rounds: number = 10

  async hash(hashString: string): Promise<string> {
    return await bcrypt.hash(hashString, this.rounds)
  }

  async compare(password: string, hashPassword: string): Promise<boolean> {
    const result = await bcrypt.compare(password, hashPassword)
    const hashed = await this.hash(password)
    console.log(password, hashPassword, result, hashed)
    return result
  }
}
