// // auth/guards/tweet-owner.guard.ts

// import { Injectable, CanActivate, ExecutionContext, NotFoundException, UnauthorizedException } from '@nestjs/common';
// import { TweetsService } from './tweets.service';

// @Injectable()
// export class TweetOwnerGuard implements CanActivate {
//   constructor(private readonly tweetsService: TweetsService) {}

//   async canActivate(context: ExecutionContext): Promise<boolean> {
//     const request = context.switchToHttp().getRequest();
    
//     if (!request.user || !request.user.id) {
//       throw new UnauthorizedException('User not authenticated or missing user ID');
//     }

//     const tweetId = +request.params.id; // Extract tweet ID from the request params
//     const userId = request.user.id; // Assuming you have a user object in the request

//     // Check if the tweet is owned by the authenticated user
//     const isOwner = await this.tweetsService.isTweetOwnedByUser(tweetId, userId);

//     if (!isOwner) {
//       throw new UnauthorizedException("You don't have permission to perform this action on the tweet.");
//     }

//     return true;
//   }
// }
