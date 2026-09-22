import React, { forwardRef } from "react";

const Receipt = forwardRef(({ transaction }, ref) => {
  if (!transaction) return null;

  return (
    <div ref={ref} className="p-6 w-72 text-sm font-mono bg-white">
      <h2 className="text-lg font-bold text-center mb-4">📄 Transaction Receipt</h2>
      <div className="space-y-1">
        <p><strong>ID:</strong> {transaction._id}</p>
        <p><strong>Item:</strong> {transaction.itemId}</p>
        <p><strong>Type:</strong> {transaction.type}</p>
        <p><strong>Quantity:</strong> {transaction.quantity}</p>
        <p><strong>Note:</strong> {transaction.note || "-"}</p>
        <p><strong>User:</strong> {transaction.user || "N/A"}</p>
        <p><strong>Date:</strong> {new Date(transaction.createdAt).toLocaleString()}</p>
      </div>
      <div className="text-center mt-4 border-t pt-2">
        ✅ Thank you!
      </div>
    </div>
  );
});

export default Receipt;
