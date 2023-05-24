export async function fetchUserContributions(userId) {
  try {
    const response = await fetch(`https://api.github.com/graphql`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
          query {
            user(login: "${userId}") {
              contributionsCollection {
                contributionCalendar {
                  totalContributions
                  weeks {
                    contributionDays {
                      date
                      contributionCount
                    }
                  }
                }
              }
              repositories(first: 100, ownerAffiliations: [OWNER]) {
                nodes {
                  createdAt
                }
              }
            }
          }
        `,
      }),
    });

    const data = await response.json();
    const contributionCalendar =
      data?.data?.user?.contributionsCollection?.contributionCalendar;
    const repositories = data?.data?.user?.repositories?.nodes || [];

    if (contributionCalendar) {
      const contributionsByMonth = contributionCalendar.weeks.reduce(
        (result, week) => {
          week.contributionDays.forEach((day) => {
            const date = new Date(day.date);
            const year = date.getFullYear();
            const month = date.getMonth();

            if (!result[year]) {
              result[year] = {};
              result[year].total = 0;
            }
            if (!result[year][month]) {
              result[year][month] = 0;
            }
            result[year][month] += day.contributionCount;
            result[year].total += day.contributionCount;
          });

          return result;
        },
        {}
      );

      const contributionsStartYear = parseInt(Object.keys(contributionsByMonth)[0]);
      const contributionsStartMonth = parseInt(
        Object.keys(contributionsByMonth[contributionsStartYear])[0]
      );

      const repositoriesByMonth = repositories.reduce((result, repository) => {
        const createdAt = new Date(repository.createdAt);
        const year = createdAt.getFullYear();
        const month = createdAt.getMonth();

        if (
          year >= contributionsStartYear &&
          (year !== contributionsStartYear || month >= contributionsStartMonth)
        ) {
          if (!result[year]) {
            result[year] = {};
            result[year].total = 0;
          }
          if (!result[year][month]) {
            result[year][month] = 0;
          }
          result[year][month]++;
          result[year].total++;
        }

        return result;
      }, {});

      // Fill missing keys with 0
      for (const year in contributionsByMonth) {
        for (const month in contributionsByMonth[year]) {
          if (!repositoriesByMonth[year]) {
            repositoriesByMonth[year] = {};
            repositoriesByMonth[year].total = 0;
          }
          if (!repositoriesByMonth[year][month]) {
            repositoriesByMonth[year][month] = 0;
          }
        }
      }

      return {
        contributionsByMonth,
        repositoriesByMonth,
      };
    } else {
      throw new Error("Failed to fetch user contributions");
    }
  } catch (error) {
    throw new Error("Failed to fetch user contributions");
  }
}
