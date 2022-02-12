import React from "react";

function TransferList({ transfers, approveTransfer }) {
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
                                {transfer.approvals}
                                <button id="approve-btn" onClick={() => approveTransfer(transfer.id)}>√</button>
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