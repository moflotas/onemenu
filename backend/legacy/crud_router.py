from fastapi import APIRouter, Depends
from uuid import UUID
from sqlalchemy.ext.asyncio import AsyncSession
import db.models as models
import api.schemas as schemas
from db.session import get_session


class CrudRouter(APIRouter):
    def __init__(self, db_model: models.Base, pd_model: schemas.BaseModel, repository: DAL.BaseRepository, **kwargs):
        self.db_model = db_model
        self.pd_model = pd_model
        self.repository = repository
        super().__init__(**kwargs)
        self.add_crud_router()

    def add_crud_router(self):
        async def create(entity: self.pd_model, db: AsyncSession = Depends(get_session)):
            return await self.repository.create(db, self.db_model, entity)

        async def get(id: UUID | int, db: AsyncSession = Depends(get_session)):
            return await self.repository.get(db, self.db_model, id)

        async def delete(id: UUID | int, db: AsyncSession = Depends(get_session)):
            return await self.repository.remove(db, self.db_model, id)

        self.add_api_route(
            "/",
            create,
            response_model=self.pd_model,
            status_code=201,
            methods=["POST"],
        )
        self.add_api_route(
            "/{id}",
            get,
            response_model=self.pd_model,
            methods=["GET"],
        )
        self.add_api_route(
            "/{id}",
            delete,
            methods=["DELETE"],
        )

        