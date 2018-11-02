export default class Option {
  constructor({id, value, label}) {
    this.id = id;
    this.value = value;
    this.label = label;
  }

  toJSON() {
    return this.value;
  }
}
