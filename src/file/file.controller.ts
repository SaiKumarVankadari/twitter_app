// file.controller.ts
import { Controller, Get, Param, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { FileService } from './file.service';

@Controller('filebased')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File): Promise<string> {
    // Handle the uploaded file, e.g., save it to a specific location or database
    const result = this.fileService.uploadFile(file);
    
    return result;
  }

  @Get('inline/:fileName')
  async serveInlineFile(@Param('fileName') fileName: string, @Res() res: Response): Promise<void> {
    const fileData = this.fileService.serveFile(fileName, false);

    if (!fileData) {
      res.status(404).send('File not found');
      return;
    }

    res.setHeader('Content-Type', fileData.contentType);
    res.send(fileData.content);
  }

  @Get('attachment/:fileName')
  async serveAttachmentFile(@Param('fileName') fileName: string, @Res() res: Response): Promise<void> {
    const fileData = this.fileService.serveFile(fileName, true);

    if (!fileData) {
      res.status(404).send('File not found');
      return;
    }

    res.setHeader('Content-Disposition', fileData.contentType);
    res.send(fileData.content);
  }
}
