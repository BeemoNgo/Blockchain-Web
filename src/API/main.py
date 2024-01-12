# main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from address import router as address_router
from transaction import router as transaction_router
from connect_GDB import GDB

app = FastAPI()

app.include_router(address_router)
app.include_router(transaction_router)
# Add CORS middleware
origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(address_router, prefix="/address", tags=["address"])
app.include_router(transaction_router, prefix="/transaction", tags=["transaction"])

if __name__ == "__main__":
    GDB.connect()
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
