import enum
from sqlalchemy.orm import Mapped, mapped_column, DeclarativeBase, relationship
from sqlalchemy import (
    ForeignKey,
    String,
    Integer,
    DateTime,
    Boolean,
    Numeric,
    Enum,
    UUID,
    ForeignKeyConstraint,
    UniqueConstraint,
)
from sqlalchemy.ext.asyncio import AsyncAttrs
import uuid
import datetime

DEFAULT_LAZY = "joined"


class Base(AsyncAttrs, DeclarativeBase):
    pass


class Dish(Base):
    __tablename__ = "dishes"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
    )
    revision_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
    )
    cafe_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("cafes.id"), nullable=False
    )
    cafe = relationship(
        "Cafe",
        back_populates="menu",
        lazy=DEFAULT_LAZY,
    )
    name: Mapped[str] = mapped_column(String, nullable=False)
    description: Mapped[str] = mapped_column(String)
    image_url: Mapped[str] = mapped_column(String, nullable=True)
    cost: Mapped[float] = mapped_column(Numeric(6, 2), nullable=False)
    category: Mapped[str] = mapped_column(String, nullable=False)
    start_date: Mapped[datetime.datetime] = mapped_column(
        DateTime,
        nullable=False,
        default=datetime.datetime.utcnow,
    )
    end_date: Mapped[datetime.datetime] = mapped_column(DateTime, nullable=True)
    traits: Mapped[list["DishTrait"]] = relationship(
        "DishTrait",
        back_populates="dish",
        lazy=DEFAULT_LAZY,
    )
    ingredients: Mapped[list["BaseIngredient"]] = relationship(
        "BaseIngredient",
        back_populates="dish",
        lazy=DEFAULT_LAZY,
    )


class DishTrait(Base):
    __tablename__ = "dish_traits"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
    )
    dish_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
    )
    revision_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
    )
    name: Mapped[str] = mapped_column(String, nullable=False)
    value: Mapped[str] = mapped_column(String, nullable=False)

    ForeignKeyConstraint(
        [dish_id, revision_id],
        [Dish.id, Dish.revision_id],
    )

    dish: Mapped[Dish] = relationship(
        "Dish",
        back_populates="traits",
        lazy=DEFAULT_LAZY,
    )


class IngredientType(enum.Enum):
    BASE_INGREDIENT = "base_ingredient"
    MANNDATORY_INGREDIENT = "manndatory_ingredient"
    OPTIONAL = "optional_ingredient"


class BaseIngredient(Base):
    __tablename__ = "base_ingredient"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
    )
    dish_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True))
    revision_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True))
    name: Mapped[str] = mapped_column(String, nullable=False)
    type: Mapped[IngredientType] = mapped_column(Enum(IngredientType), nullable=False)

    ForeignKeyConstraint(
        [dish_id, revision_id],
        [Dish.id, Dish.revision_id],
    )

    dish: Mapped[Dish] = relationship(
        "Dish",
        back_populates="ingredients",
        lazy=DEFAULT_LAZY,
    )

    __mapper_args__ = {
        "polymorphic_identity": IngredientType.BASE_INGREDIENT,
        "polymorphic_on": type,
        "with_polymorphic": "*",
    }


class MandatoryIngredient(BaseIngredient):
    __tablename__ = "mandatory_ingredients"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("base_ingredient.id"),
        primary_key=True,
        default=uuid.uuid4,
    )

    __mapper_args__ = {
        "polymorphic_identity": IngredientType.MANNDATORY_INGREDIENT,
    }


class OptionalIngredient(BaseIngredient):
    __tablename__ = "optional_ingredients"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("base_ingredient.id"),
        primary_key=True,
        default=uuid.uuid4,
    )

    is_default: Mapped[bool] = mapped_column(Boolean, nullable=False)
    cost: Mapped[float] = mapped_column(Numeric(6, 2), nullable=False)

    __mapper_args__ = {
        "polymorphic_identity": IngredientType.OPTIONAL,
    }


class UserTypes(enum.Enum):
    USER = "user"
    CUSTOMER = "customer"
    EMPLOYEE = "employee"


class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        default=126,
    )
    name: Mapped[str] = mapped_column(String, nullable=True)
    type: Mapped[UserTypes] = mapped_column(Enum(UserTypes), nullable=False)

    __mapper_args__ = {
        "polymorphic_identity": UserTypes.USER,
        "polymorphic_on": type,
        "with_polymorphic": "*",
    }


class Customer(User):
    __tablename__ = "customers"

    id: Mapped[int] = mapped_column(ForeignKey("users.id"), primary_key=True)
    birthday: Mapped[datetime.datetime] = mapped_column(DateTime, nullable=True)

    addresses: Mapped[list["Address"]] = relationship(
        "Address",
        back_populates="customer",
        lazy=DEFAULT_LAZY,
    )
    orders: Mapped[list["Order"]] = relationship(
        "Order",
        back_populates="customer",
        lazy=DEFAULT_LAZY,
    )

    __mapper_args__ = {
        "polymorphic_identity": UserTypes.CUSTOMER,
    }


class JobTitle(enum.Enum):
    WAITER = "waiter"
    ADMIN = "admin"


