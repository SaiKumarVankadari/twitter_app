// mongoose.controller.ts
import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { MongooseService } from './mongoose.service';

@Controller('mongo')
export class MongooseController {
  constructor(private readonly mongooseService: MongooseService) {}

  // Create a new user
  @Post('users')
  async createUser(@Body() createUserDto: any) {
    const { username, email, password } = createUserDto;
    return this.mongooseService.createUser(username, email, password);
  }
  @Get('users')
  async getAllUsers() {
    return this.mongooseService.getAllUsers();
  }
  

  // Get a user by ID
  @Get('users/:userId')
  async getUserById(@Param('userId') userId: string) {
    return this.mongooseService.getUserById(userId);
  }

  // Create a new notification
  @Post(':userId')
  async createNotification(@Param('userId') userId: string, @Body() createNotificationDto: any) {
    const { message } = createNotificationDto;
    return this.mongooseService.createNotification(userId, message);
    // console.log('Saved Notification:', savedNotification);
    // return savedNotification; 
   }

  // Get all notifications for a user
  @Get(':userId')
  async getNotifications(@Param('userId') userId: string) {
    const notifications = await this.mongooseService.getNotifications(userId);
    return { notifications }; // Return data as JSON object
  }

  // Update a notification by ID
  @Put(':notificationId')
  async updateNotification(@Param('notificationId') notificationId: string, @Body() updateNotificationDto: any) {
    const { message } = updateNotificationDto;
    return this.mongooseService.updateNotification(notificationId, message);
  }

  // Delete a notification by ID
  @Delete(':notificationId')
  async deleteNotification(@Param('notificationId') notificationId: string) {
    await this.mongooseService.deleteNotification(notificationId);
    return { message: 'Notification deleted successfully' };
  }

  // Recover a deleted notification by ID
  @Put('recover/:notificationId')
  async recoverNotification(@Param('notificationId') notificationId: string) {
    await this.mongooseService.recoverNotification(notificationId);
    return { message: 'Notification recovered successfully' };
  }
}
