from db.session import engine
import db.models as models
import api.schemas as schemas
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.schema import DropTable


async def _db_recreate():
    async with engine.begin() as conn:
        for table in reversed(models.Base.metadata.sorted_tables):
            conn.execute(DropTable(table, if_exists=True))
        await conn.run_sync(models.Base.metadata.create_all)
    await engine.dispose()


async def fill_with_data(db: AsyncSession):
    pass
