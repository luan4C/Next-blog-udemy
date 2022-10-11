import { connectToDatabase } from "../../../../lib/db";
import { getSession } from "next-auth/client";
import { validatePassword, hashPassword } from "../../../../lib/auth";

export default async function handler(req, res) {
    console.log(req)
  if (req.method !== "PATCH") {
    return;
  }
  if (req.method === "PUT") {
    const session = getSession({ req: req });
    if (!session) {
      return res.status(401);
    }
    const { newPass, oldPass } = req.body;
    console.log(newPass, oldPass)
    const client = await connectToDatabase();
    const db = client.db("next-auth");
    const user = await db.collection("user").findOne({ email: session.email });
    if (await validatePassword(oldPass, user.password)) {
      let newpassHash = await hashPassword(newPass);
      await db.collection("user").updateOne({ _id: user._id }, {$set: {password: newpassHash}});
    }
    client.close();
  }
}
