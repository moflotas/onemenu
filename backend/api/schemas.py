from pydantic import BaseModel
from uuid import UUID
from uuid import uuid4
from typing import List, Optional
from datetime import datetime
from decimal import Decimal
from db import models


class Base(BaseModel):
    @staticmethod
    def to_orm(schema: "Base"):
        raise NotImplementedError

    @staticmethod
    def from_orm(model: models.Base):
        raise NotImplementedError


class Ingredient(Base):
    id: Optional[UUID] = None
    name: str


class MandatoryIngredient(Ingredient):
    @staticmethod
    def to_orm(schema: "MandatoryIngredient"):
        return models.MandatoryIngredient(name=schema.name)

    @staticmethod
    def from_orm(model: models.MandatoryIngredient):
        return MandatoryIngredient(
            id=model.id,
            name=model.name,
        )


class OptionalIngredient(Ingredient):
    is_default: bool
    cost: Decimal

    @staticmethod
    def to_orm(schema: "OptionalIngredient"):
        return models.OptionalIngredient(
            name=schema.name,
            is_default=schema.is_default,
            cost=schema.cost,
        )

    @staticmethod
    def from_orm(model: models.OptionalIngredient):
        return OptionalIngredient(
            id=model.id,
            name=model.name,
            is_default=model.is_default,
            cost=model.cost,
        )


class DishTrait(Base):
    id: Optional[UUID] = None
    name: str
    value: str

    @staticmethod
    def to_orm(schema: "DishTrait"):
        return models.DishTrait(name=schema.name, value=schema.value)

    @staticmethod
    def from_orm(model: models.DishTrait):
        return DishTrait(
            id=model.id,
            name=model.name,
            value=model.value,
        )


class Dish(Base):
    id: Optional[UUID] = None
    revision_id: Optional[UUID] = None
    cafe_id: Optional[UUID] = None
    name: str
    description: Optional[str] = None
    cost: Decimal
    traits: Optional[List[DishTrait]]
    mandatory_ingredients: Optional[List[MandatoryIngredient]]
    optional_ingredients: Optional[List[OptionalIngredient]]

    @staticmethod
    def to_orm(schema: "Dish"):
        return models.Dish(
            id=schema.id,
            cafe_id=schema.cafe_id,
            name=schema.name,
            description=schema.description,
            cost=schema.cost,
            traits=[DishTrait.to_orm(trait) for trait in schema.traits],
            ingredients=[
                MandatoryIngredient.to_orm(ingredient)
                for ingredient in schema.mandatory_ingredients
            ]
            + [
                OptionalIngredient.to_orm(ingredient)
                for ingredient in schema.optional_ingredients
            ],
        )

    @staticmethod
    def from_orm(model: models.Dish):
        return Dish(
            id=model.id,
            revision_id=model.revision_id,
            cafe_id=model.cafe_id,
            name=model.name,
            description=model.description,
            cost=model.cost,
            traits=[DishTrait.from_orm(trait) for trait in model.traits],
            mandatory_ingredients=[
                MandatoryIngredient.from_orm(ingredient)
                for ingredient in model.ingredients
                if isinstance(ingredient, models.MandatoryIngredient)
            ],
            optional_ingredients=[
                OptionalIngredient.from_orm(ingredient)
                for ingredient in model.ingredients
                if isinstance(ingredient, models.OptionalIngredient)
            ],
        )

    model_config = {
        "json_schema_extra": {
            "examples": [
                {
                    # "id": str(uuid4()),
                    # "revision_id": str(uuid4()),
                    "cafe_id": str(uuid4()),
                    "name": "Sushi",
                    "description": "Just Sushi",
                    "cost": 12.50,
                    "traits": [{"name": "Size", "value": "Big"}],
                    "mandatory_ingredients": [{"name": "Rice"}],
                    "optional_ingredients": [
                        {"name": "Soy", "is_default": True, "cost": 10.10}
                    ],
                }
            ]
        }
    }


class Cafe(Base):
    id: Optional[UUID] = None
    title: str = "Small Boss"
    description: Optional[str] = "The best cafe in the world"
    menu: List[Dish]
    
    #  = [
    #     Dish(
    #         name=f"Kish_{i}",
    #         description="Very tasty",
    #         cost=Decimal(100),
    #         traits=[DishTrait(name="Size", value="Big")],
    #         mandatory_ingredients=[
    #             MandatoryIngredient(name="Flour"),
    #         ],
    #         optional_ingredients=[
    #             OptionalIngredient(
    #                 name="Sugar",
    #                 cost=Decimal(10),
    #                 is_default=True,
    #             )
    #         ],
    #     )
    #     for i in range(3)
    # ]

    @staticmethod
    def to_orm(schema: "Cafe"):
        return models.Cafe(
            title=schema.title,
            description=schema.description,
            menu=[Dish.to_orm(dish) for dish in schema.menu],
        )

    @staticmethod
    def from_orm(model):
        return Cafe(
            id=model.id,
            title=model.title,
            description=model.description,
            menu=[Dish.from_orm(dish) for dish in model.menu],
        )


class OrderItem(Base):
    id: UUID
    status: models.OrderStatus
    start_date: datetime
    end_date: Optional[datetime]

    @staticmethod
    def to_orm(schema):
        return models.OrderItem(
            status=schema.status,
            start_date=schema.start_date,
            end_date=schema.end_date,
        )


class User(Base):
    id: UUID
    name: Optional[str]

    @staticmethod
    def to_orm(schema):
        return models.User(name=schema.name)


class Customer(User):
    birthday: Optional[datetime]
    addresses: List[str]

    @staticmethod
    def to_orm(schema):
        return models.Customer(
            name=schema.name, birthday=schema.birthday, addresses=schema.addresses
        )


class Employee(User):
    job_position: models.JobTitle

    @staticmethod
    def to_orm(schema):
        return models.Employee(name=schema.name, job_position=schema.job_position)


class Order(Base):
    id: UUID
    rating: Optional[int]
    clients_num: Optional[int]
    status: models.OrderStatus
    start_date: datetime
    end_date: Optional[datetime]
    payment_type: models.PaymentType
    items: List[OrderItem]
    customer: Customer

    @staticmethod
    def to_orm(schema):
        return models.Order(
            rating=schema.rating,
            clients_num=schema.clients_num,
            status=schema.status,
            start_date=schema.start_date,
            end_date=schema.end_date,
            payment_type=schema.payment_type,
            items=[OrderItem.to_orm(item) for item in schema.items],
            customer=schema.customer,
        )


class OrdersRestaurant(Order):
    table: Optional[int]

    @staticmethod
    def to_orm(schema):
        return models.Order(
            rating=schema.rating,
            clients_num=schema.clients_num,
            status=schema.status,
            start_date=schema.start_date,
            end_date=schema.end_date,
            payment_type=schema.payment_type,
            items=[OrderItem.to_orm(item) for item in schema.items],
            customer=schema.customer,
            table=schema.table,
        )


class OrdersHome(Order):
    address: str

    @staticmethod
    def to_orm(schema):
        return models.Order(
            rating=schema.rating,
            clients_num=schema.clients_num,
            status=schema.status,
            start_date=schema.start_date,
            end_date=schema.end_date,
            payment_type=schema.payment_type,
            items=[OrderItem.to_orm(item) for item in schema.items],
            customer=schema.customer,
            address=schema.address,
        )
