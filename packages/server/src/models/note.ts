import httpStatus from "http-status";
import mongoose from "mongoose";
import APIError from "../errors/api-error";
import { omitBy, isNil } from "lodash";

const notesSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    ownedBy: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

notesSchema.statics = {
  async get(id) {
    let note;

    if (mongoose.Types.ObjectId.isValid(id)) {
      note = await this.findById(id).exec();
    }

    if (note) {
      return note;
    }

    throw new APIError({
      message: "Note not found",
      status: httpStatus.NOT_FOUND,
      errors: [],
    });
  },

  list({ page = 1, perPage = 30, title }) {
    const options = omitBy({ title }, isNil);

    return this.find(options)
      .sort({ createdAt: -1 })
      .skip(perPage * (page - 1))
      .limit(perPage)
      .exec();
  },
};

export default mongoose.model("Note", notesSchema);
