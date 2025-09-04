FROM node:18-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json* yarn.lock* pnpm-lock.yaml* ./
RUN \
if [ -f package-lock.json ]; then npm ci; \
elif [ -f yarn.lock ]; then yarn --frozen-lockfile; \
elif [ -f pnpm-lock.yaml ]; then npm i -g pnpm && pnpm i --frozen-lockfile; \
else npm i; fi


FROM node:18-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# NEXT_PUBLIC_API_BASE_URL se inyecta por docker-compose
RUN npm run build


FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app .
EXPOSE 3000
CMD ["npm", "start"]