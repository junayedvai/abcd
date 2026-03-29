const encoder = new TextEncoder();

async function githubRequest(url, options = {}) {
  const token = process.env.GITHUB_TOKEN;
  if (!token) throw new Error("Missing GITHUB_TOKEN");
  const res = await fetch(url, {
    ...options,
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
      "X-GitHub-Api-Version": "2022-11-28",
      ...(options.headers || {})
    }
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GitHub API error: ${res.status} ${text}`);
  }
  return res.json();
}

export async function commitJsonFile(filePath, contentObj, message) {
  if (process.env.ENABLE_GITHUB_SYNC !== "true") {
    return { skipped: true, reason: "ENABLE_GITHUB_SYNC is not true" };
  }

  const owner = process.env.GITHUB_OWNER;
  const repo = process.env.GITHUB_REPO;
  const branch = process.env.GITHUB_BRANCH || "main";
  const base = process.env.GITHUB_CONTENT_BASE_PATH || "";
  if (!owner || !repo) throw new Error("Missing GITHUB_OWNER or GITHUB_REPO");

  const repoPath = `${base ? `${base.replace(/^\/|\/$/g, "")}/` : ""}${filePath}`;
  const getUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${repoPath}?ref=${branch}`;

  let sha;
  try {
    const existing = await githubRequest(getUrl);
    sha = existing.sha;
  } catch (err) {
    sha = undefined;
  }

  const putUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${repoPath}`;
  const body = {
    message,
    content: Buffer.from(JSON.stringify(contentObj, null, 2), "utf-8").toString("base64"),
    branch,
    ...(sha ? { sha } : {})
  };

  const response = await githubRequest(putUrl, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });

  return {
    skipped: false,
    commitUrl: response.commit?.html_url || null
  };
}
