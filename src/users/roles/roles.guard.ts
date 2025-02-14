import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { IS_PUBLIC_KEY } from 'src/auth/public/public.decorator';
import { Roles } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const getHandler = context.getHandler();
    const getClass = context.getClass();

    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      getHandler,
      getClass,
    ]);

    if (isPublic) return true;

    const roles = this.reflector.get(Roles, getHandler);
    if (!roles) return true;

    const request = context.switchToHttp().getRequest();

    return roles.some((role) => role === request.user.role);
  }
}
