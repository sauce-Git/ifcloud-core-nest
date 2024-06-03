import { Controller, Get, Header, HttpCode, UseGuards } from '@nestjs/common';
import { access_role } from '@prisma/client';
import { AuthGuard } from 'src/guards/auth.guard';
import { RoleGuard } from 'src/guards/role.guard';
import { UserGuard } from 'src/guards/user.guard';
import fs from 'fs';

@Controller('videos')
// @UseGuards(AuthGuard, UserGuard)
export class VideoController {
  constructor() {}

  @Get('/html/stream')
  // @UseGuards(RoleGuard(access_role.read))
  @HttpCode(200)
  @Header('Content-Type', 'text/html')
  async streamVideo(): Promise<string> {
    const playerHtml = fs.readFileSync('src/utils/player.html', 'utf8');
    return playerHtml;
  }
}
