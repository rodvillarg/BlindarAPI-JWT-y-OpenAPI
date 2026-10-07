import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES } from '../decoradores/roles.decorator';
import { PayloadJwt, Rol } from '../dominio/usuario';

/**
 * @author Jesús Rodrigo Villegas Argüelles - 261186
 */
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(contexto: ExecutionContext): boolean {
    const permitidos = this.reflector.getAllAndOverride<Rol[]>(ROLES, [
      contexto.getHandler(),
      contexto.getClass(),
    ]);

    if (!permitidos) {
      return true;
    }

    const req = contexto.switchToHttp().getRequest<{ user: PayloadJwt }>();
    if (permitidos.includes(req.user.rol)) {
      return true;
    }

    throw new ForbiddenException('Tu rol no tiene permiso para esta accion');
  }
}