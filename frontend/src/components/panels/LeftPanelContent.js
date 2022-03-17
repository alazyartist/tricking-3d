import React from "react";
import TrickInfo from "../TrickInfo";
import ActiveDevNote from "../ActiveDevNote";
import DiscordLink from "../DiscordLink";

import PoweredByTorque from "../PoweredByTorque";
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
