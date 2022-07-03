import mongoose from "mongoose";
import httpStatus from "http-status";
import { isNil, omitBy } from "lodash";

import APIError from "../errors/api-error";
import { createAccessToken } from "../utils/generateToken";
import config from "../config/env";

const roles = [config.roles.USER, config.roles.ADMIN];

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      match: /^\S+@\S+\.\S+$/,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    dateOfBirth: {
      type: Date,
    },

    mobile: {
      type: Number,
    },

    status: {
      type: Boolean,
      default: false,
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
    accountType: {
      type: String,
      enum: roles,
      default: config.roles.USER,
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

// Method
userSchema.method({
  async passwordMatches(password: string, hash: string) {
    // return bcrypt.compare(password, this.password);
    return password == hash;
  },
});

userSchema.statics = {
  /*
   * GET user by ID
   */
  async get(id) {
    let user;

    if (mongoose.Types.ObjectId.isValid(id)) {
      user = await this.findById(id).exec();
    }
    if (user) {
      return user;
    }

    throw new APIError({
      message: "User does not exist",
      status: httpStatus.NOT_FOUND,
      errors: [
        {
          field: "User",
          location: "body",
          messages: ["User does not exist"],
        },
      ],
      stack: "",
    });
  },

  /*
   * Login + Generate jwt
   * */
  async findAndGenerateToken(options: ILoginRequest): Promise<ISuccessLogin> {
    if (!options.email) {
      throw new APIError({
        message: "An email is required to generate a token",
        errors: [],
        status: httpStatus.UNAUTHORIZED,
      });
    }

    const user = await this.findOne({ email: options.email }).exec();
    console.log(user);

    if (options.password) {
      if (user) {
        if (await user.passwordMatches(options.password, user?.password)) {
          const token = createAccessToken({
            id: user.id,
            email: user.email,
            accountType: user.accountType,
          });

          return {
            token: token,
          };
        }
      } else {
        throw new APIError({
          message: "Invalid Username or password",
          errors: [],
          status: httpStatus.UNAUTHORIZED,
        });
      }
    }

    return {
      token: "",
    };
  },

  list({ page = 1, perPage = 30, name, email, role }) {
    const options = omitBy({ name, email, role }, isNil);

    return this.find(options)
      .sort({ createdAt: -1 })
      .skip(perPage * (page - 1))
      .limit(perPage)
      .exec();
  },

  // Check if the user email is a duplicate
  checkDuplicateEmail(error) {
    console.log(error.name, error.code);

    if (error.name === "MongoServerError" && error.code === 11000) {
      return new APIError({
        message: "Validation Error",
        errors: [
          {
            field: "email",
            location: "body",
            messages: ['"email" already exists'],
          },
        ],
        stack: error.stack,
        status: httpStatus.CONFLICT,
      });
    }
    return error;
  },
};

export default mongoose.model("User", userSchema);
