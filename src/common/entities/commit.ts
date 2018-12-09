import { BaseEntity } from './base-entity';

export class Commit extends BaseEntity<Commit> {
  sha: string;
  project: string;
  commitedAt: Date;
  message: string;
  author: {
    name: string;
    email: string;
  };
  url: string;

  static fromWebhook(commit: any, repository: any) {
    const {
      id: sha,
      message,
      timestamp: commitedAt,
      author: { name, ...author },
      url
    } = commit;
    const { name: project } = repository;

    return new Commit({ sha, project, message, commitedAt, author, url });
  }
}
