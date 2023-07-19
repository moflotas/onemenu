from fastapi import APIRouter, Depends
import api.schemas as schemas


query_router = APIRouter(
    prefix="/api/web-data",
    tags=["Query"]
)


# @query_router.post("", response_model=schemas.Cafe)
# async def create_cafe(
#     cafe: schemas.Cafe,
#     # db: AsyncSession = Depends(get_session),
# ) -> schemas.Cafe:
    
#     pass
