from pydantic import BaseModel
from datetime import datetime

class ExpenseBase(BaseModel):
    amount:float
    description: str
    date: datetime 

class ExpenseCreate(ExpenseBase):
    pass

class Expense(ExpenseBase):
    id: int
    
    class Config:
        from_attributes = True