interface IOwner {
  name: string;
  avatarUrl: string;
  userUrl: string;
}

export interface IProject {
  _id: string;
  name: string;
  owner: IOwner;
  url: string;
  stars: number;
  forks: number;
  openIssues: number;
  userId: string;
  createdAt: number;
}
