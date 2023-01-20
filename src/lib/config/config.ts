import fs from 'fs';

type ConfigName = string;
type ConfigValue = string | number | boolean;

export abstract class Config {
  abstract readonly namespace: string;
  protected values: Map<ConfigName, ConfigValue> = new Map();
  protected _override: Map<ConfigName, ConfigValue> = new Map();

  protected init() {
    this.setDefaults();
    this.setOverrides();
  }

  get(key): ConfigValue {
    if (this._override.has(key)) {
      return this._override.get(key);
    }
    return this.values.get(key);
  }

  override(key: ConfigName, value: ConfigValue) {
    if (!this.values.has(key)) {
      throw new Error(`No config param exists for '${key}' in '${this.namespace}' namespace.`);
    }
    this._override.set(key, value);
  }

  protected setOverrides(): void {
    const pathToConfig = `../../../configs/${this.namespace.toLowerCase()}.json`;
    if (fs.existsSync(pathToConfig)) {
      // eslint-disable-next-line security/detect-non-literal-require
      const overrideValues: Map<ConfigName, ConfigValue> = require(pathToConfig);
      overrideValues.forEach((value, key) => this.override(key, value));
    }
  }

  protected abstract setDefaults(): void;
}
