import discordRPC from "discord-rpc";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const rpc = new discordRPC.Client({
    transport: "ipc",
  });

  const startTimestamp = new Date();

  rpc.on("ready", () => {
    rpc.setActivity({
      details: `booped  times`,
      state: "in slither party",
      startTimestamp,
      largeImageKey: "snek_large",
      largeImageText: "tea is delicious",
      smallImageKey: "snek_small",
      smallImageText: "i am my own pillows",
      instance: false,
    });
  });

  rpc.login({ clientId: "841512699350745099" }).catch(console.error);

  res.json({
    messsage: "hello world",
    rpc: rpc.application.id,
  });
};
