export default interface IPresence {
  id: string;
  appId: string;
  name: string;
  imageURL: string;
  details: string;
  state: string;
  largeImageKey: string;
  largeImageText: string;
  smallImageKey: string;
  smallImageText: string;
  buttons: Array<{
    label: string;
    url: string;
  }>;
  timestamp: boolean;
}
