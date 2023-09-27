import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Notification } from './notification.schema'; // Import the Notification schema

@Schema()
export class User {
  @Prop({unique: true })
  userId: String;

  @Prop()
  username: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Notification' }] })
  notifications: Notification[]; // Define the 'notifications' field
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
