export type TransactionStatus = "completed" | "pending" | "canceled";

export type Transaction = {
  paymentId: string;
  receiverFirstname: string;
  receiverLastname: string | null;
  transactionType: string;
  memberId: number;
  label: string;
  firstname: string;
  lastname: string;
  amount: string;
  date: number;
  statusErrorDisplay: string;
  status: TransactionStatus;
};
export type SortOrder = "date_desc" | "date_asc";
