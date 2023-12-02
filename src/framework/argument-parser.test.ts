import * as assert from "node:assert";
import { afterEach, describe, it } from "node:test";
import { argumentParser } from "./argument-parser";

describe("ArgumentParser", () => {
  const originalArgs: string[] = process.argv;

  afterEach(() => {
    process.argv = originalArgs;
  });

  describe("parse key-value argument", () => {
    describe("with long flag", () => {
      it("should parse string argument", () => {
        process.argv = ["node", "foo", "--foo", "bar"];
        const argumentDeclarations = {
          foo: {
            typeOf: "key-value",
            long: "--foo",
            isRequired: false,
            valueOf: String,
          },
        } as const;

        const args = argumentParser(argumentDeclarations).parse();
        assert.deepStrictEqual(args.foo, ["bar"]);
      });

      it("should parse number argument", () => {
        process.argv = ["node", "foo", "--foo", "42"];
        const argumentDeclarations = {
          foo: {
            typeOf: "key-value",
            long: "--foo",
            isRequired: false,
            valueOf: Number,
          },
        } as const;

        const args = argumentParser(argumentDeclarations).parse();
        assert.deepStrictEqual(args.foo, [42]);
      });

      it("should parse boolean argument (true)", () => {
        process.argv = ["node", "foo", "--foo", "true"];
        const argumentDeclarations = {
          foo: {
            typeOf: "key-value",
            long: "--foo",
            isRequired: false,
            valueOf: Boolean,
          },
        } as const;

        const args = argumentParser(argumentDeclarations).parse();
        assert.deepStrictEqual(args.foo, [true]);
      });

      it("should parse boolean argument (false)", () => {
        process.argv = ["node", "foo", "--foo", "false"];
        const argumentDeclarations = {
          foo: {
            typeOf: "key-value",
            long: "--foo",
            isRequired: false,
            valueOf: Boolean,
          },
        } as const;

        const args = argumentParser(argumentDeclarations).parse();
        assert.deepStrictEqual(args.foo, [false]);
      });

      it("should parse array argument", () => {
        process.argv = ["node", "foo", "--foo", "bar", "--foo", "baz"];
        const argumentDeclarations = {
          foo: {
            typeOf: "key-value",
            long: "--foo",
            isRequired: false,
            valueOf: String,
          },
        } as const;

        const args = argumentParser(argumentDeclarations).parse();
        assert.deepStrictEqual(args.foo, ["bar", "baz"]);
      });
    });

    describe("with short flag", () => {
      it("should parse string argument", () => {
        process.argv = ["node", "foo", "-f", "bar"];
        const argumentDeclarations = {
          foo: {
            typeOf: "key-value",
            short: "-f",
            isRequired: false,
            valueOf: String,
          },
        } as const;

        const args = argumentParser(argumentDeclarations).parse();
        assert.deepStrictEqual(args.foo, ["bar"]);
      });

      it("should parse number argument", () => {
        process.argv = ["node", "foo", "-f", "42"];
        const argumentDeclarations = {
          foo: {
            typeOf: "key-value",
            short: "-f",
            isRequired: false,
            valueOf: Number,
          },
        } as const;

        const args = argumentParser(argumentDeclarations).parse();
        assert.deepStrictEqual(args.foo, [42]);
      });

      it("should parse boolean argument (true)", () => {
        process.argv = ["node", "foo", "-f", "true"];
        const argumentDeclarations = {
          foo: {
            typeOf: "key-value",
            short: "-f",
            isRequired: false,
            valueOf: Boolean,
          },
        } as const;

        const args = argumentParser(argumentDeclarations).parse();
        assert.deepStrictEqual(args.foo, [true]);
      });

      it("should parse boolean argument (false)", () => {
        process.argv = ["node", "foo", "-f", "false"];
        const argumentDeclarations = {
          foo: {
            typeOf: "key-value",
            short: "-f",
            isRequired: false,
            valueOf: Boolean,
          },
        } as const;

        const args = argumentParser(argumentDeclarations).parse();
        assert.deepStrictEqual(args.foo, false);
      });

      it("should parse array argument", () => {
        process.argv = ["node", "foo", "-f", "bar", "-f", "baz"];
        const argumentDeclarations = {
          foo: {
            typeOf: "key-value",
            short: "-f",
            isRequired: false,
            valueOf: String,
          },
        } as const;

        const args = argumentParser(argumentDeclarations).parse();
        assert.deepStrictEqual(args.foo, ["bar", "baz"]);
      });
    });

    describe("with long flag and short flag", () => {
      it("should parse string argument", () => {
        process.argv = ["node", "foo", "-f", "bar", "--foo", "baz"];
        const argumentDeclarations = {
          foo: {
            typeOf: "key-value",
            short: "-f",
            long: "--foo",
            isRequired: false,
            valueOf: String,
          },
        } as const;

        const args = argumentParser(argumentDeclarations).parse();
        assert.deepStrictEqual(args.foo, ["bar", "baz"]);
      });

      it("should parse number argument", () => {
        process.argv = ["node", "foo", "-f", "42", "--foo", "43"];
        const argumentDeclarations = {
          foo: {
            typeOf: "key-value",
            short: "-f",
            long: "--foo",
            isRequired: false,
            valueOf: Number,
          },
        } as const;

        const args = argumentParser(argumentDeclarations).parse();
        assert.deepStrictEqual(args.foo, [42, 43]);
      });

      it("should parse boolean argument", () => {
        process.argv = ["node", "foo", "-f", "true", "--foo", "false"];
        const argumentDeclarations = {
          foo: {
            typeOf: "key-value",
            short: "-f",
            long: "--foo",
            isRequired: false,
            valueOf: Boolean,
          },
        } as const;

        const args = argumentParser(argumentDeclarations).parse();
        assert.deepStrictEqual(args.foo, [true, false]);
      });
    });
  });

  describe("parse positional argument", () => {
    describe("with single argument", () => {
      it("should parse string argument", () => {
        process.argv = ["node", "foo", "bar"];
        const argumentDeclarations = {
          foo: {
            typeOf: "positional",
            valueOf: String,
          },
        } as const;

        const args = argumentParser(argumentDeclarations).parse();
        assert.deepStrictEqual(args.foo, ["bar"]);
      });

      it("should parse number argument", () => {
        process.argv = ["node", "foo", "42"];
        const argumentDeclarations = {
          foo: {
            typeOf: "positional",
            valueOf: Number,
          },
        } as const;

        const args = argumentParser(argumentDeclarations).parse();
        assert.deepStrictEqual(args.foo, [42]);
      });

      it("should parse boolean argument (true)", () => {
        process.argv = ["node", "foo", "true"];
        const argumentDeclarations = {
          foo: {
            typeOf: "positional",
            valueOf: Boolean,
          },
        } as const;

        const args = argumentParser(argumentDeclarations).parse();
        assert.deepStrictEqual(args.foo, [true]);
      });

      it("should parse boolean argument (false)", () => {
        process.argv = ["node", "foo", "false"];
        const argumentDeclarations = {
          foo: {
            typeOf: "positional",
            valueOf: Boolean,
          },
        } as const;

        const args = argumentParser(argumentDeclarations).parse();
        assert.deepStrictEqual(args.foo, [false]);
      });
    });

    describe("with multiple arguments", () => {
      it("should parse string argument", () => {
        process.argv = ["node", "foo", "bar", "baz"];
        const argumentDeclarations = {
          foo: {
            typeOf: "positional",
            valueOf: String,
          },
        } as const;

        const args = argumentParser(argumentDeclarations).parse();
        assert.deepStrictEqual(args.foo, ["bar", "baz"]);
      });

      it("should parse number argument", () => {
        process.argv = ["node", "foo", "42", "43"];
        const argumentDeclarations = {
          foo: {
            typeOf: "positional",
            valueOf: Number,
          },
        } as const;

        const args = argumentParser(argumentDeclarations).parse();
        assert.deepStrictEqual(args.foo, [42, 43]);
      });

      it("should parse boolean argument", () => {
        process.argv = ["node", "foo", "true", "false"];
        const argumentDeclarations = {
          foo: {
            typeOf: "positional",
            valueOf: Boolean,
          },
        } as const;

        const args = argumentParser(argumentDeclarations).parse();
        assert.deepStrictEqual(args.foo, [true, false]);
      });
    });
  });

  describe("parse flag argument", () => {
    describe("with long flag", () => {
      it("should parse boolean argument (true)", () => {
        process.argv = ["node", "foo", "--foo"];
        const argumentDeclarations = {
          foo: {
            typeOf: "flag",
            long: "--foo",
            valueOf: Boolean,
          },
        } as const;

        const args = argumentParser(argumentDeclarations).parse();
        assert.deepStrictEqual(args.foo, [true]);
      });

      it("should parse boolean argument (false)", () => {
        process.argv = ["node", "foo", "--no-foo"];
        const argumentDeclarations = {
          foo: {
            typeOf: "flag",
            long: "--foo",
            valueOf: Boolean,
          },
        } as const;

        const args = argumentParser(argumentDeclarations).parse();
        assert.deepStrictEqual(args.foo, [false]);
      });
    });

    describe("with short flag", () => {
      it("should parse boolean argument (true)", () => {
        process.argv = ["node", "foo", "-f"];
        const argumentDeclarations = {
          foo: {
            typeOf: "flag",
            short: "-f",
            valueOf: Boolean,
          },
        } as const;

        const args = argumentParser(argumentDeclarations).parse();
        assert.deepStrictEqual(args.foo, [true]);
      });

      it("should parse boolean argument (false)", () => {
        process.argv = ["node", "foo", "-F"];
        const argumentDeclarations = {
          foo: {
            typeOf: "flag",
            short: "-f",
            valueOf: Boolean,
          },
        } as const;

        const args = argumentParser(argumentDeclarations).parse();
        assert.deepStrictEqual(args.foo, [false]);
      });
    });

    describe("with long flag and short flag", () => {
      it("should parse boolean argument (true)", () => {
        process.argv = ["node", "foo", "-f", "--foo"];
        const argumentDeclarations = {
          foo: {
            typeOf: "flag",
            short: "-f",
            long: "--foo",
            valueOf: Boolean,
          },
        } as const;

        const args = argumentParser(argumentDeclarations).parse();
        assert.deepStrictEqual(args.foo, [true, true]);
      });

      it("should parse boolean argument (false)", () => {
        process.argv = ["node", "foo", "-F", "--no-foo"];
        const argumentDeclarations = {
          foo: {
            typeOf: "flag",
            short: "-f",
            long: "--foo",
            valueOf: Boolean,
          },
        } as const;

        const args = argumentParser(argumentDeclarations).parse();
        assert.deepStrictEqual(args.foo, [false, false]);
      });
    });
  });
});
