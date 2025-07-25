// InvoiceManager.tact
// Minimal Tact contract for AllScale invoice management on TON

contract InvoiceManager {
    // Placeholder: store a single invoice (for demo)
    int public invoiceId;
    address public seller;
    address public buyer;
    int public amount;
    bool public paid;

    constructor(int _invoiceId, address _seller, address _buyer, int _amount) {
        invoiceId = _invoiceId;
        seller = _seller;
        buyer = _buyer;
        amount = _amount;
        paid = false;
    }

    // Mark invoice as paid (for demo)
    public function pay() {
        require(!paid, "Already paid");
        paid = true;
    }
} 