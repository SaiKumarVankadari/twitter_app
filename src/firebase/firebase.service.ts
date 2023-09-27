// firestore.service.ts

import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class FirestoreService {
  private firestore = admin.firestore();

  async getDocument(collectionName: string, documentId: string) {
    const docRef = this.firestore.collection(collectionName).doc(documentId);
    const doc = await docRef.get();
    return doc.data();
  }

  async createDocument(collectionName: string, data: any) {
    const docRef = this.firestore.collection(collectionName).doc();
    await docRef.set(data);
    return docRef.id;
  }

  // Other Firestore operations...
}
