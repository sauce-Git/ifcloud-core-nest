import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(uuidKey: string): Promise<{ id: number; uuidKey: string }> {
    const createUser = await this.prisma.users
      .create({
        data: {
          uuid_key: uuidKey,
        },
      })
      .catch((error) => {
        if (error.code === 'P2002') {
          throw new ConflictException('User already exists');
        }
        throw new InternalServerErrorException('Failed to create user');
      });

    const output = {
      id: createUser.id,
      uuidKey: createUser.uuid_key,
    };

    return output;
  }

  async read(uuidKey: string): Promise<number> {
    const user = await this.prisma.users
      .findUniqueOrThrow({
        where: {
          uuid_key: uuidKey,
        },
      })
      .catch((error) => {
        if (error.code === 'P2025') {
          throw new NotFoundException('User does not exist');
        }
        throw new InternalServerErrorException(`Failed to read user`);
        // throw new InternalServerErrorException('Failed to read user');
      });
    return user.id;
  }

  async delete(uuidKey: string): Promise<boolean> {
    await this.prisma.users
      .delete({
        where: {
          uuid_key: uuidKey,
        },
      })
      .catch((error) => {
        if (error.code === 'P2025') {
          throw new NotFoundException('User does not exist');
        }
        throw new InternalServerErrorException('Failed to delete user');
      });

    return true;
  }
}
