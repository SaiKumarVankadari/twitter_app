// your.controller.ts

import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { FirestoreService } from './firebase.service';

@Controller('firebase')
export class FirestoreController {
  constructor(private readonly firestoreService: FirestoreService) {}

  @Get(':collectionName/:documentId')
  async getDocument(
    @Param('collectionName') collectionName: string,
    @Param('documentId') documentId: string,
  ) {
    const data = await this.firestoreService.getDocument(
      collectionName,
      documentId,
    );
    return data;
  }

  @Post(':collectionName')
  async createDocument(
    @Param('collectionName') collectionName: string,
    @Body() data: any,
  ) {
    const documentId = await this.firestoreService.createDocument(
      collectionName,
      data,
    );
    return { message: 'Document created', documentId };
  }

  // Other controller methods...
}
