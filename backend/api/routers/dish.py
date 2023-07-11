from uuid import UUID
from fastapi import APIRouter, Depends
import db.models as models
import api.schemas as schemas
import db.crud.dish as crud
from db.session import get_session
from sqlalchemy.ext.asyncio import AsyncSession


dish_router = APIRouter(
    prefix="/api/dish",
    tags=["Dish"]
)


@dish_router.post("", response_model=schemas.Dish)
async def create_dish(
    dish: schemas.Dish,
    db: AsyncSession = Depends(get_session),
) -> schemas.Dish:
    
    db_dish = schemas.Dish.to_orm(dish)
    
    db_dish = await crud.create(db, db_dish)
    return schemas.Dish.from_orm(db_dish)


@dish_router.get("/{dish_id}", response_model=schemas.Dish)
async def get_dish(
    dish_id: UUID,
    db: AsyncSession = Depends(get_session),
) -> schemas.Dish:
    db_dish = await crud.get(db, dish_id)
    return schemas.Dish.from_orm(db_dish)
