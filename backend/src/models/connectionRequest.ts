import { model, Schema } from "mongoose";

const connectionRequestSchema = new Schema(
  {
    fromUserId: {
      type: Schema.Types.ObjectId,
      required: true,
    },

    toUserId: {
      type: Schema.Types.ObjectId,
      required: true,
    },

    status: {
      type: String,
      enum: {
        values: ["ignored", "interested", "accepted", "rejected"],
        message: `{VALUE} is incorrect status type`,
      },
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const ConnectionRequest = model(
  "ConnectionRequest",
  connectionRequestSchema
);
