import React from "react";

const page = () => {
  return (
    <div className="h-screen mt-30 px-4 py-8 max-w-3xl mx-auto overflow-y-auto">
      <h1 className="text-3xl font-bold mb-4">About DailyDev</h1>

      <section className="mb-6">
        <p>
          <strong>DailyDev</strong> is a daily developer logging platform
          designed to help developers track their progress, stay consistent, and
          grow their coding habits. Whether you're learning to code, working on
          open source, or building your dream project — this helps you stay accountable.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Why We Built This</h2>
        <p>
          Developers often struggle with consistency and progress tracking.
          <strong> DailyDev</strong> was built to give you a simple space to log your day,
          reflect on what you’ve built, and build momentum — one commit at a time.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Contribute</h2>
        <p>
          We believe in building in public and welcome contributions from the
          developer community. You can find the source code and contribute at:{" "}
          <a
            href="https://github.com/hemanth-1321/DailyDevs"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            github.com/hemanth-1321/DailyDevs
          </a>
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">About the Creator</h2>
        <p>
          Hi, I’m Hemanth Kumar M — a self-taught full-stack developer who loves building
          clean systems, open-source projects, and tools that help other devs. I’m actively
          exploring the intersection of infra and AI tools.
        </p>
        <p className="mt-2">
          Learn more about me and my work at:{" "}
          <a
            href="https://www.hemanth.buzz"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            hemanth.buzz
          </a>
        </p>
      </section>
    </div>
  );
};

export default page;
