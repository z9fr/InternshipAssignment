import mongoose from "mongoose";
import httpStatus from "http-status";
import { isNil, omitBy } from "lodash";
import { hash, compare } from "bcrypt";

import APIError from "../errors/api-error";
import { createAccessToken } from "../utils/generateToken";
import config from "../config/env";
import { ILoginRequest, ISuccessLogin } from "./user.d";

const roles = [config.roles.USER, config.roles.ADMIN];

export interface ITransformedUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: Date;
  accountType: string;
  mobile: number;
  status: Boolean;
}

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

// pre save hook for user to hash the password
userSchema.pre("save", async function save(next) {
  try {
    if (!this.isModified("password")) return next();

    // hash user password with bcrypt
    const pwhash = await hash(this.password, config.bcryptRounds);
    this.password = pwhash;

    return next();
  } catch (error) {
    return next(error);
  }
});

// Methods
userSchema.method({
  // check if password hash is a match
  async passwordMatches(password: string, pwhash: string) {
    return await compare(password, pwhash);
  },

  transform() {
    const transformed = {};
    const fields = [
      "_id",
      "firstName",
      "lastName",
      "email",
      "dateOfBirth",
      "accountType",
      "mobile",
      "status",
      "accountType",
    ];

    fields.forEach((field) => {
      transformed[field] = this[field];
    });

    return transformed;
  },
});

userSchema.statics = {
  // get user by
  // @returns Promise<User, APIError>
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

  // user login and token generation
  // @returns {Promise<ISuccessLogin>}
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
            accountType: user.accountType,
          };
        } else {
          console.log("password is wrong");
        }
      }

      throw new APIError({
        message: "Invalid Username or password",
        errors: [],
        status: httpStatus.UNAUTHORIZED,
      });
    }

    return {
      token: "",
      accountType: "",
    };
  },

  async resetPasswordCheck(
    userID: string,
    oldPassword: string
  ): Promise<Boolean> {
    const user = await this.findById(userID);

    if (await user.passwordMatches(oldPassword, user.password)) {
      return true;
    }

    throw new APIError({
      message: "Validation Error",
      errors: [
        {
          field: "password",
          location: "password",
          messages: ["old password you enterd was incorrect"],
        },
      ],
      status: httpStatus.BAD_REQUEST,
    });
  },

  // get all users in a list with pagination
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
