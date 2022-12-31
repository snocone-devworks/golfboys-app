export const isEqual = (value1: string | undefined, value2: string | undefined) => {
  let string1: string = value1 ? value1.trim().toLocaleLowerCase() : '';
  let string2: string = value2 ? value2.trim().toLocaleLowerCase() : '';

  return string1 === string2;
}