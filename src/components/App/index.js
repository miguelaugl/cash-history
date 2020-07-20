import React, { useState, useEffect, useCallback } from 'react';
import { FaArrowUp, FaArrowDown, FaTrash } from 'react-icons/fa';

import {
  CardContainer,
  Card,
  TableContainer,
  InputContainer
} from './styles';

import { firebaseDatabase } from '../../firebase';
import { formatCurrency, getTodayDate } from '../../util';

import income from '../../assets/income.svg';
import outcome from '../../assets/outcome.svg';
import total from '../../assets/total.svg';

export default function App() {

  const [transactions, setTransactions] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState('');
  const [title, setTitle] = useState('');
  const [value, setValue] = useState('');
  const [category, setCategory] = useState('');

  const insertTransactionToList = useCallback(transaction => {
    setTransactions(oldTransactions => [...oldTransactions, transaction]);
  }, []);

  useEffect(() => {
    const transactionsRef = firebaseDatabase.ref('transactions');

    transactionsRef.on('child_added', child => {
      const transaction = child.val();
      const id = child.key;

      const parsedTransaction = {
        ...transaction,
        id
      }

      insertTransactionToList(parsedTransaction);
    });

  }, [insertTransactionToList]);

  function pushData(type) {
    if (checkIfIsEmpty()) {
      return;
    }

    const transactionsRef = firebaseDatabase.ref('transactions');
    const addTransaction = transactionsRef.push();
    const transactionId = transactionsRef.push().key;

    const date = getTodayDate();

    const newTransaction = {
      title,
      value,
      category,
      date,
      type,
    }

    addTransaction.set(newTransaction);

    return transactionId;
  }

  function selectTransaction(id) {
    if (selectedTransaction === id) {
      return setSelectedTransaction('');
    }

    return setSelectedTransaction(id);
  }

  function deleteTransaction() {
    const transactionsRef = firebaseDatabase.ref().child('transactions');

    transactionsRef.child(selectedTransaction).remove();

    const filteredTransactions = transactions.filter(transaction => transaction.id !== selectedTransaction);

    setTransactions(filteredTransactions);
    setSelectedTransaction('');
  }

  function getTotalIncome() {
    const totalIncome = transactions.reduce((total, transaction) => {
      if (transaction.type === 'income') {
        const value = Number(transaction.value);

        return total += value;
      }

      return total;
    }, 0)

    return totalIncome;
  }

  function getTotalOutcome() {
    const totalOutcome = transactions.reduce((total, transaction) => {
      if (transaction.type === 'outcome') {
        const value = Number(transaction.value);

        return total += value;
      }

      return total;
    }, 0)

    return totalOutcome;
  }

  function getTotal() {
    const income = getTotalIncome();
    const outcome = getTotalOutcome();
    const total = income - outcome;

    return total;
  }

  function checkIfIsEmpty() {
    if (!title) {
      alert('Por favor, insira o título da transação.');
      return true;
    }

    if (!value) {
      alert('Por favor, insira o valor da transação');
      return true;
    }

    if (!category) {
      alert('Por favor, insira a categoria da transação.');
      return true;
    }

    return false;
  }

  return (
    <>
      <CardContainer>
        <Card>
          <header>
            <p>Entradas</p>
            <img src={income} alt="Income" />
          </header>
          <h1>
            {formatCurrency(getTotalIncome())}
          </h1>
        </Card>
        <Card>
          <header>
            <p>Saídas</p>
            <img src={outcome} alt="Outcome" />
          </header>
          <h1>
            {formatCurrency(getTotalOutcome())}
          </h1>
        </Card>
        <Card total={getTotal()}>
          <header>
            <p>Total</p>
            <img src={total} alt="Total" />
          </header>
          <h1>
            {formatCurrency(getTotal())}
          </h1>
        </Card>
      </CardContainer>

      <TableContainer>
        <table>
          <thead>
            <tr>
              <th>Título</th>
              <th>Valor</th>
              <th>Categoria</th>
              <th>Data</th>
            </tr>
          </thead>

          <tbody>
            {transactions.map(transaction => (
              <tr
                key={transaction.id}
                onClick={() => selectTransaction(transaction.id)}
                className={selectedTransaction === transaction.id ? 'selected' : ''}
              >
                <td className="title">{transaction.title}</td>
                {transaction.type === 'income' ? (
                  <td className="income">{formatCurrency(transaction.value)}</td>
                ) : (
                  <td className="outcome">
                    - {formatCurrency(transaction.value)}
                  </td>
                )}
                <td>{transaction.category}</td>
                <td>{transaction.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableContainer>

      <InputContainer>
        <input
          name="title"
          placeholder="Digite o título"
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <input
          name="value"
          placeholder="Digite o valor"
          type="number"
          value={value}
          onChange={e => setValue(e.target.value)}
        />
        <input
          name="category"
          placeholder="Digite a categoria"
          type="text"
          value={category}
          onChange={e => setCategory(e.target.value)}
        />

        <button
          className="deposit"
          onClick={() => pushData('income')}
        >
          Depositar
          <FaArrowUp />
        </button>

        <button
          className="withdraw"
          onClick={() => pushData('outcome')}
        >
          Sacar
          <FaArrowDown />
        </button>

        <button
          className={!selectedTransaction.length ? 'delete hide' : 'delete'}
          onClick={deleteTransaction}
        >
          Excluir
          <FaTrash />
        </button>
      </InputContainer>
    </>
  );
}
