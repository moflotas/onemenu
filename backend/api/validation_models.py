from pydantic import BaseModel
from uuid import UUID
from typing import List
from decimal import Decimal
from backend.db import db_classes as models


class Ingredient(BaseModel):
    id: UUID
    name: str
    
    class Config:
        orm_mode = True


class MandatoryIngredient(Ingredient):
    pass


class OptionalIngredient(Ingredient):
    id: UUID

    is_default: bool
    cost: Decimal


class DishTrait(BaseModel):
    id: UUID
    name: str
    value: str


class Dish(BaseModel):
    id: UUID
    revision_id: UUID
    name: str
    description: str
    cost: Decimal
    traits: List[DishTrait]
    mandatory_ingredients: List[MandatoryIngredient]
    optional_ingredients: List[OptionalIngredient]


class Cafe(BaseModel):
    id: UUID
    title: str
    description: str
    menu: List[Dish]

if __name__ == "__main__":
    sushi = Ingredient(
        id="123e4567-e89b-12d3-a456-426614174000",
        name="test"
    )
    
    pivo = Ingredient(
        models.BaseIngredient(
            id="123e4567-e89b-12d3-a456-426614174000",
            name="test"
        )
    )
    
    print(sushi.id, sushi.name)