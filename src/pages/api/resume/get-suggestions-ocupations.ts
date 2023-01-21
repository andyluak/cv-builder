import { type NextApiRequest, type NextApiResponse } from "next";
import occupations from "static/occupations.json";

import { getServerAuthSession } from "../../../server/common/get-server-auth-session";

const getSuggestedOccupations = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const session = await getServerAuthSession({ req, res });
  if (!session) {
    res.status(401).json({
      error:
        "You must be signed in to view the protected content on this page.",
    });
    return;
  }

  if (req.method !== "POST") {
    res.status(405).json({ error: "Method Not Allowed" });
    return;
  }
  try {
    const { occupationPart } = req.body;

    if (!occupationPart || occupationPart.length < 2) {
      res.status(200).json([]);
      return;
    }

    const data = occupations.occupations.filter((occupation) => {
      const firstNLetters = occupation.slice(0, occupationPart.length);
      return firstNLetters.toLowerCase().includes(occupationPart.toLowerCase());
    });

    res.status(200).json(data);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error });
  }
};

export default getSuggestedOccupations;
