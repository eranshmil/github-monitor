import * as mongoose from 'mongoose';

const commitSchema = new mongoose.Schema(
  {
    sha: { type: String, required: true },
    project: { type: String, required: true },
    commitedAt: { type: Date, required: true, index: true },
    message: { type: String, required: true },
    author: {
      username: { type: String, required: true },
      email: { type: String, required: true }
    },
    url: { type: String, required: true }
  },
  { timestamps: true }
);

export const CommitModel = mongoose.model('Commit', commitSchema);
