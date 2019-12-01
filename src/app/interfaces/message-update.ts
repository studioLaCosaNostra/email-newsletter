export interface MessageUpdate {
  readonly name: string;
  readonly subject: string;
  readonly body: {
    readonly steps: readonly {
      readonly [key: string]: any;
    }[];
    readonly html: string;
    readonly text: string;
    readonly clientIDs: (string | number)[];
    readonly version: number;
  };
  readonly updatedAt: number;
}
