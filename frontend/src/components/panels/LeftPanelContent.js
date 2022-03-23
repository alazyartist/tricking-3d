import React from "react";
import TrickInfo from "../info/TrickInfo";
import ActiveDevNote from "../info/ActiveDevNote";
import DiscordLink from "../info/DiscordLink";

import PoweredByTorque from "../info/PoweredByTorque";
function LeftPanelContent() {
	return (
		<>
			<TrickInfo />
			<ActiveDevNote />
			<DiscordLink />
			<PoweredByTorque />
		</>
	);
}

export default LeftPanelContent;
