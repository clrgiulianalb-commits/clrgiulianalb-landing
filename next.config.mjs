/** @type {import('next').NextConfig} */
const nextConfig = {
  // Next genera AGENTS.md y CLAUDE.md por su cuenta. Este repo ya documenta
  // todo en el README, así que no hace falta el ruido extra.
  agentRules: false,
};

export default nextConfig;
