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
        details,
        state,
        largeImageKey,
        largeImageText,
        smallImageKey,
        smallImageText,
        buttons,
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

        const buttonsFiltered = buttons.filter((button) =>
          button.url.length > 6 ? true : false
        ) as Array<{
          label: string;
          url: string;
        }>;

        if (buttonsFiltered.length > 0) {
          activity["buttons"] = buttonsFiltered;
        }

        await rpc.setActivity(activity);
      });

      try {
        await rpc.login({ clientId: appId });
        res.json({
          variant: "success",
          message: "Connected!!",
          // rpc: rpc.application.id,
        });
      } catch (error) {
        console.error(error);
        res.json({
          variant: "error",
          message: "Error, verify App ID",
        });
      }
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
