export abstract class DependencyInjector {
  static providers: any[] = [];

  static register(Provider: any) {
    if (this.providers[Provider.name]) return;
    this.providers[Provider.name] = new Provider();
  }

  static inject(component: any, provider: any) {
    if (provider.name in component.providers) {
      return component.providers[provider.name];
    } else {
      let element: HTMLElement = component;

      while (element.parentElement) {
        if (!element.parentElement.tagName.includes("-")) {
          element = element.parentElement;
        } else {
          if ((element.parentElement as any).providers && provider.name in (element.parentElement as any).providers) {
            return (element.parentElement as any).providers[provider.name];
          } else {
            element = element.parentElement;
          }
        }
      }

      if (!element) throw new Error("Provider not found!");
    }
  }
}
