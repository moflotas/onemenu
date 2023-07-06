from faker import Faker
from faker_food import FoodProvider
from uuid import uuid4

import db.db_classes as db_models

fake = Faker()
fake.add_provider(FoodProvider)


for i in range(3):
    print(fake.dish())
    print(fake.dish_description())
    print(fake.ethnic_category())
    print(fake.fruit())
    print(fake.ingredient())
    print(fake.measurement())
    print(fake.measurement_size())
    print(fake.metric_measurement())
    print(fake.spice())
    print(fake.sushi())
    print(fake.vegetable())
    print()


