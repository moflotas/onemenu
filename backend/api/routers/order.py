from uuid import UUID
from fastapi import APIRouter, Depends
import db.models as models
import api.schemas as schemas
import db.crud.order as crud
import db.crud.dish as crud_dish
from db.session import get_session
from sqlalchemy.ext.asyncio import AsyncSession


order_router = APIRouter(
    prefix="/api/order",
    tags=["Order"],
)


@order_router.post("", response_model=schemas.Order)
async def create_order(
    order: schemas.Order,
    db: AsyncSession = Depends(get_session),
) -> schemas.Order:
    db_order = schemas.Order.to_orm(order)
    db_order = await crud.create(db, db_order)

    return schemas.Order.from_orm(db_order)


@order_router.post("/status", response_model=schemas.Order)
async def set_status(
    order: schemas.Order,
    db: AsyncSession = Depends(get_session),
) -> schemas.Order:
    db_order = schemas.Order.to_orm(order)
    db_order = await crud.update_status(db, db_order)

    return schemas.Order.from_orm(db_order)


@order_router.post("/item", response_model=schemas.OrderItem | bool)
async def update_item(
    order_item: schemas.OrderItem,
    db: AsyncSession = Depends(get_session),
) -> schemas.OrderItem | bool:
    if order_item.revision_id is None:
        db_dish = await crud_dish.get(db, order_item.dish_id)
        order_item.revision_id = db_dish.revision_id

    db_order_item = await crud.get_item(db, order_item.dish_id, order_item.order_id)

    if db_order_item is None:
        if order_item.quantity <= 0:
            return False

        db_order_item = schemas.OrderItem.to_orm(order_item)
        db_order_item = await crud.add_item(db, db_order_item)

        return schemas.OrderItem.from_orm(db_order_item)

    if order_item.quantity <= 0:
        status = await crud.remove_item(db, db_order_item.id)

        return status

    db_order_item.quantity = order_item.quantity
    db_order_item = await crud.update_item(db, db_order_item)
    return schemas.OrderItem.from_orm(db_order_item)


@order_router.get("/{order_id}", response_model=schemas.Order)
async def get_order(
    order_id: UUID,
    db: AsyncSession = Depends(get_session),
) -> schemas.Order:
    db_order = await crud.get(db, order_id)
    return schemas.Order.from_orm(db_order)


@order_router.get("/active/{customer_id}", response_model=schemas.Order)
async def get_order(
    customer_id: int,
    db: AsyncSession = Depends(get_session),
) -> schemas.Order:
    db_order = await crud.get_active_order(db, customer_id)
    return schemas.Order.from_orm(db_order)


@order_router.get("/stats/all", response_model=list[schemas.Order])
async def get_orders(
    db: AsyncSession = Depends(get_session),
) -> list[schemas.Order]:
    db_orders = await crud.get_all(db)
    return [schemas.Order.from_orm(db_order) for db_order in db_orders]
