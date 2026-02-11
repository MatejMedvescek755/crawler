import "./TransactionCard.css";

const TransactionCard = ({ data }) => {
  if (!data) return null;

  const {
    blockNumber,
    from,
    to,
    value,
    txreceipt_status,
    timeStamp,
    blockHash,
    hash,
    gasUsed,
    gasPrice,
    cumulativeGasUsed,
    nonce,
    input,
    methodId,
    confirmations,
    contractAddress,
    functionName,
    isError,
  } = data;

  const formatTimestamp = (ts) =>
    ts ? new Date(ts * 1000).toLocaleString() : "-";
  const details = [
    { label: "Block Hash", value: blockHash },
    { label: "Transaction Hash", value: hash },
    { label: "Gas Used", value: gasUsed },
    { label: "Gas Price", value: gasPrice },
    { label: "Cumulative Gas", value: cumulativeGasUsed },
    { label: "Nonce", value: nonce },
    { label: "Input", value: input?.slice(0, 50) + "..." },
    { label: "Method ID", value: methodId },
    { label: "Confirmations", value: confirmations },
    { label: "Contract Address", value: contractAddress || "-" },
    { label: "Function Name", value: functionName || "-" },
    { label: "Is Error", value: isError },
  ];

  return (
    <div className="tx-card">
      <div className="tx-main-info">
        <span>
          <strong>Block:</strong> {blockNumber}
        </span>
        <span>
          <strong>From:</strong> {from?.slice(0, 6)}...{from?.slice(-4)}
        </span>
        <span>
          <strong>To:</strong>{" "}
          {to ? `${to.slice(0, 6)}...${to.slice(-4)}` : "-"}
        </span>
        <span>
          <strong>Value:</strong> {value}
        </span>
        <span>
          <strong>Status:</strong> {txreceipt_status === "1" ? "✅" : "❌"}
        </span>
        <span>
          <strong>Timestamp:</strong> {formatTimestamp(timeStamp)}
        </span>
      </div>

      <details className="tx-details">
        <summary>Details</summary>
        <div className="tx-details-content">
          {details.map(({ label, value }) => (
            <span key={label}>
              <strong>{label}:</strong> {value || "-"}
            </span>
          ))}
        </div>
      </details>
    </div>
  );
};

export default TransactionCard;
