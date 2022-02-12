import React from "react";

function TransferList({ transfers, approvals, approveTransfer }) {

    return (
        <div className="transfers">
            <h2>Transfers</h2>
            <table className="transfers--list">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Amount</th>
                        <th>To</th>
                        <th>Approvals</th>
                        <th>Sent</th>
                    </tr>
                </thead>
                <tbody>
                    {transfers.map(transfer => (
                        <tr key={transfer.id}>
                            <td>{transfer.id}</td>
                            <td>{transfer.amount}</td>
                            <td>{transfer.to}</td>
                            <td>
                                {approvals[transfer.id] === true ?
                                    (<button id="approve-btn-disabled" onClick={() => alert("You already approved this transfer! :-)")}>{transfer.approvals} √</button>) :
                                    (<button id="approve-btn" onClick={() => approveTransfer(transfer.id)}>Approve</button>)}
                            </td>
                            <td>{transfer.sent ? 'yes' : 'no'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TransferList;