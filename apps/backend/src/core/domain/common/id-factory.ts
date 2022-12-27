import { monotonicFactory } from 'ulid';

export class IdFactory {
  public generate(prefix: string): string {
    const now = Date.now();
    const ulid = monotonicFactory();
    return prefix + '-' + ulid(now);
  }
}
