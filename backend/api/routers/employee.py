from uuid import UUID
from fastapi import APIRouter, Depends
import db.models as models
import api.schemas as schemas
import db.crud.employee as crud
from db.session import get_session
from sqlalchemy.ext.asyncio import AsyncSession


employee_router = APIRouter(
    prefix="/api/employee",
    tags=["User"]
)


@employee_router.post("", response_model=schemas.Employee)
async def create_employee(
    employee: schemas.Employee,
    db: AsyncSession = Depends(get_session),
) -> schemas.Employee:
    
    db_employee = schemas.Employee.to_orm(employee)
    
    db_employee = await crud.create(db, db_employee)
    return schemas.Employee.from_orm(db_employee)


@employee_router.get("/{employee_id}", response_model=schemas.Employee)
async def get_employee(
    employee_id: UUID,
    db: AsyncSession = Depends(get_session),
) -> schemas.Employee:
    db_employee = await crud.get(db, employee_id)
    return schemas.Employee.from_orm(db_employee)
