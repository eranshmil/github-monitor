import * as mongoose from 'mongoose';

const forkSchema = new mongoose.Schema(
  {
    project: { type: String, required: true },
    forkedAt: { type: Date, required: true },
    username: { type: String, required: true },
    url: { type: String, required: true }
  },
  { timestamps: true }
);

export const ForkModel = mongoose.model('Fork', forkSchema);
