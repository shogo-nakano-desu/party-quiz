import { factory } from 'ulid';

export class IdFactory {
  public generate(prefix: string): string {
    const now = Date.now();
    const ulid = factory();
    return prefix + '-' + ulid(now);
  }
}
