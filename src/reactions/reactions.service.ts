
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateReactionDto } from './dto/reaction.dto';

@Injectable()
export class ReactionsService {
  constructor(private prisma: PrismaService) {}

    async create(createReactionDto:CreateReactionDto){
        return this.prisma.reaction.create({
            data: createReactionDto,
        })
    }
    async findAll(){
        return this.prisma.reaction.findMany();
    }

    async findOne(id: number){
        const reaction = await this.prisma.reaction.findUnique({where:{ id}});
        if(!reaction){
            throw new NotFoundException('Reaction Not Found'); 
        }
        return reaction;
    }

    async update(id:number, updateReactionDto:CreateReactionDto){
        const reaction = await this.prisma.reaction.findUnique({where:{ id}});
        if(!reaction){
            throw new NotFoundException('Reaction Not Found'); 
        }
        return this.prisma.reaction.update({
            where: { id },
            data: updateReactionDto,
        })

    }

    async deleteReaction(id: number){
        const reaction = await this.prisma.reaction.findUnique({where:{ id}});
        if(!reaction){
            throw new NotFoundException('Reaction Not Found'); 
        }
        return this.prisma.reaction.delete({
            where: {id},
        })
    }
  }
