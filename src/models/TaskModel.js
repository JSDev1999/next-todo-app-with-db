import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
  {
    name: {
      /* The name of this pet */
      type: String,
      required: [true, "Please provide a name."],
      maxlength: [20, "Name cannot be more than 60 characters"],
    },
    completed: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Task || mongoose.model("Task", TaskSchema);
