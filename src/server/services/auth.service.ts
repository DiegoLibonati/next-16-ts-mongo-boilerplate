import bcryptjs from "bcryptjs";
import { SignJWT } from "jose";

import { connectDb } from "@/server/configs/mongo.config";
import { getEnvs } from "@/server/configs/env.config";

import { JWT_EXPIRATION } from "@/server/constants/vars.constant";

import { UserModel } from "@/server/models/user.model";

export const AuthService = {
  async login(email: string, password: string): Promise<string | null> {
    await connectDb();

    const user = await UserModel.findOne({ email: email.toLowerCase() }).select("+password").exec();

    if (!user) return null;

    const valid = await bcryptjs.compare(password, user.password);
    if (!valid) return null;

    const secret = new TextEncoder().encode(getEnvs().JWT_SECRET || "");
    return new SignJWT({ sub: String(user._id), email: user.email })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime(JWT_EXPIRATION)
      .sign(secret);
  },
};
