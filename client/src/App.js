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

  useEffect(() => {
    const init = async () => {
      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();
      const wallet = await getWallet(web3);
      const approvers = await wallet.methods.getApprovers().call();
      const quorum = await wallet.methods.quorum().call();
      const transfers = await wallet.methods.getTransfers().call();
      setWeb3(web3);
      setAccounts(accounts);
      setWallet(wallet);
      setApprovers(approvers);
      setQuorum(quorum);
      setTransfers(transfers);
    };
    init();
  }, []);

  const createTransfer = transfer => {
    wallet.methods
      .createTransfer(transfer.amount, transfer.to)
      .send({ from: accounts[0] });
  }

  const approveTransfer = transferId => {
    wallet.methods
      .approveTransfer(transferId)
      .send({ from: accounts[0] });
  }

  if (typeof web3 === 'undefined' ||
    typeof accounts === 'undefined' ||
    typeof wallet === 'undefined' ||
    typeof quorum === 'undefined' ||
    approvers.length === 0) {
    return (
      <div className="container">
        <div className="row" id="block-loader">
          <div className="col-md-4 mx-auto my-auto text-center">
            <h3 className="text-white">Loading ...</h3>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <Header quorum={quorum} />
      <Approvers approvers={approvers} />
      <main>
        <NewTransfer createTransfer={createTransfer} />
        <TransferList transfers={transfers} approveTransfer={approveTransfer} />
      </main>
    </div>
  );
}

export default App;
