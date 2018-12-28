interface Serializable<T> {
  deserialize(input: object): T;
}

export class Kpop implements Serializable<Kpop>{
  id: number;
  name: string;
  image: string;

  deserialize(input): Kpop {
    this.id = input.id;
    this.name = input.name;
    this.image = input.image;

    return this;
  }
}
