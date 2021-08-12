export function passEditData(pack) {
    return {
        type: '@package/EDIT_REQUEST',
        payload: { pack },
    };
}
