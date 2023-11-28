type Constructors = StringConstructor | NumberConstructor | BooleanConstructor;

type ValueOf<T extends Constructors> = { value: T };

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
  action: () => void;
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

export type ParsedArgs<T = ArgumentDeclarations> = Record<
  keyof T,
  ReturnType<Constructors>
>;

export function argumentParser(argumentDeclarations: ArgumentDeclarations) {
  function parse(args = process.argv.slice(2)) {
    const processedArgs: ParsedArgs<typeof argumentDeclarations> = {};
    return processedArgs;
  }

  return {
    parse,
  };
}
