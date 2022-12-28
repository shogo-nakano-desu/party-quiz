import { factory } from 'ulid';

export class IdFactory {
  public static generate(prefix: string): string {
    const now = Date.now();
    const ulid = factory();
    return prefix + '-' + ulid(now);
  }
}
