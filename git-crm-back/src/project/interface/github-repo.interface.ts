export interface GithubRepo {
  owner: {
    name: string;
    avatarUrl: string;
    userUrl: string;
  };
  name: string;
  url: string;
  stars: number;
  forks: number;
  openIssues: number;
  createdAt: number;
}
