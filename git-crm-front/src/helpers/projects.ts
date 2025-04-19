export const extractRepoInfo = (url: string): string => {
  try {
    const cleanUrl = url.replace(/(https?:\/\/)?(www\.)?/, "");
    const parts = cleanUrl.split("/");
    const owner = parts[1];
    const repo = parts[2].replace(/\.git$/, "");
    return `${owner}/${repo}`;
  } catch (error) {
    throw new Error("Invalid repository URL format");
  }
};
