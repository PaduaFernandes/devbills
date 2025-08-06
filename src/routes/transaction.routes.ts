import type { FastifyInstance } from "fastify";
import createTransaction from "../controller/transactions/createTransaction.controller";
import { deleteTransaction } from "../controller/transactions/deleteTransaction.controller";
import { getTransactions } from "../controller/transactions/getTransactions.controller";
import { getTransactionsSummary } from "../controller/transactions/getTransactionsSummary.controller";

const transactionRoutes = async (fastify: FastifyInstance) => {
	// Criando
	fastify.route({
		method: "POST",
		url: "/",
		handler: createTransaction,
	});

	// Buscar com Filtros
	fastify.route({
		method: "GET",
		url: "/",
		handler: getTransactions,
	});

	// Buscar resumo
	fastify.route({
		method: "GET",
		url: "/summary",
		handler: getTransactionsSummary,
	});

	//Deletar
	fastify.route({
		method: "DELETE",
		url: "/:id",
		handler: deleteTransaction,
	});
};

export default transactionRoutes;
