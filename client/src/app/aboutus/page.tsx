import React from "react";

const page = () => {
  return (
    <div className="h-screen mt-30 px-4 py-8 max-w-3xl mx-auto overflow-y-auto">
      <h1 className="text-3xl font-bold mb-4">About 100xDevLogs</h1>

      <section className="mb-6">
        <p>
          <strong>100xDevLogs</strong> is a daily developer logging platform
          designed to help developers track their progress, stay consistent, and
          grow their coding habits.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Why We Built This</h2>
        <p>
          We noticed many developers struggle with accountability and wanted to
          create a simple way to maintain daily discipline. Inspired by
          100x.dev, this tool helps developers build momentum and showcase their
          growth.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Who's Behind This</h2>
        <p>
          Built by passionate devs who love open-source, habit-building, and
          developer communities. You can contribute to the project or reach out
          at <strong>https://github.com/hemanth-1321/logs</strong>.
        </p>
      </section>
    </div>
  );
};

export default page;