class Employee(User):
    __tablename__ = "employee"

    id: Mapped[int] = mapped_column(ForeignKey("users.id"), primary_key=True)
    cafe_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("cafes.id"))
    job_position = mapped_column(Enum(JobTitle), nullable=False)
    orders: Mapped[list["Order"]] = relationship(
        "Order",
        back_populates="employee",
        lazy=DEFAULT_LAZY,
    )

    __mapper_args__ = {
        "polymorphic_identity": UserTypes.EMPLOYEE,
    }


class Address(Base):
    __tablename__ = "addresses"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    customer_id: Mapped[int] = mapped_column(ForeignKey("customers.id"))
    customer: Mapped[Customer] = relationship(
        "Customer",
        back_populates="addresses",
        lazy=DEFAULT_LAZY,
    )
    address: Mapped[str] = mapped_column(String, nullable=False)


class OrderStatus(enum.Enum):
    IN_PROGRESS = "in_progress"
    READY = "ready"
    COMPLETED = "completed"
    CANCELLED = "cancelled"


class PaymentType(enum.Enum):
    BY_CASH = "by_cash"
    BY_CARD = "by_card"


class OrderType(enum.Enum):
    BASE_ORDER = "order"
    ORDER_RESTAURANT = "order_restaurant"
    ORDER_HOME = "order_home"


class Order(Base):
    __tablename__ = "orders"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    type: Mapped[OrderType] = mapped_column(Enum(OrderType), nullable=False)
    customer_id: Mapped[int] = mapped_column(ForeignKey("customers.id"))
    employee_id: Mapped[int] = mapped_column(ForeignKey("employee.id"), nullable=True)
    rating: Mapped[int] = mapped_column(Integer, nullable=True)
    clients_num: Mapped[int] = mapped_column(Integer, nullable=True)
    status = mapped_column(
        Enum(OrderStatus),
        nullable=False,
        default=OrderStatus.IN_PROGRESS,
    )
    start_date: Mapped[datetime.datetime] = mapped_column(DateTime, default=datetime.datetime.utcnow, nullable=False)
    end_date: Mapped[datetime.datetime] = mapped_column(DateTime, nullable=True)
    payment_type: Mapped[PaymentType] = mapped_column(Enum(PaymentType), nullable=True)

    customer: Mapped[Customer] = relationship(
        "Customer",
        back_populates="orders",
        lazy=DEFAULT_LAZY,
    )
    employee: Mapped[Employee] = relationship(
        "Employee",
        back_populates="orders",
        lazy=DEFAULT_LAZY,
    )
    items: Mapped[list["OrderItem"]] = relationship(
        "OrderItem",
        back_populates="order",
        lazy=DEFAULT_LAZY,
    )

    __mapper_args__ = {
        "polymorphic_identity": OrderType.BASE_ORDER,
        "polymorphic_on": type,
        "with_polymorphic": "*",
    }


class OrderItemStatus(enum.Enum):
    IN_PROGRESS = "in_progress"
    READY = "ready"
    CANCELLED = "cancelled"


class OrderOptional(Base):
    __tablename__ = "order_optionals"

    order_item_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("order_items.id"),
        primary_key=True,
    )
    optional_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("optional_ingredients.id"),
        primary_key=True,
    )


class OrderItem(Base):
    __tablename__ = "order_items"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    order_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("orders.id"))
    dish_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True))
    revision_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True))
    quantity: Mapped[int] = mapped_column(Integer)
    cost: Mapped[float] = mapped_column(Numeric(6, 2))
    image_url: Mapped[str] = mapped_column(String)
    name: Mapped[str] = mapped_column(String)
    status: Mapped[OrderItemStatus] = mapped_column(
        Enum(OrderItemStatus),
        nullable=False,
    )
    start_date: Mapped[datetime.datetime] = mapped_column(DateTime, default=datetime.datetime.utcnow, nullable=False)
    end_date: Mapped[datetime.datetime] = mapped_column(DateTime, nullable=True)

    order: Mapped[Order] = relationship(
        "Order",
        back_populates="items",
        lazy=DEFAULT_LAZY,
    )
    optionals: Mapped[list[OptionalIngredient]] = relationship(
        "OptionalIngredient",
        secondary="order_optionals",
        lazy=DEFAULT_LAZY,
    )

    ForeignKeyConstraint(
        ["dish_id", "revision_id"],
        ["dishes.id", "dishes.revision_id"],
    )


class OrdersRestaurant(Order):
    __tablename__ = "orders_restaurant"

    order_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("orders.id"), primary_key=True
    )
    table: Mapped[int] = mapped_column(Integer)

    __mapper_args__ = {
        "polymorphic_identity": OrderType.ORDER_RESTAURANT,
    }


class OrdersHome(Order):
    __tablename__ = "orders_home"

    order_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("orders.id"), primary_key=True
    )
    address_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("addresses.id"))

    address: Mapped[Address] = relationship(
        "Address",
        lazy=DEFAULT_LAZY,
    )

    __mapper_args__ = {
        "polymorphic_identity": OrderType.ORDER_HOME,
    }


class Cafe(Base):
    __tablename__ = "cafes"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
    )
    title: Mapped[str] = mapped_column(String, nullable=False)
    description: Mapped[str] = mapped_column(String, nullable=True)

    menu: Mapped[list["Dish"]] = relationship(
        "Dish",
        back_populates="cafe",
        lazy=DEFAULT_LAZY,
    )
