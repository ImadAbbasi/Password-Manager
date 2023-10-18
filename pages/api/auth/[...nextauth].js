import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import connectMongo from "@/database/conn";
import Users from "@/model/userSchema";
import { compare } from "bcryptjs";

export default NextAuth({
  providers: [
    // Google Provider
    GoogleProvider({
      clientId:
        "296591398160-hl85fid2d4vo7ql6o291t5vhhsc9diu0.apps.googleusercontent.com",
      clientSecret: "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",
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials, req) {
        connectMongo().catch((error) => {
          error: "Connection Failed...";
        });
        // check if user exists
        const result = await Users.findOne({ email: credentials.email });

        if (!result) {
          throw new Error("No User Found With This Please Sign Up!");
        }
        // compare hashed password and user password
        const checkPassword = await compare(
          credentials.password,
          result.password
        );
        // incorrect password
        if (!checkPassword || result.email !== credentials.email) {
          throw new Error("Incorrect Email or Password!");
        }
        return result;
      },
    }),
  ],
  secret: "Z1d1KEJeVFdRWGRbMDAieiVbfiAjNw==",
});
