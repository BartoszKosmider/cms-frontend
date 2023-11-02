export abstract class BaseEditor<T> {
  protected static genericInputs: string[] = ['value'];

  public set value(value: T) {
    this._value = value;
  }

  public get value(): T {
    return this._value;
  }

  private _value!: T;
}
