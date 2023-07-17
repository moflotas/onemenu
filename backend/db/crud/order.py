from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, delete, update
import db.models as models
from uuid import UUID


async def get(
    db: AsyncSession,
    id: UUID | int,
) -> models.Order | None:
    query = select(models.Order).filter(models.Order.id == id)
    return (await db.execute(query)).scalars().unique().first()


async def get_active_order(
    db: AsyncSession,
    customer_id: UUID | int,
) -> models.Order | None:
    
    query = select(models.Order).filter(
        models.Order.customer_id == customer_id,
        models.Order.status == models.OrderStatus.IN_PROGRESS,
    )
    order = (await db.execute(query)).scalars().unique().first()

    if order is None:
        order = await create(
            db,
            models.Order(
                customer_id=customer_id,
                items=[],
            ),
        )

    return order


async def get_item(
    db: AsyncSession,
    dish_id: UUID | int,
) -> models.OrderItem | None:
    query = select(models.OrderItem).filter(models.OrderItem.dish_id == dish_id)
    return (await db.execute(query)).scalars().unique().first()


async def update_item(
    db: AsyncSession,
    model: models.OrderItem,
) -> models.OrderItem | None:
    query = (
        update(models.OrderItem)
        .where(models.OrderItem.id == model.id)
        .values(quantity=model.quantity)
    )
    await db.execute(query)
    await db.commit()

    return await get_item(db, model.dish_id)


async def create(
    db: AsyncSession,
    model: models.Order,
) -> models.Order:
    db.add(model)
    await db.commit()

    return model


async def update_status(
    db: AsyncSession,
    model: models.Order,
) -> models.Order:
    
    query = update(models.Order).filter(
        models.Order.id == model.id,
    ).values(status= model.status)
    await db.execute(query)
    await db.commit()

    return await get(db, model.id)

async def add_item(
    db: AsyncSession,
    model: models.OrderItem,
) -> models.OrderItem:
    db.add(model)
    await db.commit()

    return model


async def remove(
    db: AsyncSession,
    id: UUID | int,
) -> bool:
    query = delete(models.Order).where(models.Order.id == id)
    deleted = (await db.execute(query)).rowcount
    await db.commit()

    return deleted == 1


async def remove_item(
    db: AsyncSession,
    id: UUID | int,
) -> bool:
    query = delete(models.OrderItem).where(models.OrderItem.id == id)
    deleted = (await db.execute(query)).rowcount
    await db.commit()

    return deleted == 1
