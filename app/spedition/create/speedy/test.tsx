interface Pokemon {
  id: string;
  attack: number;
  defence: number;
}

interface BaseRecord {
  id: string;
}

interface DataBase<T extends BaseRecord> {
  set(newValue: T): void;
  get(id: string): T | undefined;
}

class InMemoryDataBase<T extends BaseRecord> implements DataBase<T> {
  private db: Record<string, T> = {};

  public set(newValue: T): void {
    this.db[newValue.id] = newValue;
  }

  public get(id: string): T | undefined {
    return this.db[id];
  }
}

const pokemonDb = new InMemoryDataBase<Pokemon>();
pokemonDb.set({
  id: "12",
  attack: 3,
  defence: 5,
});

console.log(pokemonDb.get("12"));
