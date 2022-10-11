import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { connectToDatabase } from "../../../lib/db";
import { validatePassword } from "../../../lib/auth";
export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    Providers.Credentials({
      async authorize(credentials) {
        const client = await connectToDatabase();
        const usersCollection = client.db("next-auth").collection("user");
        const user = await usersCollection.findOne({
          email: credentials.email,
        });
        if (!user) {
          client.close();
          throw new Error("No user found!");
        }
        if (await validatePassword(credentials.password, user.password)) {
          client.close();
          return { email: user.email, userId: user._id };
        }
        else {
            throw new Error('Invalid Credentials.')
        }
      },
    }),
  ],
});
