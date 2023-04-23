import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  private readonly users: User[] = [
    {
      id: '9cf5027c-3515-4163-b026-1efd1223f702',
      name: 'Flávio Lopes',
      email: 'flavioloppes@outlook.com',
      password: '12345678',
    },
  ];
  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.users.find((u) => u.email === email);
  }
}
