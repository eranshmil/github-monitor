import { BaseEntity } from './base-entity';

export enum IssueState {
  OPEN = 'open',
  CLOSED = 'closed'
}

export class Issue extends BaseEntity<Issue> {
  issueId: number;
  project: string;
  issuedAt: Date;
  username: string;
  title: string;
  state: IssueState;
  url: string;

  static fromWebhook(issue: any, repository: any) {
    const {
      id: issueId,
      created_at: issuedAt,
      user: { login: username },
      title,
      state,
      html_url: url
    } = issue;
    const { name: project } = repository;

    return new Issue({
      issueId,
      project,
      issuedAt,
      username,
      title,
      state,
      url
    });
  }
}
