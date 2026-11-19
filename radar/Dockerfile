FROM oven/bun:1.2.23
WORKDIR /app
COPY radar/index.ts ./index.ts
COPY radar/package.json ./package.json
ENV NODE_ENV=production
EXPOSE 3000
CMD ["bun", "run", "/app/index.ts"]
