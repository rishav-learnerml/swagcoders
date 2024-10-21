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

//compound indexing the db
connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 });
//check if the person is sending connection request to himself/herself -- at schema level

connectionRequestSchema.pre("save", function (next) {
  if (this.fromUserId.equals(this.toUserId)) {
    throw new Error("You can't send connection request to yourself!");
  }
  next();
});

export const ConnectionRequest = model(
  "ConnectionRequest",
  connectionRequestSchema
);
