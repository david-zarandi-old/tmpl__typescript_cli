type Constructors = StringConstructor | NumberConstructor | BooleanConstructor;

type ValueOf<T extends Constructors = Constructors> = { valueOf: T };

type RequiredValue<T extends Constructors> = ValueOf<T> & { isRequired?: true };
type OptionalValue<T extends Constructors> = ValueOf<T> & {
  isRequired?: false;
  defaultValue?: ReturnType<T>;
};

type FlagDeclaration =
  | { short: `-${string}`; long?: `--${string}` }
  | { long: `--${string}`; short?: `-${string}` };

type BasePositionalArgument = {
  typeOf: "positional";
};

type BaseFlagArgument = {
  typeOf: "flag";
};

type BaseKeyValueArgument = {
  typeOf: "key-value";
};

type PositionalArgument = BasePositionalArgument & RequiredValue<Constructors>;

type FlagArgument = BaseFlagArgument &
  OptionalValue<BooleanConstructor> &
  FlagDeclaration;

type KeyValueArgument = BaseKeyValueArgument &
  (RequiredValue<Constructors> | OptionalValue<Constructors>) &
  FlagDeclaration;

export type ArgumentDeclarations = Record<
  string,
  PositionalArgument | FlagArgument | KeyValueArgument
>;

export function argumentParser<
  TArgDeclarations extends ArgumentDeclarations,
  TArgs extends {
    [P in keyof TArgDeclarations]: Array<
      ReturnType<TArgDeclarations[P]["valueOf"]>
    >;
  },
>(_argumentDeclarations: TArgDeclarations) {
  function parse(_args = process.argv.slice(2)) {
    const processedArgs: TArgs = {} as TArgs;
    return processedArgs;
  }

  return {
    parse,
  };
}
