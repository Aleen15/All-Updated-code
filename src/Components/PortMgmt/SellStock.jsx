import React, { useState } from "react";
import "./SellStock.css";

// Import icons (ensure you have the necessary icon images or use a library like react-icons)
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const SellStock = ({ portfolioId, stockId, stockSymbol, noOfShares, onClose, onSell }) => {
  const [quantitySell, setQuantitySell] = useState(0);
  const [error, setError] = useState(null);
  const [showDialog, setShowDialog] = useState(false); // State to track dialog visibility
  const [dialogMessage, setDialogMessage] = useState("");
  const [dialogType, setDialogType] = useState(""); // 'success' or 'error'

  const handleSell = async () => {
    if (quantitySell > noOfShares) {
      setError("You cannot sell more shares than you own.");
      return;
    }
    try {
      // Make API call to sell stock
      const response = await fetch(
        `http://localhost:8005/auth/stock/sell-stock/${portfolioId}?stockId=${stockId}&quantitySell=${quantitySell}`,
        {
          method: "POST",
        }
      );
      if (!response.ok) {
        setError("Error connecting to the server. Please try again.");
        return;
      }


      if (response.ok) {
        setDialogMessage("Stock sold successfully!");
        setDialogType("success");
        onSell(); // Notify parent that sale is successful
        setTimeout(() => {
          setShowDialog(false);
          onClose(); // Close dialog
        }, 1500); // Hide the success dialog after 1.5 seconds
      } else {
        setDialogMessage("Error selling the stock. Please try again.");
        setDialogType("error");
      }
    } catch (err) {
      setDialogMessage("Error connecting to the server. Please try again.");
      setDialogType("error");
    }
    setShowDialog(true);
  };

  return (
    <div className="sell-stock-dialog">
      <div className="sell-stock-dialog-content">
        <h3>Sell {stockSymbol} Stock</h3>
        <div>
          <label>Shares to sell</label>
          <input
            type="number"
            value={quantitySell}
            onChange={(e) => setQuantitySell(Number(e.target.value))}
            min="1"
            max={noOfShares}
          />
        </div>
        {error && <div className="error">{error}</div>}
        <div className="actions">
          <button onClick={onClose}>Cancel</button>
          <button onClick={handleSell}>Confirm Sell</button>
        </div>
      </div>
      {/* Success/Error Dialog */}
      {showDialog && (
        <div className="dialog-overlay">
          <div className="dialog-content">
            <div className="dialog-icon">
              {dialogType === "success" ? (
                <FaCheckCircle size={50} color="green" />
              ) : (
                <FaTimesCircle size={50} color="red" />
              )}
            </div>
            <p>{dialogMessage}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SellStock;