import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { EditProjectDto } from './dto/edit-project.dto';

@Controller('projects')
@UseGuards(JwtAuthGuard)
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  create(@Body() createProjectDto: CreateProjectDto, @Request() req: any) {
    return this.projectService.create(createProjectDto, req.user.userId);
  }

  @Get()
  findAll(@Request() req) {
    return this.projectService.findAll(req.user.userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    return this.projectService.remove(id, req.user.userId);
  }

  @Put(':id/update')
  update(
    @Body() editProjectDto: EditProjectDto,
    @Param('id') id: string,
    @Request() req,
  ) {
    return this.projectService.update(id, req.user.userId, editProjectDto);
  }
}
