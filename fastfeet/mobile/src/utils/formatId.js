export default function formatId(id) {
    if (id < 10) {
        return `0${id}`;
    }
    return id;
}
