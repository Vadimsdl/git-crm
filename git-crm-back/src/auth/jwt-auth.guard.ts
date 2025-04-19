import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor() {
    super();
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    try {
      const authHeader = request.headers.authorization;
      if (!authHeader) {
        throw new UnauthorizedException('Отсутствует токен авторизации');
      }

      const [type, token] = authHeader.split(' ');
      if (type !== 'Bearer' || !token) {
        throw new UnauthorizedException('Неверный формат токена');
      }

      const decodedToken = new JwtService({ secret: 'secret' }).verify(token);

      request.user = {
        userId: decodedToken.userId,
        email: decodedToken.email,
      };

      return true;
    } catch (error) {
      throw new UnauthorizedException('Ошибка авторизации: ' + error.message);
    }
  }
}
