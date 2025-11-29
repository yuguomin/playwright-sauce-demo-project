# 第一阶段：构建阶段
FROM node:18-bullseye AS builder

WORKDIR /tests
COPY package.json package-lock.json* ./
RUN npm ci --no-fund --no-audit
COPY . .

# 第二阶段：运行时阶段
FROM mcr.microsoft.com/playwright:v1.57.0

WORKDIR /tests

# 复制文件
COPY --from=builder /tests/ .

# 创建用户
RUN groupadd --system --gid 2000 playwright && \
    useradd --system --uid 2000 --gid 2000 playwright

# 关键步骤：修复 node_modules 中二进制文件的执行权限
RUN chown -R playwright:playwright /tests && \
    find /tests/node_modules/.bin -type f -exec chmod +x {} \; && \
    ls -la /tests/node_modules/.bin/playwright

USER playwright

CMD ["npx", "playwright", "test"]