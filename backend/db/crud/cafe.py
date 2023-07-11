from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, delete
import db.models as models
import api.schemas as schemas
from uuid import UUID


async def get_all(
    db: AsyncSession,
) -> models.Cafe | None:
    query = select(models.Cafe)
    return (await db.execute(query)).scalars().unique().all()


async def get(
    db: AsyncSession,
    id: UUID | int,
) -> models.Cafe | None:
    query = select(models.Cafe).filter(models.Cafe.id == id)
    return (await db.execute(query)).scalars().unique().first()


async def create(
    db: AsyncSession,
    model: models.Cafe,
) -> models.Cafe:
    db.add(model)
    await db.commit()

    return model


async def remove(db: AsyncSession, id: UUID | int) -> bool:
    query = delete(models.Cafe).where(models.Cafe.id == id)
    deleted = (await db.execute(query)).rowcount
    await db.commit()

    return deleted == 1
