export type ColumnDefinitionType<T, K extends keyof T> = {
  key: K;
  header: string;
  width?: number;
};

export type TableProps<T, K extends keyof T> = {
  data: Array<T>;
  options: TableOptions;
  columns: Array<ColumnDefinitionType<T, K>>;
};

export type TableOptions = {
  enableSelection: boolean;
};
