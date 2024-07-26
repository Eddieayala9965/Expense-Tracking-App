from pydantic import BaseModel
from datetime import datetime
from typing import List, Optional

class ExpenseBase(BaseModel):
    amount: float
    description: str
    date: datetime 

class ExpenseCreate(ExpenseBase):
    pass

class ExpenseUpdate(BaseModel):
    amount: Optional[float] = None
    description: Optional[str] = None
    date: Optional[datetime] = None
    
class ExpenseDelete(ExpenseBase):
    pass

class Expense(ExpenseBase):
    id: int
    
    class Config:
        from_attributes = True