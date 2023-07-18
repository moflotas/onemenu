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
async def start_handler(client: Client, message):
    # Send a welcome message to the user
    await client.send_message(
        message.chat.id,
        text="Added Scan QR button",
        reply_markup=InlineKeyboardMarkup(
            [[InlineKeyboardButton(text="Scan QR", web_app=WebAppInfo(url=url))]]
        ),
    )


# @app.on_message()
# async def webapp_handler(client: Client, message: Message):
#     await client.send_message(message.chat.id, message.text)
#     # if message.chat.id in [685437812]:
#     #     for user_id in user_ids:
#     #         await client.forward_messages(
#     #             chat_id=user_id,
#     #             from_chat_id=message.chat.id,
#     #             message_ids=message.id,
#     #         )


# Start the bot
app.run()
