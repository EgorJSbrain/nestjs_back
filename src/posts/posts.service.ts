import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Post } from './posts.model';
import { CreatPostDto } from './dto/create-post.dto';
import { FilesService } from 'src/files/files.service';

@Injectable()
export class PostsService {

  constructor(
    @InjectModel(Post) private postRepository: typeof Post,
    private fileService: FilesService
  ) {}

  async create(dto: CreatPostDto, image: any) {
    console.log("---------dto:", dto)
    const fileName = await this.fileService.createFile(image)
    const post = await this.postRepository.create({ ...dto, image: fileName })
    console.log("!!!!!!!!!", post)

    return post
  }
}