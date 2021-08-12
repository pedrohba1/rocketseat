export function changeTab(tab) {
    return {
        type: '@user/CHANGE_TAB',
        payload: { tab },
    };
}
