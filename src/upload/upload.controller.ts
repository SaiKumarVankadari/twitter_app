import { Controller, Post, UploadedFile, UseInterceptors, Request } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { PrismaService } from 'prisma/prisma.service';
import { extname } from 'path';
import { ApiTags } from '@nestjs/swagger';

@Controller('upload')
@ApiTags('File Upload') // Add tags for API documentation

export class UploadController {
  constructor(private readonly prismaService: PrismaService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          return cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async uploadFile(@UploadedFile() file, @Request() req) {
    try {
      // Create or update the UploadedFile record

      if (!req.user || typeof req.user.uploadedFileId === 'undefined') {
        return { message: 'User is not authenticated or does not have the required data' };
      }
      const uploadedFile = await this.prismaService.uploadedFile.upsert({
        where: { id: req.user.uploadedFileId }, // Replace with your own query criteria
        create: {
          filename: file.filename,
          filesize: file.size,
          filetype: file.mimetype,
          filepath: `/uploads/${file.filename}`,
          uploadedByUserId: req.user.id,
        },
        update: {
        //   filename: file.filename,
        //   filesize: file.size,
        //   filetype: file.mimetype,
        //   filepath: `/uploads/${file.filename}`,
        },
      });

      return { message: 'File uploaded/updated successfully', file: uploadedFile };
    } catch (error) {
        console.log(error)
      return { message: 'File upload/update failed', error: error.message };
    }
  }
}
