from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, delete
import db.models as models
from uuid import UUID


async def get(
    db: AsyncSession,
    id: UUID | int,
) -> models.Dish:
    query = select(models.Dish).filter(models.Dish.id == id, models.Dish.end_date == None)
    return (await db.execute(query)).scalars().unique().first()


async def create(
    db: AsyncSession,
    model: models.Dish,
) -> models.Dish:
    db.add(model)
    await db.commit()

    return model


async def remove(
    db: AsyncSession,
    id: UUID | int,
) -> bool:
    query = delete(models.Dish).where(models.Dish.id == id)
    deleted = (await db.execute(query)).rowcount
    await db.commit()

    return deleted   ## Can delete more than 1 entry because of revision id 
