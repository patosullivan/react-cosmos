export function removeFixtureNameExtension(fixtureName) {
    return fixtureName.replace(/\.(js|jsx|ts|tsx|md|mdx)$/, '');
}
export function removeFixtureNameSuffix(fixtureNameWithoutExtension, suffix) {
    return fixtureNameWithoutExtension.replace(new RegExp(`\\.${suffix}$`), '');
}
