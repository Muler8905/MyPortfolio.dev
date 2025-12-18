
export interface GitHubConfig {
  owner: string;
  repo: string;
  token: string;
  branch: string;
}

export const saveGitHubConfig = (config: GitHubConfig) => {
  localStorage.setItem('gh_sync_config', JSON.stringify(config));
};

export const getGitHubConfig = (): GitHubConfig | null => {
  const saved = localStorage.getItem('gh_sync_config');
  return saved ? JSON.parse(saved) : null;
};

export const pushToGitHub = async (path: string, content: any, message: string): Promise<boolean> => {
  const config = getGitHubConfig();
  if (!config || !config.token) throw new Error("GitHub configuration missing");

  const url = `https://api.github.com/repos/${config.owner}/${config.repo}/contents/${path}`;
  const encodedContent = btoa(unescape(encodeURIComponent(JSON.stringify(content, null, 2))));

  try {
    // 1. Try to get the existing file to get its SHA
    let sha: string | undefined;
    const getRes = await fetch(url, {
      headers: { 'Authorization': `token ${config.token}` }
    });

    if (getRes.ok) {
      const fileData = await getRes.json();
      sha = fileData.sha;
    }

    // 2. Put the new content
    const putRes = await fetch(url, {
      method: 'PUT',
      headers: {
        'Authorization': `token ${config.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        content: encodedContent,
        sha,
        branch: config.branch || 'main'
      })
    });

    if (!putRes.ok) {
      const errorData = await putRes.json();
      throw new Error(errorData.message || "Failed to push to GitHub");
    }

    return true;
  } catch (error) {
    console.error("GitHub Sync Error:", error);
    throw error;
  }
};
