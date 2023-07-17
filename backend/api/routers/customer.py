from uuid import UUID
from fastapi import APIRouter, Depends
import db.models as models
import api.schemas as schemas
import db.crud.customer as crud
from db.session import get_session
from sqlalchemy.ext.asyncio import AsyncSession


customer_router = APIRouter(
    prefix="/api/customer",
    tags=["User"]
)


@customer_router.post("", response_model=schemas.Customer)
async def create_customer(
    customer: schemas.Customer,
    db: AsyncSession = Depends(get_session),
) -> schemas.Customer:
    
    db_customer = schemas.Customer.to_orm(customer)
    
    db_customer = await crud.create(db, db_customer)
    return schemas.Customer.from_orm(db_customer)


@customer_router.get("/{customer_id}", response_model=schemas.Customer)
async def get_customer(
    customer_id: UUID,
    db: AsyncSession = Depends(get_session),
) -> schemas.Customer:
    db_customer = await crud.get(db, customer_id)
    return schemas.Customer.from_orm(db_customer)


@customer_router.get("/login/{telegram_id}", response_model=schemas.Customer)
async def login(
    telegram_id: str,
    db: AsyncSession = Depends(get_session),
) -> schemas.Customer:
    
    db_customer = await crud.login(db, telegram_id)
    return schemas.Customer.from_orm(db_customer)
