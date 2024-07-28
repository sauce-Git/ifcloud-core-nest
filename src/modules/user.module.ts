import { Module } from '@nestjs/common';
import { UserController } from 'src/controllers/user.controller';
import { BackgroundService } from 'src/services/background.service';
import { CheckRoleService } from 'src/services/checkRole.service';
import { FavoriteService } from 'src/services/favorite.service';
import { PrismaService } from 'src/services/prisma.service';
import { UserService } from 'src/services/user.service';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    FavoriteService,
    CheckRoleService,
    PrismaService,
    BackgroundService,
  ],
})
export class UserModule {}
