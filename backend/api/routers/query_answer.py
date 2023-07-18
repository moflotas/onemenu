# from fastapi import APIRouter, Depends
# import api.schemas as schemas


# cafe_router = APIRouter(
#     prefix="/api/web-data",
#     tags=["Query"]
# )


# @cafe_router.post("", response_model=schemas.Cafe)
# async def create_cafe(
#     cafe: schemas.Cafe,
#     db: AsyncSession = Depends(get_session),
# ) -> schemas.Cafe:
    
#     db_cafe = schemas.Cafe.to_orm(cafe)
    
#     db_cafe = await crud.create(db, db_cafe)
#     return schemas.Cafe.from_orm(db_cafe)


# @cafe_router.get("/{cafe_id}", response_model=schemas.Cafe)
# async def get_cafe(
#     cafe_id: UUID,
#     db: AsyncSession = Depends(get_session),
# ) -> schemas.Cafe:
#     db_cafe = await crud.get(db, cafe_id)
#     return schemas.Cafe.from_orm(db_cafe)


# @cafe_router.get("", response_model=list[schemas.Cafe])
# async def get_cafes(
#     db: AsyncSession = Depends(get_session),
# ) -> schemas.Cafe:
#     cafes = await crud.get_all(db)
#     return [schemas.Cafe.from_orm(cafe) for cafe in cafes]