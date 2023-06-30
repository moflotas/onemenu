from session import engine
import db_classes as models
import asyncio

async def _db_recreate():
    async with engine.begin() as conn:
        await conn.run_sync(models.Base.metadata.drop_all)
        await conn.run_sync(models.Base.metadata.create_all)
    await engine.dispose()



asyncio.run(_db_recreate())
