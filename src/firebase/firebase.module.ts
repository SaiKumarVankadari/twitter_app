import { Module } from '@nestjs/common';
import { FirestoreController } from './firebase.controller';
import { FirestoreService } from './firebase.service';

@Module({
    controllers:[FirestoreController],
    providers:[FirestoreService]
})
export class FirebaseModule {}
