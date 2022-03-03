module.exports = {
    transformIgnorePatterns: ['<rootDir>/node_modules/(?!(lodash-es|dayjs|other-es-lib))'],
    testPathIgnorePatterns: ['<rootDir>/src/browser.ts']
}
