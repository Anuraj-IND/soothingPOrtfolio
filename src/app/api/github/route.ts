import { NextResponse } from "next/server";

const GITHUB_USERNAME = "Anuraj-IND";

interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  watchers_count: number;
  open_issues_count: number;
  created_at: string;
  pushed_at: string;
  updated_at: string;
  topics: string[];
  visibility: string;
}

interface GitHubUser {
  login: string;
  name: string | null;
  avatar_url: string;
  html_url: string;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
  location: string | null;
  blog: string | null;
  twitter_username: string | null;
  company: string | null;
  created_at: string;
}

export async function GET() {
  try {
    // Fetch user data
    const userResponse = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, {
      headers: {
        "Accept": "application/vnd.github.v3+json",
        "User-Agent": "Portfolio-App",
      },
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!userResponse.ok) {
      throw new Error(`GitHub user API error: ${userResponse.status}`);
    }

    const userData: GitHubUser = await userResponse.json();

    // Fetch repositories
    const reposResponse = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=pushed&per_page=100`,
      {
        headers: {
          "Accept": "application/vnd.github.v3+json",
          "User-Agent": "Portfolio-App",
        },
        next: { revalidate: 3600 }, // Cache for 1 hour
      }
    );

    if (!reposResponse.ok) {
      throw new Error(`GitHub repos API error: ${reposResponse.status}`);
    }

    const reposData: GitHubRepo[] = await reposResponse.json();

    // Filter and format repositories
    const repos = reposData
      .filter((repo) => !repo.name.includes(".github")) // Exclude profile repo
      .map((repo) => ({
        id: repo.id,
        name: repo.name,
        fullName: repo.full_name,
        description: repo.description || "No description provided",
        url: repo.html_url,
        homepage: repo.homepage,
        language: repo.language,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        watchers: repo.watchers_count,
        issues: repo.open_issues_count,
        topics: repo.topics,
        createdAt: repo.created_at,
        pushedAt: repo.pushed_at,
        updatedAt: repo.updated_at,
        visibility: repo.visibility,
      }))
      .sort((a, b) => b.stars - a.stars); // Sort by stars

    // Format user data
    const user = {
      username: userData.login,
      name: userData.name,
      avatar: userData.avatar_url,
      url: userData.html_url,
      bio: userData.bio,
      publicRepos: userData.public_repos,
      followers: userData.followers,
      following: userData.following,
      location: userData.location,
      blog: userData.blog,
      twitter: userData.twitter_username,
      company: userData.company,
    };

    // Calculate stats
    const totalStars = repos.reduce((acc, repo) => acc + repo.stars, 0);
    const totalForks = repos.reduce((acc, repo) => acc + repo.forks, 0);
    const languages = repos
      .filter((repo) => repo.language)
      .reduce((acc, repo) => {
        const lang = repo.language as string;
        acc[lang] = (acc[lang] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

    return NextResponse.json({
      user,
      repos,
      stats: {
        totalStars,
        totalForks,
        totalRepos: repos.length,
        languages: Object.entries(languages)
          .map(([name, count]) => ({ name, count }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 10),
      },
    });
  } catch (error) {
    console.error("GitHub API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch GitHub data" },
      { status: 500 }
    );
  }
}
