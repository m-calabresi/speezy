export type Transaction = {
    id: string;
    transactionAt: Date;
    amount: number;
    description: string;
    isLoan: boolean;
};

/*
    NOTE: by default postgres.js converts PostgreSQL numbers
    into `string` to overcome JS representational limitation.

    @see: https://github.com/porsager/postgres?tab=readme-ov-file#numbers-bigint-numeric
*/
export type RawTransaction = Omit<Transaction, "amount"> & {
    amount: string;
};
