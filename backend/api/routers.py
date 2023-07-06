from fastapi import APIRouter
from api.validation_models import Cafe
from uuid import UUID
from decimal import Decimal


cafe_router = APIRouter(
    prefix="/cafe"
)


example_cafe = Cafe(
    id= "eec7e937-e35d-4df4-8bee-34afce79eb95",
    title= "Small Boss",
    description= "Not Big, rather Small cafe",
    menu= [
        {
            "id": "4915acd1-f547-4ef5-8450-3a0d4f4bc335",
            "revision_id": "a87ec1d3-bc14-47d0-851e-0d67ec662fd8",
            "name": "Kish",
            "description": "A pie",
            "cost": Decimal(12.6),
            "traits": [],
            "mandatory_ingredients": [],
            "optional_ingredients": [],
        },
    ]
)


@cafe_router.get("/{cafe_id}", response_model=Cafe)
def get_cafe(cafe_id: UUID = "eec7e937-e35d-4df4-8bee-34afce79eb95"):
    return example_cafe
