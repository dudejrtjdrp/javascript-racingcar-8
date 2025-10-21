export default class ReplaceObjectString {
  static replace(inputObject) {
    const objectKey = Object.keys(inputObject)[0];
    const objectValue = '-'.repeat(inputObject[objectKey]);
    return [objectKey, objectValue];
  }

  static convert(inputObject) {
    const [objectKey, objectValue] = this.replace(inputObject);
    return `${objectKey} : ${objectValue}`;
  }
}
