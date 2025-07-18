import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { JWT } from "next-auth/jwt";
export const NEXT_AUTH_CONFIG: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async jwt({ token, account, profile }): Promise<JWT> {
      if (account?.provider === "github" && profile) {
        const githubProfile = profile as {
          id: number;
          login: string;
          avatar_url: string;
          email?: string;
          name?: string;
        };

        token.uid = githubProfile.id.toString();
        token.username = githubProfile.login;
        token.avatarUrl = githubProfile.avatar_url;
        token.accessToken = account.access_token;
        token.role = "user";
        token.email = githubProfile.email;

        // console.log(" JWT Token Created:", token);
      }
      return token;
    },

    async session({ session, token }) {
      session.user.id = token.uid!;
      session.user.jwtToken = token.accessToken!;
      session.user.role = token.role!;
      session.user.avatarUrl = token.avatarUrl;

      session.user.email = token.email || session.user.email || "";
      session.user.name = token.name || session.user.name || "";
      session.user.login = token.username || session.user.login || "";
      // console.log("session Created:", session);

      return session;
    },

    async signIn({ user, account, profile }) {
      return true;
    },
  },
};
