type Constructors = StringConstructor | NumberConstructor | BooleanConstructor;

type ValueOf<T extends Constructors> = { valueOf: T };

type RequiredValue<T extends Constructors> = ValueOf<T> & { isRequired: true };
type OptionalValue<T extends Constructors> = ValueOf<T> & {
  isRequired: false;
  defaultValue?: ReturnType<T>;
};

type ValueDefinition<T extends Constructors> =
  | RequiredValue<T>
  | OptionalValue<T>;

type StringValue = ValueDefinition<StringConstructor>;
type NumberValue = ValueDefinition<NumberConstructor>;
type BooleanValue = ValueDefinition<BooleanConstructor>;

type BaseArgument = {
  help?: string;
};

type PositionalArgument = {
  typeOf: "positional";
  isRequired: true;
};

type FlagArgument = {
  typeOf: "flag";
  short: `-${string}`;
} & ({ short: `-${string}` } | { long: `--${string}` });

type KeyValueArgument = {
  typeOf: "key-value";
} & ({ short: `-${string}` } | { long: `--${string}` });

export type ArgumentDeclarations = Record<
  string,
  BaseArgument &
    (
      | (FlagArgument & OptionalValue<BooleanConstructor>)
      | (PositionalArgument & (StringValue | NumberValue | BooleanValue))
      | (KeyValueArgument & (StringValue | NumberValue | BooleanValue))
    )
>;

export function argumentParser<
  TArgDeclarations extends ArgumentDeclarations,
  TArgs extends {
    [P in keyof TArgDeclarations]: ReturnType<TArgDeclarations[P]["valueOf"]>;
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
