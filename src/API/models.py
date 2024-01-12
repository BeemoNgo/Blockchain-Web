# models.py
from pydantic import BaseModel

class NodeTableResponse(BaseModel):
    current_balance: float
    timestamp: str
    timestamp2: str
    transactions: int
    max_transaction_value: float
    total_received: float
    total_sent: float

class EdgeTableResponse(BaseModel):
    totalValue: float
    transactions: int
    newest: str
    latest: str
