import { Controller, Post, UseInterceptors, UploadedFile, UseGuards } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { FilesService } from './files.service';

@ApiTags('Files')
@Controller('files')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Upload file' })
  @ApiResponse({ status: 201, description: 'File uploaded successfully' })
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const url = await this.filesService.uploadFile(file);
    return { url };
  }
}
