import React, { createContext, useState } from "react";

export const WalletContext = createContext();

export const WalletProvider = ({ children }) => {

  const [balance, setBalance] = useState(1200);

  const [transactions, setTransactions] = useState([
    { id: 1, type: "Earned", points: 200, date: "10 Mar 2026" },
    { id: 2, type: "Redeemed", points: -100, date: "8 Mar 2026" },
    { id: 3, type: "Earned", points: 500, date: "5 Mar 2026" }
  ]);

  const redeemPoints = (points) => {

    setBalance(balance - points);

    const newTransaction = {
      id: transactions.length + 1,
      type: "Redeemed",
      points: -points,
      date: new Date().toDateString()
    };

    setTransactions([newTransaction, ...transactions]);
  };

  return (
    <WalletContext.Provider value={{ balance, transactions, redeemPoints }}>
      {children}
    </WalletContext.Provider>
  );
};