import { BaseEntity } from './base-entity';

export class Fork extends BaseEntity<Fork> {
  project: string;
  forkedAt: Date;
  username: string;
  url: string;

  static fromWebhook(forkee: any, repository: any) {
    const {
      created_at: forkedAt,
      owner: { login: username },
      html_url: url
    } = forkee;
    const { name: project } = repository;

    return new Fork({ project, forkedAt, username, url });
  }
}
