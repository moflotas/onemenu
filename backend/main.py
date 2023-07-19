from fastapi import FastAPI, Depends
from api.routers.cafe import cafe_router
from api.routers.dish import dish_router
from api.routers.order import order_router
from api.routers.customer import customer_router
from api.routers.employee import employee_router
from db.crud.dev import _db_recreate, fill_with_data
from db.session import get_session
from sqlalchemy.ext.asyncio import AsyncSession
import uvicorn


app = FastAPI(title="Onemenu")

app.include_router(cafe_router)
app.include_router(dish_router)
app.include_router(order_router)
app.include_router(customer_router)
app.include_router(employee_router)


@app.on_event("startup")
async def startup(db: AsyncSession = Depends(get_session)):
    await _db_recreate()
    await fill_with_data()


def start():
    uvicorn.run(app="main:app", reload=True)


if __name__ == "__main__":
    start()
