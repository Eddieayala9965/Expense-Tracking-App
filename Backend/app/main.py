from fastapi import FastAPI
from .database import engine, Base
from .api.endpoints import expense

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(expense.router)

@app.get("/")
def read_root():
    return {"Hello": "World"}