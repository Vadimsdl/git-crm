import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { ...result } = user.toObject();
      return result;
    }
    return null;
  }

  async login(email: string): Promise<{ access_token: string } | null> {
    const user = await this.userService.findByEmail(email);
    if (user) {
      const payload = {
        email: user.email,
        userId: (user._id as string).toString(),
      };
      return {
        access_token: this.jwtService.sign(payload),
      };
    }
    return null;
  }

  async register(email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.userService.create({
      email,
      password: hashedPassword,
    });
    return this.login(user.email);
  }

  verifyToken(token: string) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return this.jwtService.verify(token);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new UnauthorizedException('Недействительный токен');
    }
  }
}
