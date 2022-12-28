import { IdFactory } from './id-factory';

describe('id-factory', () => {
  it('generate id succeed', () => {
    expect(IdFactory.generate('te').substring(0, 3)).toStrictEqual('te-');
  });
});
