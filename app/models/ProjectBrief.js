import mongoose from "mongoose";

const ProjectBriefSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ["website", "branding", "ui-ux"],
  },
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  companyName: {
    type: String,
  },
  projectName: {
    type: String,
  },
  businessDescription: {
    type: String,
  },
  targetAudience: {
    type: String,
  },
  projectPurpose: {
    type: String,
  },
  style: {
    type: String,
  },
  existingAssets: {
    type: String,
  },
  brandGuidelines: {
    type: String,
  },
  creativeFreedom: {
    type: String,
  },
  brandPerception: {
    type: String,
  },
  voicePersonality: {
    type: String,
  },
  websitesLiked: {
    type: String,
  },
  pagesNeeded: {
    type: String,
  },
  features: {
    type: String,
  },
  contentReady: {
    type: String,
  },
  mediaReady: {
    type: String,
  },
  animations: {
    type: String,
  },
  domainOwned: {
    type: String,
  },
  domainDetails: {
    type: String,
  },
  timeline: {
    type: String,
  },
  budget: {
    type: String,
  },
  additionalNotes: {
    type: String,
  },
  status: {
    type: String,
    default: "new",
    enum: ["new", "reviewed", "contacted", "completed"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

ProjectBriefSchema.pre("save", async function () {
  this.updatedAt = Date.now();
});

export default mongoose.models.ProjectBrief || mongoose.model("ProjectBrief", ProjectBriefSchema);
