from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, delete
import db.models as models
from pydantic import BaseModel
from uuid import UUID


class BaseRepository:
    async def get(
        db: AsyncSession, model: models.Base, id: UUID | int
    ) -> models.Base | None:
        query = select(model).filter(model.id == id)
        return (await db.execute(query)).scalars().unique().first()

    async def create(
        db: AsyncSession, model: models.Base, entity: BaseModel
    ) -> models.Base:
        db_entity = model(**entity.dict())

        db.add(db_entity)
        await db.commit()

        return db_entity

    async def remove(db: AsyncSession, model: models.Base, id: UUID | int) -> bool:
        query = delete(model).where(model.id == id)
        deleted = (await db.execute(query)).rowcount
        await db.commit()

        return deleted == 1
