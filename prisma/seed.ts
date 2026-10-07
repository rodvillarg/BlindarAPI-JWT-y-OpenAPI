import 'dotenv/config';
import * as bcrypt from 'bcryptjs';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { PrismaClient } from '../src/generado/prisma/client';

// Misma conexion que usa PrismaService (el seed corre fuera de Nest).
const url = new URL(process.env.DATABASE_URL!);
const adapter = new PrismaMariaDb({
  host: url.hostname,
  port: Number(url.port || 3306),
  user: decodeURIComponent(url.username),
  password: decodeURIComponent(url.password),
  database: url.pathname.replace(/^\//, ''),
  allowPublicKeyRetrieval: true,
});
const prisma = new PrismaClient({ adapter });

async function main() {
  // dentro de main(), al principio:
  await prisma.usuario.deleteMany();

  // las tres cuentas de prueba, ahora guardadas en MySQL.
  const passwordHash = await bcrypt.hash('gimnasio2026', 10);
  await prisma.usuario.createMany({
    data: [
      { correo: 'karla@itson.mx', passwordHash, rol: 'miembro', miembroId: 1 },
      { correo: 'ana@itson.mx', passwordHash, rol: 'entrenador' },
      { correo: 'admin@itson.mx', passwordHash, rol: 'admin' },
    ],
  });
  console.log('Listo: 3 cuentas creadas (karla, ana, admin).');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());