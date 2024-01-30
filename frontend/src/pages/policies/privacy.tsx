import React from "react";

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="relative left-[5vw] top-[5vh] mb-[14vh] flex h-full w-[90vw] flex-col rounded-xl bg-zinc-800 bg-opacity-70 p-4 text-zinc-300 md:left-[20vw] md:mb-0 md:w-[60vw]">
      <h1 className="mb-4 text-3xl font-bold">Privacy Policy</h1>
      <p className="mb-4">
        This privacy policy applies to the use of our application and website
        (collectively referred to as the "Service").
      </p>
      <h2 className="mb-2 text-2xl font-bold">Information We Collect</h2>
      <p className="mb-4">
        We may collect personal information such as your name, email address,
        and other relevant details when you interact with our Service.
      </p>
      <h2 className="mb-2 text-2xl font-bold">How We Use Your Information</h2>
      <p className="mb-4">
        We use the information we collect to provide and improve our Service,
        respond to your inquiries, and send you relevant updates and
        notifications.
      </p>
      <h2 className="mb-2 text-2xl font-bold">Sharing Your Information</h2>
      <p className="mb-4">
        We do not sell, trade, or otherwise transfer your personal information
        to third parties without your consent, except as required by law.
      </p>
      <h2 className="mb-2 text-2xl font-bold">Security</h2>
      <p className="mb-4">
        We take reasonable measures to protect your personal information from
        unauthorized access, use, or disclosure.
      </p>
      <h2 className="mb-2 text-2xl font-bold">
        Changes to This Privacy Policy
      </h2>
      <p className="mb-4">
        We may update this privacy policy from time to time. We will notify you
        of any changes by posting the updated policy on our website.
      </p>
      <h2 className="mb-2 text-2xl font-bold">Contact Us</h2>
      <p className="mb-4">
        If you have any questions or concerns about this privacy policy, please
        contact us at torquetricking@gmail.com.
      </p>
    </div>
  );
};

export default PrivacyPolicy;