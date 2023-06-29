from typing import List
from typing import Optional
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column
from sqlalchemy.orm import relationship
from sqlalchemy.orm import DeclarativeBase
from sqlalchemy import ForeignKey
from sqlalchemy.dialects.postgresql import UUID, TEXT, VARCHAR, NUMERIC, TIMESTAMP, BOOLEAN, INTEGER, ENUM
import uuid


class Base(DeclarativeBase):
    pass


class Dish(Base):
    __tablename__ = "dishes"

    dish_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    revision_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    cafe_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("cafes.cafe_id"))
    name: Mapped[str] = mapped_column(VARCHAR(100), nullable=False)
    description: Mapped[str] = mapped_column(TEXT())
    cost: Mapped[float] = mapped_column(NUMERIC(6, 2), nullable=False)
    start_date = mapped_column(TIMESTAMP(), nullable=False)
    end_date = mapped_column(TIMESTAMP())


class DishTrait(Base):
    __tablename__ = "dish_traits"

    trait_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    dish_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("dishes.dish_id"))
    revision_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("dishes.revision_id"))
    name: Mapped[str] = mapped_column(VARCHAR(100), nullable=False)
    value: Mapped[str] = mapped_column(VARCHAR(100), nullable=False)


class MandatoryIngredient(Base):
    __tablename__ = "mandatory_ingredients"

    mandatory_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    dish_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("dishes.dish_id"))
    revision_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("dishes.revision_id"))
    name: Mapped[str] = mapped_column(VARCHAR(100), nullable=False)


class OptionalIngredient(Base):
    __tablename__ = "optional_ingredients"

    optional_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    dish_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("dishes.dish_id"))
    revision_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("dishes.revision_id"))
    name: Mapped[str] = mapped_column(VARCHAR(100), nullable=False)
    is_default : Mapped[bool] = mapped_column(BOOLEAN(), nullable=False)
    cost: Mapped[float] = mapped_column(NUMERIC(6, 2), nullable=False)


class Order(Base):
    __tablename__ = "orders"

    order_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    customer_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("customers.user_id"))
    employee_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("employee.user_id"))
    rating: Mapped[int] = mapped_column(INTEGER())
    clients_num: Mapped[int] = mapped_column(INTEGER())
    status = mapped_column(ENUM("in_progress", "ready", "completed", "cancelled", name="order_status"), nullable=False)
    start_date = mapped_column(TIMESTAMP(), nullable=False)
    end_date = mapped_column(TIMESTAMP())
    payment_type = mapped_column(ENUM("by_cash", "by_card", name="payment_type"))


class OrderItem(Base):
    __tablename__ = "order_items"

    order_item_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    order_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("orders.order_id"))
    dish_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("dishes.dish_id"))
    revision_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("dishes.revision_id"))
    status = mapped_column(ENUM("in_progress", "ready", "cancelled", name="order_item_status"), nullable=False)
    start_date = mapped_column(TIMESTAMP(), nullable=False)
    end_date = mapped_column(TIMESTAMP())


class OrderOptional(Base):
    __tablename__ = "order_optionals"

    order_item_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("order_items.order_item_id"), primary_key=True)
    optional_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("optional_ingredients.optional_id"), primary_key=True)


class OrdersRestaurant(Order):
    __tablename__ = "orders_restaurant"

    order_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("orders.order_id"), primary_key=True)
    table: Mapped[int] = mapped_column(INTEGER())

    __mapper_args__ = {
        "polymorphic_identity": "order_restaurant"
    }


class OrdersHome(Order):
    __tablename__ = "orders_home"

    order_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("orders.order_id"), primary_key=True)
    address_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("addresses.address_id"))

    __mapper_args__ = {
        "polymorphic_identity": "order_home"
    }

class User(Base):
    __tablename__ = "users"

    user_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name: Mapped[str] = mapped_column(VARCHAR(100), nullable=False)


class Customer(User):
    __tablename__ = "customers"

    user_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("users.user_id"), primary_key=True)

    __mapper_args__ = {
        "polymorphic_identity": "customer"
    }


class Employee(User):
    __tablename__ = "employee"

    user_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("users.user_id"), primary_key=True)
    cafe_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("cafes.cafe_id"))
    job_position = mapped_column(ENUM("", name="job_itle"), nullable=False)


    __mapper_args__ = {
        "polymorphic_identity": "employee"
    }
