
import { Controller, Post, Body, Get, Param, ParseIntPipe, Put, Delete } from '@nestjs/common';
import { ReactionsService } from './reactions.service';
import { CreateReactionDto } from './dto/reaction.dto';

@Controller('reactions')
export class ReactionsController {
  constructor(private readonly reactionsService: ReactionsService) {}


  @Post()
  create(@Body() createReactionDto:CreateReactionDto){
    return this.reactionsService.create(createReactionDto);
  }

  @Get()
  findAll(){
    this.reactionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number){
    return this.reactionsService.findOne(id)
  }

  @Put()
  updateReaction(@Param('id', ParseIntPipe) id: number, updateReactionDto:CreateReactionDto){
    return this.reactionsService.update(id, updateReactionDto)
  }

  @Delete(':id')
  deleteReaction(@Param('id', ParseIntPipe) id: number){
    return this.reactionsService.deleteReaction(id);
  }
  
}
