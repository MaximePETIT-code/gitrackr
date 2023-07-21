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
            repositories(first: 10, ownerAffiliations: [OWNER], orderBy: { field: STARGAZERS, direction: DESC }) {
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
                languages(first: 5, orderBy: { field: SIZE, direction: DESC }) {
                  edges {
                    size
                    node {
                      name
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
          const TopRepositoriesList = await Promise.all(
            repositories.nodes.map(async (repo) => {
              const repoName = repo.name;

              // Check if repository exists
              const responseCheckRepo = await fetch(
                `https://api.github.com/repos/${userId}/${repoName}`,
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                  },
                }
              );

              if (responseCheckRepo.status === 404) {
                // Repository not found (probably deleted), return null
                return null;
              }

              if (repo.defaultBranchRef === null) {
                // No default branch reference, exclude the repo from the list
                return null;
              }

              return {
                name: repoName,
                forkCount: repo.forkCount,
                stargazerCount: repo.stargazerCount,
                commitCount: repo.defaultBranchRef.target.history.totalCount,
                languages: repo.languages.edges.map((edge) => ({
                  name: edge.node.name,
                  size: edge.size,
                })),
              };
            })
          ).then((repos) => repos.filter((repo) => repo !== null));

          resolve({
            totalRepositoriesCount: repositories.totalCount,
            TopRepositoriesList,
          });
        } else {
          reject(new Error("Error occurred"));
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
}
