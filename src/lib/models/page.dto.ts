export type Paginated<T> = {
  data: T[];
  meta: {
    page: number;
    itemsPerPage: number;
    itemCount: number;
    pageCount: number;
  };
};
