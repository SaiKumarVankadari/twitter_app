// file.service.ts
import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class FileService {
    uploadFile(file: Express.Multer.File): string {
        // Check if the uploads directory exists; if not, create it
        const uploadDir = './uploads';
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir);
        }
      
        // Generate a unique file name (e.g., using a timestamp) or use the original file name
        const uniqueFileName = `${Date.now()}_${file.originalname}`;
      
        // Specify the file path where the uploaded file will be saved
        const filePath = `${uploadDir}/${uniqueFileName}`;
      
        // Write the file to the specified path
        fs.writeFileSync(filePath, file.buffer);
      
        // You can also store metadata about the file or perform additional actions here
      
        return `File uploaded successfully: ${uniqueFileName}`;
      }

  serveFile(fileName: string, isAttachment: boolean): { content: Buffer; contentType: string } | null {
    const filePath = `./uploads/${fileName}`;
    console.log('File path:', filePath);


    // Check if the file exists
    if (!fs.existsSync(filePath)) {
      return null;
    }

    // Read the file content as a Buffer
    const fileContent = fs.readFileSync(filePath);

    // Set the appropriate Content-Type based on the file extension
    const fileExtension = fileName.split('.').pop();
    let contentType = this.getContentType(fileExtension);

    if (isAttachment) {
      contentType = `attachment; filename=${fileName}`;
    }

    return { content: fileContent, contentType };
  }

  private getContentType(fileExtension: string | undefined): string {
    switch (fileExtension) {
      case 'jpg':
      case 'jpeg':
        return 'image/jpeg';
      case 'png':
        return 'image/png';
      case 'mp4':
        return 'video/mp4';
      case 'mp3':
        return 'audio/mpeg';
      case 'mov':
        return 'video/quicktime';
      // Add more cases for other file types as needed
      default:
        return 'application/octet-stream'; // Default to binary data
    }
  }
  
}
