type Join<T extends string, U extends string> = `${T}${T extends '' ? '' : ':'}${U}`;

type FlattenOptionsList<T, Prefix extends string = ''> =
  T extends string ? Prefix | Join<Prefix, T> :
  T extends object ? {
    [K in keyof T]: T[K] extends string
    ? T[K] extends ''
    ? Join<Prefix, Extract<K, string>>
    : Join<Prefix, `${Extract<K, string>}:${Extract<T[K], string>}`>
    : FlattenOptionsList<T[K], Join<Prefix, Extract<K, string>>>
  }[keyof T] :
  never;

type Flatten<T> = {
  [K in keyof T]: T[K] extends object ? Flatten<T[K]> : T[K];
};