// mongoose.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { Notification, NotificationDocument, NotificationModel } from './notification.schema';

@Injectable()
export class MongooseService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    @InjectModel(NotificationModel.modelName) private readonly notificationModel: Model<NotificationDocument>,
  ) {}

  // Create a new user
  async createUser(username: string, email: string, password: string): Promise<User> {

    const newUser = new this.userModel({
      username,
      email,
      password,
    });
    return newUser.save();
  }

  // Get all users
  async getAllUsers(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  

  // Get a user by ID
  async getUserById(userId: string): Promise<User> {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found.`);
    }
    return user;
  }

  // Create a new notification
  async createNotification(userId: string, message: string): Promise<Notification> {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found.`);
    }

    const notification = new this.notificationModel({
      message,
      user: userId,
    });
    return notification.save();
  }

  // Get all notifications for a user
  async getNotifications(userId: string): Promise<Notification[]> {
    const userWithNotifications = await this.userModel
      .findById(userId)
      .populate('notifications');
    if (!userWithNotifications) {
      throw new NotFoundException(`User with ID ${userId} not found.`);
    }
    return (userWithNotifications as UserDocument).notifications; // Cast to UserDocument to access 'notifications'
}

  // Update a notification by ID
  async updateNotification(notificationId: string, message: string): Promise<Notification> {
    const notification = await this.notificationModel.findById(notificationId);
    if (!notification) {
      throw new NotFoundException(`Notification with ID ${notificationId} not found.`);
    }

    notification.message = message;
    return notification.save();
  }

  // Delete a notification by ID
  async deleteNotification(notificationId: string): Promise<void> {
    const notification = await this.notificationModel.findById(notificationId);
    if (!notification) {
      throw new NotFoundException(`Notification with ID ${notificationId} not found.`);
    }

    await notification.deleteOne();
  }

  // Recover a deleted notification by ID
  async recoverNotification(notificationId: string): Promise<Notification> {
    const notification = await this.notificationModel.findById(notificationId);
    if (!notification) {
      throw new NotFoundException('Notification not found');
    }

    if (notification.deletedAt === null) {
      throw new NotFoundException('Notification is not deleted');
    }

    // Perform recovery by setting the deletedAt field to null
    notification.deletedAt = null;
    return notification.save();
  }
}
