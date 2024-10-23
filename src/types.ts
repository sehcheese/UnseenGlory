export interface Poem {
  readonly title: string;
  readonly subtitle: string | null;
  readonly lines: readonly PoemLine[];
}

interface PoemLine {
  readonly line: string;
  readonly reference: string | null;
}
