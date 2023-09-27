import { Module } from '@nestjs/common';
import { MongooseController } from './mongoose.controller';
import { MongooseService } from './mongoose.service';
import { UsersService } from 'src/users/users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { NotificationSchema } from './notification.schema';
import { UsersModule } from 'src/users/users.module';
import { UserSchema } from './user.schema';
// import { DatabaseService } from 'firebase-admin/lib/database/database';

@Module({
  imports:[
    MongooseModule.forFeature([
      // Define your Mongoose models here
      { name: 'User', schema: UserSchema },
      { name: 'Notification', schema: NotificationSchema }, // Replace 'Notification' with your actual model name
    ]),
    UsersModule,
  ],
  controllers: [MongooseController],
  providers: [MongooseService, UsersService],
})
export class MongoModule {}
