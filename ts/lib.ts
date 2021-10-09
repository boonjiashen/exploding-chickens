class Foo {
  a: string;

  constructor(a: string) {
    this.a = a;
  }
}

const foo = new Foo("I'm in foo")
console.log(foo.a)
