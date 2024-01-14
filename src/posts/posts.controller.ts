import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import type { Prisma } from '@prisma/client';

import { PostsService } from './posts.service';
import { CreatePostDto, UpdatePostDto, FindAllDto } from './dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  async create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create({
      ...createPostDto,
      tags: createPostDto.tags ? createPostDto.tags.join(',') : undefined,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne({ id: Number(id) });
  }

  @Get()
  findAll(@Body() findAllDto: FindAllDto) {
    return this.postsService.findAll(findAllDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    const data: Prisma.PostUpdateInput = {};
    const keys = Object.keys(updatePostDto) as (keyof UpdatePostDto)[];
    keys.forEach((key) => {
      if (key === 'tags') {
        data[key] = updatePostDto[key].join(',');
      } else {
        data[key] = updatePostDto[key];
      }
    });

    return this.postsService.update({
      where: { id: Number(id) },
      data,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove({ id: Number(id) });
  }
}
