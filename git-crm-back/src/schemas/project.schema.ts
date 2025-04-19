import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Project extends Document {
  @Prop({
    type: {
      name: { type: String, required: true },
      avatarUrl: { type: String, required: true },
      userUrl: { type: String, required: true },
    },
    required: true,
  })
  owner: {
    name: string;
    avatarUrl: string;
    userUrl: string;
  };

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  url: string;

  @Prop({ required: true })
  stars: number;

  @Prop({ required: true })
  forks: number;

  @Prop({ required: true })
  openIssues: number;

  @Prop({ required: true })
  createdAt: number;

  @Prop({ required: true })
  userId: string;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
