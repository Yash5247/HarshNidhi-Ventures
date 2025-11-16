"""
WebSocket manager for real-time updates
"""

from fastapi import WebSocket
from typing import List, Dict, Any
import json
import logging
import asyncio

logger = logging.getLogger(__name__)


class WebSocketManager:
    """Manages WebSocket connections and subscriptions"""
    
    def __init__(self):
        self.active_connections: List[WebSocket] = []
        self.subscriptions: Dict[WebSocket, List[str]] = {}
    
    async def connect(self, websocket: WebSocket):
        """Accept a new WebSocket connection"""
        await websocket.accept()
        self.active_connections.append(websocket)
        self.subscriptions[websocket] = []
        logger.info(f"WebSocket connected. Total connections: {len(self.active_connections)}")
    
    def disconnect(self, websocket: WebSocket):
        """Remove a WebSocket connection"""
        if websocket in self.active_connections:
            self.active_connections.remove(websocket)
        if websocket in self.subscriptions:
            del self.subscriptions[websocket]
        logger.info(f"WebSocket disconnected. Total connections: {len(self.active_connections)}")
    
    async def handle_message(self, websocket: WebSocket, message: str):
        """Handle incoming WebSocket message"""
        try:
            data = json.loads(message)
            action = data.get("action")
            
            if action == "subscribe":
                symbols = data.get("symbols", [])
                if websocket in self.subscriptions:
                    self.subscriptions[websocket].extend(symbols)
                await websocket.send_text(json.dumps({
                    "type": "subscribed",
                    "symbols": symbols
                }))
            
            elif action == "unsubscribe":
                symbols = data.get("symbols", [])
                if websocket in self.subscriptions:
                    self.subscriptions[websocket] = [
                        s for s in self.subscriptions[websocket] if s not in symbols
                    ]
                await websocket.send_text(json.dumps({
                    "type": "unsubscribed",
                    "symbols": symbols
                }))
            
            else:
                await websocket.send_text(json.dumps({
                    "type": "error",
                    "message": f"Unknown action: {action}"
                }))
        
        except json.JSONDecodeError:
            await websocket.send_text(json.dumps({
                "type": "error",
                "message": "Invalid JSON format"
            }))
        except Exception as e:
            logger.error(f"Error handling WebSocket message: {str(e)}")
            await websocket.send_text(json.dumps({
                "type": "error",
                "message": str(e)
            }))
    
    async def broadcast(self, message: Dict[str, Any]):
        """Broadcast message to all connected clients"""
        if not self.active_connections:
            return
        
        message_str = json.dumps(message)
        disconnected = []
        
        for connection in self.active_connections:
            try:
                await connection.send_text(message_str)
            except Exception as e:
                logger.warning(f"Error broadcasting to connection: {str(e)}")
                disconnected.append(connection)
        
        # Remove disconnected clients
        for connection in disconnected:
            self.disconnect(connection)

