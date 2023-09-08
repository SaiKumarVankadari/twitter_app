// CreateReplyInput.ts
import { Prisma } from '@prisma/client';

export type CreateReplyInput = Prisma.ReplyCreateInput & {
  authorId: number;
};
