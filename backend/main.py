from fastapi import FastAPI
from api.routers import cafe_router
import uvicorn



app = FastAPI(
    title="Onemenu"
)

app.include_router(cafe_router)



def start():
    uvicorn.run(
        app= "main:app",
        reload= True
        )


if __name__ == "__main__":
    start()



