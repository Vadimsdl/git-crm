import { IsString, Matches } from 'class-validator';

export class EditProjectDto {
  @IsString()
  @Matches(/^[a-zA-Z0-9-]+\/[a-zA-Z0-9-]+$/, {
    message: 'Repository path must be in format: owner/repo',
  })
  repositoryPath: string;
}
