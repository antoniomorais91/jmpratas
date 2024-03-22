import jwt from "jsonwebtoken";
import { IncomingHttpHeaders } from "http";

export const dynamic: string = "force-dynamic";

const AuthUser = async (req: { headers: IncomingHttpHeaders }): Promise<any | false> => {
  const authHeader: string | string[] | undefined = req.headers["Authorization"];

  if (typeof authHeader === "string") {
    const token: string | undefined = authHeader.split(" ")[1];

    if (!token) return false;

    try {
      const extractAuthUserInfo: any = jwt.verify(token, "default_secret_key");
      if (extractAuthUserInfo) return extractAuthUserInfo;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  return false;
};

export default AuthUser;
