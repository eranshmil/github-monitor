import * as mongoose from 'mongoose';

import { IssueState } from '@common/entities';

const issueSchema = new mongoose.Schema(
  {
    issueId: { type: Number, required: true },
    project: { type: String, required: true },
    issuedAt: { type: Date, required: true, index: true },
    username: { type: String, required: true },
    title: { type: String, required: true },
    state: {
      type: String,
      enum: [IssueState.OPEN, IssueState.CLOSED],
      required: true
    },
    url: { type: String, required: true }
  },
  { timestamps: true }
);

export const IssueModel = mongoose.model('Issue', issueSchema);
