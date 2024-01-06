import DiscordLink from "@components/info/DiscordLink";
import React from "react";

const FeedbackCard: React.FC = () => {
  return (
    <div className="space-y-2 p-4 pt-0 font-inter text-sm font-light text-zinc-300">
      <h2 className="text-2xl font-bold">Give us your feedback!</h2>
      <p>We would love to hear your thoughts and suggestions.</p>
      <DiscordLink />
    </div>
  );
};

export default FeedbackCard;
