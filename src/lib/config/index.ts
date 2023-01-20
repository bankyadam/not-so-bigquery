import * as ConfigNamespaces from './namespaces';
import { Config } from './config';

class ConfigPool {
  private _namespace: Map<string, Config> = new Map<string, Config>();

  constructor() {
    this.addNamespace(new ConfigNamespaces.QueryCacheConfig);
  }

  namespace(name): Config {
    return this._namespace.get(name);
  }

  private addNamespace(config: Config) {
    this._namespace.set(config.namespace, config);
  }
}

export default new ConfigPool();
