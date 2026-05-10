#!/bin/bash

# Script to generate n8n workflow
# It will try to read from .env first, then fallback to arguments.

# Load .env file
if [ -f .env ]; then
    export $(grep -v '^#' .env | xargs)
fi

TEMPLATE_FILE="workflows/n8n_ai_analysis.json"

# Use .env variables if arguments are empty
BACKEND_DOMAIN=${1:-$N8N_BACKEND_URL}
AI_DOMAIN=${2:-$N8N_AI_BASE_URL}

if [ -z "$BACKEND_DOMAIN" ]; then
    echo "Error: BACKEND_DOMAIN not provided and N8N_BACKEND_URL not found in .env"
    echo "Usage: $0 [backend_domain] [ai_base_url]"
    exit 1
fi

# Default AI Domain if not provided anywhere
if [ -z "$AI_DOMAIN" ]; then
    AI_DOMAIN="https://api.openai.com/v1"
fi

# Normalize domains (remove trailing slashes)
BACKEND_DOMAIN=$(echo "$BACKEND_DOMAIN" | sed 's:/*$::')
AI_DOMAIN=$(echo "$AI_DOMAIN" | sed 's:/*$::')

if [ ! -f "$TEMPLATE_FILE" ]; then
    echo "Error: Template file not found at $TEMPLATE_FILE"
    exit 1
fi

# Replace placeholders and output to stdout
sed -e "s|__BACKEND_URL__|$BACKEND_DOMAIN|g" \
    -e "s|__AI_BASE_URL__|$AI_DOMAIN|g" \
    "$TEMPLATE_FILE"
