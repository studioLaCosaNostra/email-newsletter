export interface Document {
  readonly versions: readonly {
    readonly steps: any[];
    readonly clientIDs: (string | number)[];
  }[];
  readonly html: string;
  readonly text: string;
  readonly version: number;
}