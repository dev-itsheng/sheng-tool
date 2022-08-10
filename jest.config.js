module.exports = {
    // 由于 pnpm 使用符号链接，因此需要加一个 .pnpm 路径
    transformIgnorePatterns: ['<rootDir>/node_modules/.pnpm/(?!(lodash-es|dayjs|other-es-lib))']
};
