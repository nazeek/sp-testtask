export function toggleArrayItem<T>(array: T[], item: T): T[] {
  const newArray = [...array];
  const index = newArray.indexOf(item);

  if (index > -1) {
    newArray.splice(index, 1);
  } else {
    newArray.push(item);
  }

  return newArray;
}
