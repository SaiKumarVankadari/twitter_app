// notification.schema.ts
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema()
export class Notification {
  @Prop()
  message: string;

  @Prop({ type: Date, default: null })
  deletedAt: Date;
}

export type NotificationDocument = Notification & Document;
export const NotificationSchema = SchemaFactory.createForClass(Notification);
export const NotificationModel = mongoose.model<NotificationDocument>('Notification', NotificationSchema);

