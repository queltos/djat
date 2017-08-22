import os
from channels.asgi import get_channel_layer

os.environ.setdefault("DJAGO_SETTINGS_MODULE", "djat.settings")

channel_layer = get_channel_layer()