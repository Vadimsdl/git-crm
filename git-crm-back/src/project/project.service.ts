import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Octokit } from '@octokit/rest';
import { Project } from '../schemas/project.schema';
import { CreateProjectDto } from './dto/create-project.dto';
import { GithubRepo } from './interface/github-repo.interface';
import { EditProjectDto } from './dto/edit-project.dto';

@Injectable()
export class ProjectService {
  private octokit: Octokit;

  constructor(@InjectModel(Project.name) private projectModel: Model<Project>) {
    this.octokit = new Octokit();
  }

  async create(
    createProjectDto: CreateProjectDto,
    userId: string,
  ): Promise<Project> {
    const [owner, repo] = createProjectDto.repositoryPath.split('/');
    const githubRepo = await this.fetchGithubRepo(owner, repo);

    const project = new this.projectModel({
      ...githubRepo,
      userId,
    });

    return project.save();
  }

  async findAll(userId: string): Promise<Project[]> {
    return this.projectModel.find({ userId }).exec();
  }

  async findOne(id: string, userId: string): Promise<Project | null> {
    return this.projectModel.findOne({ _id: id, userId }).exec();
  }

  async remove(id: string, userId: string): Promise<void> {
    await this.projectModel.deleteOne({ _id: id, userId }).exec();
  }

  async update(
    id: string,
    userId: string,
    editProjectDto: EditProjectDto,
  ): Promise<Project | null> {
    const project = await this.findOne(id, userId);
    if (!project) {
      throw new Error('Project not found');
    }

    const [owner, repo] = editProjectDto.repositoryPath.split('/').slice(-2);
    const githubRepo = await this.fetchGithubRepo(owner, repo);

    return this.projectModel
      .findOneAndUpdate(
        { _id: id, userId },
        { $set: githubRepo },
        { new: true },
      )
      .exec();
  }

  private async fetchGithubRepo(
    owner: string,
    repo: string,
  ): Promise<GithubRepo> {
    const { data } = await this.octokit.repos.get({
      owner,
      repo,
    });

    return {
      owner: {
        name: data.owner.login,
        avatarUrl: data.owner.avatar_url,
        userUrl: data.owner.html_url,
      },
      name: data.name,
      url: data.html_url,
      stars: data.stargazers_count,
      forks: data.forks_count,
      openIssues: data.open_issues_count,
      createdAt: new Date(data.created_at).getTime(),
    };
  }
}
