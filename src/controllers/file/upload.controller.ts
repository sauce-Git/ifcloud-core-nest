import {
  Controller,
  HttpCode,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { access_role } from '@prisma/client';
import { RoleGuard } from 'src/guards/role.guard';
import { CustomResponse } from 'src/interfaces/response';
import { UploadService } from 'src/services/upload.service';

@Controller('file/upload')
export class FileUploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('write-token/:parentKey')
  @HttpCode(201)
  @UseGuards(RoleGuard(access_role.create))
  async issueWriteToken(
    @Param('parentKey') parentKey: string,
    @Query('memberId') memberId: number,
    @Query('fileName') fileName: string,
    @Query('byteSize') byteSize: number,
  ) {
    const data = await this.uploadService.issueWriteToken(
      memberId,
      parentKey,
      fileName,
      byteSize,
    );
    const response: CustomResponse<typeof data> = {
      status: 201,
      message: 'Block file created',
      data: data,
    };

    return response;
  }

  @Post('complete/:blockKey')
  @HttpCode(201)
  @UseGuards(RoleGuard(access_role.create))
  async completeUpload(
    @Param('blockKey') blockKey: string,
    @Query('totalChunks') totalChunks: number,
  ) {
    const data = await this.uploadService.completeUpload(blockKey, totalChunks);
    const response: CustomResponse<typeof data> = {
      status: 201,
      message: 'Block file merged',
      data: data,
    };

    return response;
  }
}
