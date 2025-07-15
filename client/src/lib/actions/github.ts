export const fetchTopLanguage = async (githubUsername: string) => {
  try {
    const res = await fetch(
      `https://api.github.com/users/${githubUsername}/repos`
    );

    if (!res.ok) {
      throw new Error("Failed to fetch GitHub repos");
    }

    const repos = await res.json();

    const languageCount: Record<string, number> = {};

    for (const repo of repos) {
      const lang = repo.language;
      if (lang) {
        languageCount[lang] = (languageCount[lang] || 0) + 1;
      }
    }

    const sorted = Object.entries(languageCount).sort((a, b) => b[1] - a[1]);

    const topLang = sorted.length > 0 ? sorted[0][0] : null;
    console.log("top laguage", topLang);
    return topLang;
  } catch (err) {
    console.error("Error in fetchTopLanguage:", err);
    return null;
  }
};
export const fetchRepos = async (githubUsername: string) => {
  try {
    const res = await fetch(
      `https://api.github.com/users/${githubUsername}/repos?per_page=100`
    );
    if (!res.ok) {
      throw new Error("Failed to fetch GitHub repos");
    }

    const repos = await res.json();
    return repos.map((repo: any) => ({
      name: repo.name,
      html_url: repo.html_url,
    }));
  } catch (error) {
    console.error("Error fetching repos:", error);
    return [];
  }
};
