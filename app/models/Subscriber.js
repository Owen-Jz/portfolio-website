import mongoose from "mongoose";

const SubscriberSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    name: {
      type: String,
      trim: true,
    },
    subscribedAt: {
      type: Date,
      default: Date.now,
    },
    unsubscribedAt: {
      type: Date,
    },
    status: {
      type: String,
      enum: ["active", "unsubscribed"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

SubscriberSchema.index({ status: 1, email: 1 });

const Subscriber =
  mongoose.models.Subscriber || mongoose.model("Subscriber", SubscriberSchema);

export default Subscriber;