import { BaseEntity } from './base-entity';

export class Commit extends BaseEntity<Commit> {
  sha: string;
  project: string;
  committedAt: Date;
  message: string;
  author: {
    username: string;
    email: string;
  };
  url: string;

  static fromWebhook(commit: any, repository: any) {
    const {
      id: sha,
      message,
      timestamp: committedAt,
      author: { name: username, ...author },
      url
    } = commit;
    const { name: project } = repository;

    return new Commit({ sha, project, message, committedAt, author, url });
  }
}
