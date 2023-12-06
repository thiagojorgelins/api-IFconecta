import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/entities/user.entity';
import { UserPayload } from './models/UserPayload';
import { JwtService } from '@nestjs/jwt';
import { UserToken } from './models/UserToken';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ){}

  login(user: User): UserToken {
    const payload: UserPayload= {
      sub: user.id,
      email: user.email,
      name: user.name
    }

    const jwtToken = this.jwtService.sign(payload)

    return {
      token: jwtToken
    }
  }

  async validateUser(email: string, password: string) {
    const user = await this.userService.getUserByEmail(email)

    if (user){
      const isPasswordValid = await bcrypt.compare(password, user.password)
    
      if (isPasswordValid){
        return {
          ...user,
          password: undefined
        }
      }
    }
    throw new Error('Email ou senha estão incorretos!')
  }
}
