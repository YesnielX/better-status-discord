import discordRPC from "discord-rpc";
import { NextApiRequest, NextApiResponse } from "next";

const rpc = new discordRPC.Client({
  transport: "ipc",
});

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === "POST") {
      console.log(req.body);
      const {
        appId,
        name,
        imageURL,
        details,
        state,
        largeImageKey,
        largeImageText,
        smallImageKey,
        smallImageText,
        timestamp,
      } = req.body;

      const startTimestamp = new Date();

      rpc.on("ready", async () => {
        const activity = {
          details,
          state,
          largeImageKey,
          largeImageText,
          smallImageKey,
          smallImageText,
          instance: false,
        };

        if (timestamp) {
          activity["startTimestamp"] = startTimestamp;
        }

        await rpc.setActivity(activity);
      });

      await rpc.login({ clientId: appId }).catch(console.error);

      res.json({
        messsage: "Success",
        // rpc: rpc.application.id,
      });
    } else if (req.method === "DELETE") {
      await rpc.clearActivity();

      res.json({
        message: "Disconnected!!",
      });
    } else {
      res.json({
        message: "Hello World",
      });
    }
  } catch (error) {
    console.error(error);

    res.status(501).json({
      message: "Internal Server Error",
    });
  }
};
