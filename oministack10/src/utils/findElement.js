export default function findElement(arr, propName, propValue) {
  for (var i = 0; i < arr.length; i++)
    if (arr[i][propName] === propValue) return { item: arr[i], index: i };
  // will return undefined if not found; you could return a default instead
}
