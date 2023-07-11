from uuid import UUID
from fastapi import APIRouter, Depends
import db.models as models
import api.schemas as schemas
import db.crud.cafe as crud
from db.session import get_session
from sqlalchemy.ext.asyncio import AsyncSession


# cafe_router = CrudRouter(
#     db_models.Cafe, pd_models.Cafe, DAL.BaseRepository, prefix="/cafe"
# )

cafe_router = APIRouter(
    prefix="/api/cafes",
    tags=["Cafe"]
)


@cafe_router.post("", response_model=schemas.Cafe)
async def create_cafe(
    cafe: schemas.Cafe,
    db: AsyncSession = Depends(get_session),
) -> schemas.Cafe:
    
    db_cafe = schemas.Cafe.to_orm(cafe)
    
    db_cafe = await crud.create(db, db_cafe)
    return schemas.Cafe.from_orm(db_cafe)


@cafe_router.get("/{cafe_id}", response_model=schemas.Cafe)
async def get_cafe(
    cafe_id: UUID,
    db: AsyncSession = Depends(get_session),
) -> schemas.Cafe:
    db_cafe = await crud.get(db, cafe_id)
    return schemas.Cafe.from_orm(db_cafe)


@cafe_router.get("", response_model=list[UUID])
async def get_cafes(
    db: AsyncSession = Depends(get_session),
) -> schemas.Cafe:
    ids = await crud.get_all(db)
    return ids