from db.session import engine
import db.models as models
import api.schemas as schemas
from sqlalchemy.ext.asyncio import AsyncSession


async def _db_recreate():
    async with engine.begin() as conn:
        await conn.run_sync(models.Base.metadata.drop_all)
        await conn.run_sync(models.Base.metadata.create_all)
    await engine.dispose()


async def fill_with_data(db: AsyncSession):
    pass
