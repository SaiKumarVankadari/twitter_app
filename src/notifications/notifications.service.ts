import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class NotificationsService {
  constructor(private readonly prisma: PrismaService) {}

  async createNotification(userId: number, message: string): Promise<any> {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found.`);
    }

    const notification = await this.prisma.notification.create({
      data: {
        message,
        user: {
          connect: { id: userId },
        },
      },
    });

    return notification;
  }

  async getNotifications(userId: number): Promise<any[]> {
    const userWithNotifications = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        notifications: {
          select: {
            id: true,
            message: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
    });
  
    if (!userWithNotifications) {
      throw new NotFoundException(`User with ID ${userId} not found.`);
    }
  
    return userWithNotifications.notifications;
  }

  
  async updateNotification(notificationId: number, message: string): Promise<any> {
    const notification = await this.prisma.notification.findUnique({ where: { id: notificationId } });

    if (!notification) {
      throw new NotFoundException(`Notification with ID ${notificationId} not found.`);
    }

    const updatedNotification = await this.prisma.notification.update({
      where: { id: notificationId },
      data: { message },
    });

    return updatedNotification;
  }

  async deleteNotification(notificationId: number): Promise<void> {
    const notification = await this.prisma.notification.findUnique({ where: { id: notificationId } });

    if (!notification) {
      throw new NotFoundException(`Notification with ID ${notificationId} not found.`);
    }

    await this.prisma.notification.update({
      where: { id: notificationId },
      data: { deletedAt: new Date() },
    });
    
  }


  async recoverNotification(id: number): Promise<any> {
    const notification = await this.prisma.notification.findUnique({
      where: { id },
    });

    if (!notification) {
      throw new NotFoundException('Notification not found');
    }

    if (notification.deletedAt === null) {
      throw new NotFoundException('Notification is not deleted');
    }

    // Perform recovery by setting the deletedAt field to null
    return this.prisma.notification.update({
      where: { id },
      data: {
        deletedAt: null,
      },
    });
  }
}
