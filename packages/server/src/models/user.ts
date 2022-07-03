import mongoose from "mongoose";
import httpStatus from "http-status";
import APIError from "../errors/api-error";
import { isNil, omitBy } from "lodash";

const roles = ["user", "admin"];

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      match: /^\S+@\S+\.\S+$/,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 128,
    },
    name: {
      type: String,
      maxlength: 128,
      index: true,
      trim: true,
    },
    role: {
      type: String,
      enum: roles,
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function save(next) {
  try {
    if (!this.isModified("password")) return next();

    return next();
  } catch (error) {
    return next(error);
  }
});

userSchema.statics = {
  async get(id) {
    let user;

    if (mongoose.Types.ObjectId.isValid(id)) {
      user = await this.findById(id).exec();
    }
    if (user) {
      return user;
    }

    console.log("user does not exist");

    throw new APIError({
      message: "User does not exist",
      stack: "",
      // status: httpStatus.NOT_FOUND,
    });
  },

  list({ page = 1, perPage = 30, name, email, role }) {
    const options = omitBy({ name, email, role }, isNil);

    return this.find(options)
      .sort({ createdAt: -1 })
      .skip(perPage * (page - 1))
      .limit(perPage)
      .exec();
  },
};

export default mongoose.model("User", userSchema);
