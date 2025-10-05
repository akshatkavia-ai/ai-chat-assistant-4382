#!/bin/bash
cd /home/kavia/workspace/code-generation/ai-chat-assistant-4382/frontend_client
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

