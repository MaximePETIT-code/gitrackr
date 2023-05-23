export function fetchUserRepositories(userId) {
  const token = import.meta.env.VITE_GITHUB_TOKEN;

  return new Promise((resolve, reject) => {
    fetch(`https://api.github.com/graphql`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
          query {
            user(login: "${userId}") {
              repositories(isFork: false, privacy: PUBLIC, first: 10, orderBy: { field: STARGAZERS, direction: DESC }) {
                totalCount
                nodes {
                  name
                  stargazerCount
                  forkCount
                  defaultBranchRef {
                    target {
                      ... on Commit {
                        history {
                          totalCount
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        `,
      }),
    })
      .then((response) => response.json())
      .then(async (data) => {
        const repositories = data?.data?.user?.repositories;

        if (repositories) {
          const repositoryList = await Promise.all(
            repositories.nodes.map(async (repo) => {
              const repoName = repo.name;

              // Check if repository exists
              const responseCheckRepo = await fetch(
                `https://api.github.com/repos/${userId}/${repoName}`,
                {
                  headers: {
                    Authorization: `Bearer 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`,
                    "Content-Type": "application/json",
                  },
                }
              );

              if (responseCheckRepo.status === 404) {
                // Repository not found (probably deleted), return null
                return null;
              }

              const responseContributors = await fetch(
                `https://api.github.com/repos/${userId}/${repoName}/contributors`,
                {
                  headers: {
                    Authorization: `Bearer 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`,
                    "Content-Type": "application/json",
                  },
                }
              );

              const contributorsData = await responseContributors.json();

              let contributors = [];
              if (Array.isArray(contributorsData)) {
                contributors = contributorsData.map((contributor) => ({
                  name: contributor.login,
                  commitCount: contributor.contributions,
                }));
              }

              let totalCommitCount = 0;
              let page = 1;
              let hasNextPage = true;

              while (hasNextPage) {
                const responseCommits = await fetch(
                  `https://api.github.com/repos/${userId}/${repoName}/commits?per_page=100&page=${page}`,
                  {
                    headers: {
                      Authorization:
                        "Bearer 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",
                      "Content-Type": "application/json",
                    },
                  }
                );

                const commitsData = await responseCommits.json();

                totalCommitCount += commitsData.length;

                hasNextPage = commitsData.length === 100;
                page++;
              }

              return {
                name: repoName,
                forkCount: repo.forkCount,
                stargazerCount: repo.stargazerCount,
                totalCommitCount,
                contributors,
              };
            })
          );

          resolve(repositoryList);
        } else {
          reject(new Error("Error occurred"));
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
}
