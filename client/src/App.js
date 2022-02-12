import React, { useEffect, useState } from "react";
import { getWeb3, getWallet } from './utils.js';
import Header from './components/Header.js';
import Approvers from "./components/Approvers.js";
import NewTransfer from './components/NewTransfer.js';
import TransferList from "./components/TransferList.js";

function App() {
  const [web3, setWeb3] = useState(undefined);
  const [accounts, setAccounts] = useState(undefined);
  const [wallet, setWallet] = useState(undefined);
  const [approvers, setApprovers] = useState([]);
  const [quorum, setQuorum] = useState(undefined);
  const [transfers, setTransfers] = useState([]);
  const [approvals, setApprovals] = useState([]);

  useEffect(() => {
    const init = async () => {
      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();
      const wallet = await getWallet(web3);
      const approvers = await wallet.methods.getApprovers().call();
      const quorum = await wallet.methods.quorum().call();
      const transfers = await wallet.methods.getTransfers().call();
      const approvals = await Promise.all(transfers.map(async (transfer) => {
        const hasApproved = await wallet.methods.approvals(accounts[0], transfer.id).call();
        return hasApproved;
      }))
      setWeb3(web3);
      setAccounts(accounts);
      setWallet(wallet);
      setApprovers(approvers);
      setQuorum(quorum);
      setTransfers(transfers);
      setApprovals(approvals);
      console.log(approvals);
    };
    init();
  }, []);

  const createTransfer = async transfer => {
    await wallet.methods
      .createTransfer(transfer.amount, transfer.to)
      .send({ from: accounts[0] });
    refetchTransfers()
  }

  const approveTransfer = async transferId => {
    await wallet.methods
      .approveTransfer(transferId)
      .send({ from: accounts[0] });
    refetchTransfers()
  }

  const refetchTransfers = async () => {
    const transfers = await wallet.methods.getTransfers().call()
    setTransfers(transfers)
  }

  if (typeof web3 === 'undefined' ||
    typeof accounts === 'undefined' ||
    typeof wallet === 'undefined' ||
    typeof quorum === 'undefined' ||
    approvers.length === 0) {
    return (
      <div className="loading">
        <h3>Loading ...</h3>
      </div>
    );
  }

  return (
    <div>
      <Header quorum={quorum} />
      <Approvers approvers={approvers} />
      <main>
        <NewTransfer createTransfer={createTransfer} />
        <TransferList transfers={transfers} approvals={approvals} approveTransfer={approveTransfer} />
      </main>
    </div>
  );
}

export default App;
