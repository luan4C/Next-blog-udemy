import { connectToDatabase } from "../../../lib/db";
import { getSession } from "next-auth/client";
import { validatePassword, hashPassword } from "../../../lib/auth";

export default async function handler(req, res) {

  if (req.method !== "PATCH") {
    return res.status(404);
  } else {
    const session = await getSession({ req: req });
    if (!session) {
      return res.status(401);
    }
    
    const { newPass, oldPass } = req.body;

    const client = await connectToDatabase();
    const db = client.db("next-auth");
    const user = await db.collection("user").findOne({ email: session.user.email });
   
    if (await validatePassword(oldPass, user.password)) {
      
      let newpassHash = await hashPassword(newPass);
      await db
        .collection("user")
        .updateOne({ email: user.email }, { $set: { password: newpassHash } });
      client.close();
      return res.status(200);
    } else {
      client.close();
      return res.status(401).json({ message: "Wrong old password" });
    }
  }
}
