export type Transaction = {
    id: string;
    transaction_at: Date;
    amount: number;
    description: string;
    is_loan: boolean;
};
