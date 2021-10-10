class Foo {
  a: string;

  constructor(a: string) {
    this.a = a;
  }
}

const foo = new Foo("I'm in foo v2")
console.log(foo.a)
