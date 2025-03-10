""" WebSocket consumer for real-time collaboration features. """

import json
from channels.generic.websocket import AsyncWebsocketConsumer


class CollaborationConsumer(AsyncWebsocketConsumer):
    """ WebSocket consumer for real-time collaboration features. """
    async def connect(self):
        self.room_group_name = 'collaboration'
        # Join the collaboration group
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )
        await self.accept()

    async def disconnect(self, close_code):
        # Leave the collaboration group on disconnect
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    async def receive(self, text_data):
        # Receive message from WebSocket client and broadcast it
        data = json.loads(text_data)
        message = data.get('message', '')
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'collaboration_message',
                'message': message
            }
        )

    async def collaboration_message(self, event):
        # Send message to WebSocket client
        message = event['message']
        await self.send(text_data=json.dumps({'message': message}))
