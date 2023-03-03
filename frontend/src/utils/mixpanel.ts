import Mixpanel from "mixpanel-browser";
import { env } from "env/client.mjs";

Mixpanel.init(env.NEXT_PUBLIC_MIXPANEL_TOKEN, { debug: true });
const mixpanel = Mixpanel;
export default mixpanel;
