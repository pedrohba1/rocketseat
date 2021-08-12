export function passEditData(courier) {
    return {
        type: '@courier/EDIT_REQUEST',
        payload: { courier },
    };
}
