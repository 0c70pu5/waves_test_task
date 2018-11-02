export default function firstOrNull(array = [], predicate) {
  const items = array.filter(predicate);

  if (items.length === 0) {
    return null;
  }

  return items[0];
}
