import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { NotificationsService } from './notifications.service';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post(':userId')
  async create(@Param('userId', ParseIntPipe) userId: number, @Body() createNotificationDto: any) {
    return this.notificationsService.createNotification(userId, createNotificationDto.message);
  }

  @Get(':userId')
  async findAll(@Param('userId', ParseIntPipe) userId: number) {
    return this.notificationsService.getNotifications(userId);
  }

  @Put(':notificationId')
  async update(@Param('notificationId', ParseIntPipe) notificationId: number, @Body() updateNotificationDto: any) {
    return this.notificationsService.updateNotification(notificationId, updateNotificationDto.message);
  }

  @Delete(':notificationId')
  async remove(@Param('notificationId', ParseIntPipe) notificationId: number) {
    await this.notificationsService.deleteNotification(notificationId);
    return { message: 'Notification deleted succesfully'}
    }

  @Get('recover/:notificationId')
  async recoverNotification(@Param('notificationId', ParseIntPipe) notificationId: number) {
    await this.notificationsService.recoverNotification(notificationId);
    return { message: 'Notification recovered successfully' };
  }
}
