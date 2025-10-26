export type Paginated<T> = {
    content: T;
    nextCursor: number | null;
};
