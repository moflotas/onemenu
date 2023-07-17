from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, delete
import db.models as models
from uuid import UUID


async def get(
    db: AsyncSession,
    id: UUID | int,
) -> models.Customer | None:
    query = select(models.Customer).filter(models.Customer.id == id)
    return (await db.execute(query)).scalars().unique().first()


async def login(
    db: AsyncSession,
    id: str,
) -> models.Customer | None:
    query = select(models.Customer).filter(models.Customer.telegram_id == id)
    customer = (await db.execute(query)).scalars().unique().first()

    if customer is None:
        customer = await create(db, models.Customer(telegram_id= id, addresses= []))

    return customer


async def create(
    db: AsyncSession,
    model: models.Customer,
) -> models.Customer:
    db.add(model)
    await db.commit()

    return model


async def remove(
    db: AsyncSession,
    id: UUID | int,
) -> bool:
    query = delete(models.Customer).where(models.Customer.id == id)
    deleted = (await db.execute(query)).rowcount
    await db.commit()

    return deleted == 1
