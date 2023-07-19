from db.session import engine, get_session, async_session
import db.models as models
import api.schemas as schemas
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.schema import DropTable
from db.models import Cafe 
import json


async def _db_recreate():
    # async with engine.begin() as conn:
    #     for table in reversed(models.Base.metadata.sorted_tables):
    #         await conn.execute(DropTable(table, if_exists=True))
    #     await conn.run_sync(models.Base.metadata.create_all)
    # await engine.dispose()
    pass


async def fill_with_data():
    with open("db/crud/cafe.json") as cafe:
        cafe_schema = schemas.Cafe(**json.loads(cafe.read()))
    
    db_cafe = schemas.Cafe.to_orm(cafe_schema)
    
    async with async_session() as session:
        async with session.begin():
            session.add(db_cafe)
    
    schema_cafe = schemas.Cafe.from_orm(db_cafe)
    with open("db/crud/biba.json", "w", encoding="utf-8") as biba:
        biba.write(schema_cafe.json())
    # print(dishes)
