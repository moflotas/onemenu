import os
from pyrogram import Client, filters
from pyrogram.types import (
    MenuButtonWebApp,
    WebAppInfo,
    Message,
    ReplyKeyboardMarkup,
    KeyboardButton,
    InlineKeyboardMarkup,
    InlineKeyboardButton,
    ReplyKeyboardRemove,
)
import dotenv
from db.session import async_session
import db.crud.customer as customer_crud
import db.models as models
from pyrogram.enums import ParseMode

dotenv.load_dotenv()

api_id = int(os.environ.get("API_ID"))
api_hash = os.environ.get("API_HASH")
bot_token = os.environ.get("BOT_TOKEN")
url = os.environ.get("URL")
user_ids = [612665336]


# Create a new Pyrogram client instance
app = Client("onemenu", api_id=api_id, api_hash=api_hash, bot_token=bot_token)


# Define a handler function for the /start command
@app.on_message(filters.command("start"))
async def start_handler(client: Client, message: Message):
    # Send a welcome message to the user
    await client.send_message(
        message.chat.id,
        text="Added Scan QR button",
        reply_markup=InlineKeyboardMarkup(
            [[InlineKeyboardButton(text="Scan QR", web_app=WebAppInfo(url=url))]]
        ),
    )


@app.on_message(filters.command("ask"))
async def start_handler(client: Client, message: Message):
    # Send a welcome message to the user
    text = (
        "Sorry, cannot answer on empty messages. \nTry /ask __you question here__"
        if not message.command[1:]
        else "BIBA"
    )
    await client.send_message(
        message.chat.id,
        text=text,
        parse_mode=ParseMode.MARKDOWN,
    )


@app.on_message()
async def forward_message_handler(client: Client, message: Message):
    # await client.send_message(message.chat.id, message.text)
    if message.chat.id not in [685437812]:
        await client.send_message(
            chat_id=message.chat.id,
            text="Sorry, I don't understand you \nPerhaps, you wanted to execute /ask command",
        )
        return

    async with async_session() as session:
        for user in await customer_crud.get_all(session):
            await client.copy_message(
                chat_id=user.id,
                from_chat_id=message.chat.id,
                message_id=message.id,
            )


# Start the bot
app.run()
