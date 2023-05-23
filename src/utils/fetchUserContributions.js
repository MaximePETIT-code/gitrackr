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
            }
          }
        `,
      }),
    });

    const data = await response.json();
    const contributionCalendar =
      data?.data?.user?.contributionsCollection?.contributionCalendar;

    if (contributionCalendar) {
      const commitsByMonth = contributionCalendar.weeks.reduce(
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

      return commitsByMonth;
    } else {
      throw new Error("Failed to fetch user contributions");
    }
  } catch (error) {
    throw new Error("Failed to fetch user contributions");
  }
}
