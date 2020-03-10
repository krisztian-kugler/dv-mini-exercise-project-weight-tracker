interface ComponentConfig {
  selector: string;
  providers?: any[];
}

export function Component(config: ComponentConfig) {
  const { selector, providers = [] } = config;

  if (!selector.includes("-")) throw new Error(`'${selector}' is not a valid component selector. Please include at least one dash.`);

  return function<T extends { new (...args: any[]): any }>(constructor: T) {
    const configuredConstructor = class extends constructor {
      providers: { [key: string]: any } = {};

      constructor(...args: any[]) {
        super();
        providers.forEach((Provider: FunctionConstructor) => {
          this.providers[Provider.name] = new Provider();
        });
      }

      connectedCallback() {
        super.connectedCallback();
      }
    };

    configuredConstructor.prototype.selector = config.selector;

    return configuredConstructor;
  };
}
