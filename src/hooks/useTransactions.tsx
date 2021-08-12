import { useState, useEffect, createContext, useContext, ReactNode } from 'react';

import { api } from '../services/api';

// ----- Tipos ------------------------------------------------------------------------------------

interface Transaction {
    id: number;
    title: string;
    amount: number;
    type: string;
    category: string;
    createdAt: string;
}

interface TransactionsContextData {
    transactions: Transaction[];
    createTransaction: (transaction: TransactionInput) => Promise<void>;
}

//outra forma de fazer 
//type TransactionInput = Pick<Transaction, 'title' | 'amount' | 'type' | 'category'>;
type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>;

interface TransactionsProviderProps {
    // Essa propriedade possibilita que o componente receba filhos como parametro
    // ReactNode = Aceitar qualquer conteudo valido para o React
    children: ReactNode;
}

// ----- Transaction Context ----------------------------------------------------------------------

const TransactionsContext = createContext<TransactionsContextData>(
    {} as TransactionsContextData
);

// ----- Transaction Provider ---------------------------------------------------------------------

export function TransactionsProvider({ children }: TransactionsProviderProps) {

    const [transactions, setTransactions] = useState<Transaction[]>([]);

    useEffect(() => {
        api.get('transactions').then(response => setTransactions(response.data.transactions));
    }, []);

    async function createTransaction(transactionInput: TransactionInput) {

        // ----- envia uma requisição post para api e aguarda a resposta --------------------------
        const response = await api.post('/transactions', {
            ...transactionInput,
            // ----- Adiciona o campo data que não veio com as informações da transação -----------
            createdAt: new Date(),
        });

        // ----- Desestrutura a resposta para pegar os dados retornados ---------------------------
        const { transaction } = response.data;

        // ----- Adiciona a resposta ao array de transações ---------------------------------------
        setTransactions([...transactions, transaction]);

    }

    return (

        <TransactionsContext.Provider value={{ transactions, createTransaction }}>
            {children}
        </TransactionsContext.Provider>

    )

}

// --- Hook personalisado - useTransaction --------------------------------------------------------

export function useTransactions() {

    const context = useContext(TransactionsContext);

    return context;
}

