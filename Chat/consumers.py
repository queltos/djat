import json
from channels import Group
from channels.sessions import channel_session
from channels.auth import channel_session_user, channel_session_user_from_http
from urllib.parse import parse_qs


@channel_session_user_from_http
def ws_connect(message, room_name):
    message.reply_channel.send({"accept": True})
    params = parse_qs(message.content["query_string"])
    if b"username" in params:
        message.channel_session["username"] = params[b"username"][0].decode("utf8")
        # TODO use message.user.username from django session (we're getting this from decorator)
        Group("chat-%s" % room_name).add(message.reply_channel)
    else:
        message.reply_channel.send({"close": True})


@channel_session_user
def ws_message(message, room_name):
    Group("chat-%s" % room_name).send({
        "text": json.dumps({
            "text": message["text"],
            "username": message.channel_session["username"],
        }),
    })


@channel_session_user
def ws_disconnect(message, room_name):
    Group("chat-%s" % room_name).discard(message.reply_channel)

