import React from "react";

function Approvers({ approvers }) {
    return (
        <div className="approvers">
            {approvers.map(function (approver) {
                return <p key={approver}>{approver}</p>
            })}
        </div>
    )
}

export default Approvers