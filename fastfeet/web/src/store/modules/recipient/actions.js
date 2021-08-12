export function passEditData(recipient) {
    return {
        type: '@recipient/EDIT_REQUEST',
        payload: { recipient },
    };
}
