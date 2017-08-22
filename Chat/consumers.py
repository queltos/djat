import json
from channels import Group, Channel
from channels.auth import channel_session_user, channel_session_user_from_http
from urllib.parse import parse_qs
from datetime import datetime

from .models import ChatMessage


def msg_consumer(message):
    print('msg_consumer got a message: ' + str(message))
    room = message.content['room']
    username = message.content['username']
    ChatMessage.objects.create(
        room=room,
        username=username,
        message=message.content['message'],
        post_date=datetime.now()
    )
    Group("chat-%s" % room).send({
        "text": json.dumps({
            "message": message.content['message'],
            "username": username,
        })
    })


@channel_session_user_from_http
def ws_connect(message, room_name):
    message.reply_channel.send({"accept": True})
    message.channel_session['room'] = room_name

    params = parse_qs(message.content["query_string"])
    if b"username" in params:
        message.channel_session["username"] = params[b"username"][0].decode("utf8")
        # TODO use message.user.username from django session (we're getting this from decorator)
        Group("chat-%s" % room_name).add(message.reply_channel)
    else:
        message.reply_channel.send({"close": True})

    last_messages = ChatMessage.objects.filter(room=room_name).order_by('-post_date')[:3]
    for cm in reversed(last_messages):
        message.reply_channel.send({
            "text": json.dumps({
                "message": cm.message,
                "username": cm.username,
            })
        })


@channel_session_user
def ws_message(message):
    print("sending message to room: " + message.channel_session['room'])
    Channel("chat-messages").send({
        "room": message.channel_session['room'],
        "username": message.channel_session['username'],
        "message": message['text'],
    })


@channel_session_user
def ws_disconnect(message):
    room_name = message.channel_session['room']
    Group("chat-%s" % room_name).discard(message.reply_channel)

