import { TransactionType } from "@prisma/client";
import { ObjectId } from "mongodb";
import * as z from "zod";

const isValidObjectId = (id: string): boolean => ObjectId.isValid(id);

export const createTransactionSchema = z.object({
	description: z.string().min(1, "Descrição obrigatória"),
	amount: z.number().positive("Valor deve ser positivo"),
	date: z.coerce.date({
		error: () => ({ message: "Data Inválida " }),
	}),
	categoryId: z.string().refine(isValidObjectId, { message: "Categoria Inválida " }),
	type: z.enum([TransactionType.expense, TransactionType.income], {
		error: () => ({ message: "Data Inválida " }),
	}),
});

export const getTransactionsSchema = z.object({
	month: z.string().optional(),
	year: z.string().optional(),
	type: z
		.enum([TransactionType.expense, TransactionType.income], {
			error: () => ({ message: "Data Inválida " }),
		})
		.optional(),
	categoryId: z.string().refine(isValidObjectId, { error: "Categoria Inválida " }).optional(),
});

export const getTransactionsSummarySchema = z.object({
	month: z.string({ error: "O mês é obrigatório" }),
	year: z.string({ error: "O ano é obrigatório" }),
});

export type GetTransactionsQuery = z.infer<typeof getTransactionsSchema>;
export type GetTransactionsSummaryQuery = z.infer<typeof getTransactionsSummarySchema>;
