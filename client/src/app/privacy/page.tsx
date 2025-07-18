import React from "react";

const page = () => {
  return (
    <div className="mt-20 px-4 py-8 max-w-3xl mx-auto ">
      <h1 className="text-3xl font-bold mb-4">
        Privacy Policy for 100xDevLogs
      </h1>
      <p className="text-sm text-gray-500 mb-6">
        Effective Date:{" "}
        {new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>

      <section className="mb-6">
        <p>
          At <strong>100xDevLogs</strong>, we take your privacy seriously. This
          Privacy Policy outlines the types of information we collect, how we
          use it, and your rights regarding your data. By using 100xDevLogs, you
          agree to the terms outlined in this policy.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">
          1. Information We Collect
        </h2>
        <ul className="list-disc ml-6">
          <li>
            <strong>User Information:</strong> GitHub ID, username, email
            (optional), avatar URL, and access token.
          </li>
          <li>
            <strong>Logs:</strong> Your development logs, summaries,
            repositories, and timestamps.
          </li>
          <li>
            <strong>User Metrics:</strong> Total logs, current/best streaks,
            total commits, and commit heatmaps.
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">2. How We Use Your Data</h2>
        <p>
          We use your data to authenticate you via GitHub, show your logs, track
          progress, calculate streaks, and generate activity analytics to
          enhance your experience.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">
          3. Data Sharing & Disclosure
        </h2>
        <p>
          We do <strong>not sell</strong> your data. Your information is only
          shared:
        </p>
        <ul className="list-disc ml-6">
          <li>With your consent</li>
          <li>To comply with legal obligations</li>
          <li>To protect our rights or safety</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">4. Data Security</h2>
        <p>
          We use industry-standard practices to protect your data, including
          secure token handling, encryption, and restricted database access.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">5. Your Rights</h2>
        <p>You can:</p>
        <ul className="list-disc ml-6">
          <li>Delete your account and associated data</li>
          <li>Download or view your logs</li>
          <li>Disconnect GitHub at any time</li>
        </ul>
        <p>
          To do so, please contact us at <strong>[your support email]</strong>.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">
          6. Children&apos;s Privacy
        </h2>
        <p>
          This service is not intended for children under 13, and we do not
          knowingly collect data from them.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">
          7. Changes to This Policy
        </h2>
        <p>
          We may update this policy from time to time. You&rsquo;ll be notified
          of significant changes via email or in-app notification.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">8. Contact Us</h2>
        <p>
          Have questions or concerns? Contact us at:{" "}
          <strong>h100xdevs@gmail.com</strong>
        </p>
      </section>
    </div>
  );
};

export default page;
