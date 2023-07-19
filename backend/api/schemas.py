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
        return models.DishTrait(
            name=schema.name,
            value=schema.value,
        )

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
    image_url: Optional[str] = "https://http.cat/200"
    cost: Decimal
    category: str
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
            image_url=schema.image_url,
            cost=schema.cost,
            category=schema.category,
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
            image_url=model.image_url,
            cost=model.cost,
            category=model.category,
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
                    "cafe_id": str(uuid4()),
                    "name": "Philadelphia sushi",
                    "description": "As simple as it is tasty!",
                    "image_url": "https://http.cat/200",
                    "cost": 12.50,
                    "category": "sushi",
                    "traits": [{"name": "Size", "value": "Big"}],
                    "mandatory_ingredients": [{"name": "Rice"}, {"name": "Salmon"}],
                    "optional_ingredients": [
                        {"name": "Soy", "is_default": True, "cost": 10.10},
                        {"name": "Wasabi", "is_default": False, "cost": 10.10},
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

    model_config = {
        "json_schema_extra": {
            "examples": [
                {
                    "title": "Small Boss",
                    "description": "The best cafe in the world",
                    "menu": [
                        {
                            "name": "Kish",
                            "description": "Very tasty",
                            "cost": 100,
                            "image_url": "https://http.cat/200",
                            "category": "bakery",
                            "traits": [{"name": "Size", "value": "Big"}],
                            "mandatory_ingredients": [{"name": "Flour"}],
                            "optional_ingredients": [
                                {
                                    "name": "Sugar",
                                    "is_default": True,
                                    "cost": 10,
                                }
                            ],
                        }
                    ],
                }
            ]
        }
    }


class OrderOptional(Base):
    order_item_id: UUID
    optional_id: UUID

    @staticmethod
    def to_orm(schema):
        return models.OrderOptional(
            order_item_id=schema.order_item_id,
            optional_id=schema.optional_id,
        )

    @staticmethod
    def from_orm(model):
        return OrderOptional(
            order_item_id=model.order_item_id,
            optional_id=model.optional_id,
        )


class OrderItem(Base):
    id: Optional[UUID] = None
    order_id: Optional[UUID] = None
    dish_id: UUID
    revision_id: Optional[UUID] = None
    quantity: int
    cost: Optional[float] = 0
    image_url: Optional[str] = "https://http.cat/200"
    name: Optional[str] = "Kish"
    status: models.OrderItemStatus = models.OrderItemStatus.IN_PROGRESS
    start_date: Optional[datetime] = None
    end_date: Optional[datetime] = None
    optionals: Optional[list[OptionalIngredient]] = []

    @staticmethod
    def to_orm(schema):
        return models.OrderItem(
            order_id=schema.order_id,
            dish_id=schema.dish_id,
            revision_id=schema.revision_id,
            quantity=schema.quantity,
            cost=schema.cost,
            image_url=schema.image_url,
            name=schema.name,
            status=schema.status,
            start_date=schema.start_date,
            end_date=schema.end_date,
            optionals=[
                OptionalIngredient.to_orm(optional) for optional in schema.optionals
            ],
        )

    @staticmethod
    def from_orm(model):
        return OrderItem(
            id=model.id,
            order_id=model.order_id,
            dish_id=model.dish_id,
            revision_id=model.revision_id,
            quantity=model.quantity,
            cost=model.cost,
            image_url=model.image_url,
            name=model.name,
            status=model.status,
            start_date=model.start_date,
            end_date=model.end_date,
            optionals=[
                OptionalIngredient.from_orm(optional) for optional in model.optionals
            ],
        )

    model_config = {
        "json_schema_extra": {
            "examples": [
                {
                    "order_id": "",
                    "dish_id": "",
                    "quantity": 1,
                    "cost": Decimal(126),
                    "image_url": "",
                    "name": "aaaaa",
                }
            ]
        }
    }


class User(Base):
    id: Optional[int] = None
    name: Optional[str]

    @staticmethod
    def to_orm(schema):
        return models.User(
            name=schema.name,
        )

    @staticmethod
    def from_orm(model):
        return User(
            id=model.id,
            name=model.name,
        )


class Address(Base):
    id: Optional[UUID] = None
    address: str

    @staticmethod
    def to_orm(schema):
        return models.Address(
            address=schema.address,
        )

    @staticmethod
    def from_orm(model):
        return Address(
            id=model.id,
            address=model.address,
        )


class Customer(User):
    birthday: Optional[datetime] = None
    addresses: Optional[List[Address]] = []

    @staticmethod
    def to_orm(schema):
        return models.Customer(
            name=schema.name,
            birthday=schema.birthday,
            addresses=[Address.to_orm(address) for address in schema.addresses],
        )

    @staticmethod
    def from_orm(model):
        return Customer(
            id=model.id,
            name=model.name,
            birthday=model.birthday,
            addresses=[Address.from_orm(address) for address in model.addresses],
        )

    model_config = {
        "json_schema_extra": {
            "examples": [
                {
                    "name": "Cus",
                    "birthday": "2000-03-25T12:58:31.049",
                    "addresses": [{"address": "Inno City"}],
                }
            ]
        }
    }


class Employee(User):
    job_position: Optional[models.JobTitle]
    cafe_id: Optional[UUID] = None

    @staticmethod
    def to_orm(schema):
        return models.Employee(
            name=schema.name,
            cafe_id=schema.cafe_id,
            job_position=schema.job_position,
        )

    @staticmethod
    def from_orm(model):
        return Employee(
            id=model.id,
            cafe_id=model.cafe_id,
            name=model.name,
            job_position=model.job_position,
        )

    model_config = {
        "json_schema_extra": {
            "examples": [
                {
                    "name": "Emp",
                    "job_position": models.JobTitle.WAITER,
                    "cafe_id": "",
                }
            ]
        }
    }


class Order(Base):
    id: Optional[UUID] = None
    rating: Optional[int] = None
    clients_num: Optional[int] = None
    status: models.OrderStatus = models.OrderStatus.IN_PROGRESS
    start_date: Optional[datetime] = None
    end_date: Optional[datetime] = None
    payment_type: Optional[models.PaymentType] = None
    items: List[OrderItem] = []
    customer_id: int
    employee_id: Optional[int] = None

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
            customer_id=schema.customer_id,
            employee_id=schema.employee_id,
        )

    @staticmethod
    def from_orm(model):
        return Order(
            id=model.id,
            rating=model.rating,
            clients_num=model.clients_num,
            status=model.status,
            start_date=model.start_date,
            end_date=model.end_date,
            payment_type=model.payment_type,
            items=[OrderItem.from_orm(item) for item in model.items],
            customer_id=model.customer_id,
            employee_id=model.employee_id,
        )

    model_config = {
        "json_schema_extra": {
            "examples": [
                {
                    "customer_id": "",
                }
            ]
        }
    }


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
