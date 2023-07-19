from db.session import engine, get_session, async_session
import db.models as models
import api.schemas as schemas
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.schema import DropTable
from db.models import Cafe
import json
import datetime
import random


async def _db_recreate():
    async with engine.begin() as conn:
        for table in reversed(models.Base.metadata.sorted_tables):
            await conn.execute(DropTable(table, if_exists=True))
        await conn.run_sync(models.Base.metadata.create_all)
    await engine.dispose()


async def fill_with_data():
    # Generating users
    users = {
        "grisha": 612665336,
        # "nikita": 872105135,
        # "pasha": 537671685,
        # "timofey": 685437812,
    }
    model_users = [
        schemas.Customer.to_orm(schemas.Customer(id=telegram_id, name=name))
        for name, telegram_id in users.items()
    ]

    async with async_session() as session:
        async with session.begin():
            session.add_all(model_users)
            await session.commit()

    # Generating cafe from json
    with open("db/crud/cafe.json", encoding="utf-8") as cafe:
        cafe_schema = schemas.Cafe(**json.loads(cafe.read()))

    db_cafe = schemas.Cafe.to_orm(cafe_schema)

    async with async_session() as session:
        async with session.begin():
            session.add(db_cafe)
            await session.commit()

    schema_cafe = schemas.Cafe.from_orm(db_cafe)

    with open("db/crud/cafe_test.json", "w", encoding="utf-8") as cafe:
        cafe.write(schema_cafe.json())

    # Generating dishes from the cafe and some parameters

    total_orders = 10
    max_dishes = 7
    max_quantity = 4
    max_clients = 6
    status = "in_progress"
    min_start_date = datetime.datetime(2023, 1, 1)
    max_start_date = datetime.datetime(2023, 6, 1)
    min_interval = datetime.timedelta(minutes=15)
    max_interval = datetime.timedelta(hours=2)

    orders = []

    for order in range(total_orders):
        start_date = min_start_date + datetime.timedelta(
            seconds=(max_start_date - min_start_date).total_seconds() * random.random()
        )
        schema_order = schemas.Order(
            rating=random.randint(1, 5),
            clients_num=random.randint(1, max_clients),
            status=status,
            start_date=start_date,
            end_date=start_date
            + min_interval
            + (max_interval - min_interval) * random.random(),
            cafe_id=db_cafe.id,
            customer_id=random.choice(list(users.values())),
            items=[
                schemas.OrderItem(
                    dish_id=dish.id,
                    revision_id=dish.revision_id,
                    quantity=random.randint(1, max_quantity),
                )
                for dish in random.choices(
                    schema_cafe.menu, k=random.randint(1, max_dishes)
                )
            ],
        )
        with open("db/crud/test_order.json", "w", encoding="utf-8") as biba:
            biba.write(schema_order.json())

        orders.append(schemas.Order.to_orm(schema_order))

    async with async_session() as session:
        async with session.begin():
            session.add_all(orders)
            await session.commit()
