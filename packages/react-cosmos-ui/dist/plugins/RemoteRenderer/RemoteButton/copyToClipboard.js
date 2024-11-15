export async function copyToClipboard(text) {
    const { permissions, clipboard } = navigator;
    let permissionDenied = false;
    try {
        // @ts-ignore Sorry, TS, MDN begs to differ https://developer.mozilla.org/en-US/docs/Web/API/Permissions/query#Parameters
        const { state } = await permissions.query({ name: 'clipboard-write' });
        permissionDenied = state !== 'granted' && state !== 'prompt';
    }
    catch (err) {
        // Some browsers (eg. Firefox 66) don't support the 'clipboard'
        // PermissionDescriptor but support clipboard.writeText. So unless
        // permission is explicitly denied, we try to copy to clipboard even if the
        // permission check failed.
    }
    if (permissionDenied) {
        throw new Error('Permission denied to write to clipboard');
    }
    try {
        await clipboard.writeText(text);
    }
    catch (err) {
        throw new Error('Failed to write to clipboard');
    }
}
