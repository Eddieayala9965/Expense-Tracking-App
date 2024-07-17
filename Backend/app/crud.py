from sqlalchemy.orm import Session
from .  import models, schemas


def get_expeneses(db: Session, skip: int = 0, limit: int = 10):
    return db.query(models.Expense).offset(skip).limit(limit).all()

def create_expense(db: Session, expense: schemas.ExpenseCreate)