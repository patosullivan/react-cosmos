import { omit } from 'lodash-es';
import { registerPlaygroundShortcuts } from 'react-cosmos-core';
import { createPlugin } from 'react-plugin';
const { onLoad, register } = createPlugin({
    name: 'core',
    initialState: {
        commands: {},
    },
    defaultConfig: {
        projectId: 'defaultProjectId',
        fixturesDir: '__fixtures__',
        fixtureFileSuffix: 'fixture',
        devServerOn: false,
    },
    methods: {
        registerCommands,
        runCommand,
        getProjectId,
        getFixtureFileVars,
        isDevServerOn,
    },
});
export { register };
if (process.env.NODE_ENV !== 'test')
    register();
onLoad(pluginContext => registerPlaygroundShortcuts(command => runCommand(pluginContext, command)));
onLoad(pluginContext => {
    const { projectId } = pluginContext.getConfig();
    document.title = projectId;
});
function registerCommands(context, commands) {
    context.setState(prevState => {
        const existingCommandNames = Object.keys(prevState.commands);
        Object.keys(commands).forEach(commandName => {
            if (existingCommandNames.indexOf(commandName) !== -1)
                throw new Error(`Command "${commandName} already registered`);
        });
        return {
            ...prevState,
            commands: { ...prevState.commands, ...commands },
        };
    });
    return () => context.setState(prevState => ({
        ...prevState,
        commands: omit(prevState.commands, ...Object.keys(commands)),
    }));
}
function runCommand(context, name) {
    const { commands } = context.getState();
    if (!commands[name])
        return console.warn(`Command "${name}" is not available`);
    commands[name]();
}
function getProjectId({ getConfig }) {
    return getConfig().projectId;
}
function getFixtureFileVars({ getConfig }) {
    const { fixturesDir, fixtureFileSuffix } = getConfig();
    return { fixturesDir, fixtureFileSuffix };
}
function isDevServerOn({ getConfig }) {
    return getConfig().devServerOn;
}
