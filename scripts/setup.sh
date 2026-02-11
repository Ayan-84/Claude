#!/bin/bash
# ==============================================
# Setup Script: Langflow + Ollama Local Stack
# Run this on a fresh machine to get started
# Tested on: macOS, Linux (Ubuntu/Debian)
# ==============================================

echo "=== Growth Orchestration Stack Setup ==="
echo ""

# Step 1: Check Python version
echo "1. Checking Python..."
PYTHON_VERSION=$(python3 --version 2>&1)
echo "   Found: ${PYTHON_VERSION}"
echo "   Required: Python 3.10-3.13"
echo ""

# Step 2: Install uv (Python package manager)
echo "2. Installing uv (fast Python package manager)..."
if command -v uv &> /dev/null; then
    echo "   uv already installed: $(uv --version)"
else
    curl -LsSf https://astral.sh/uv/install.sh | sh
    echo "   uv installed. You may need to restart your terminal."
fi
echo ""

# Step 3: Create virtual environment and install Langflow
echo "3. Setting up Langflow..."
if [ ! -d "langflow-env" ]; then
    uv venv langflow-env
    echo "   Virtual environment created."
fi
source langflow-env/bin/activate
uv pip install langflow
echo "   Langflow installed: $(python3 -c 'import langflow; print(langflow.__version__)' 2>/dev/null || echo 'check with: langflow --version')"
echo ""

# Step 4: Check Ollama
echo "4. Checking Ollama..."
if command -v ollama &> /dev/null; then
    echo "   Ollama installed: $(ollama --version 2>&1)"
    echo "   Pulling llama3.1:8b model (this may take a few minutes)..."
    ollama pull llama3.1:8b
else
    echo "   Ollama NOT found."
    echo "   Install from: https://ollama.ai"
    echo "   Then run: ollama pull llama3.1:8b"
fi
echo ""

# Summary
echo "=== Setup Complete ==="
echo ""
echo "To start your stack:"
echo "  Terminal 1: ollama serve"
echo "  Terminal 2: source langflow-env/bin/activate && langflow run"
echo ""
echo "Langflow UI: http://localhost:7860"
echo "Ollama API:  http://localhost:11434"
echo ""
echo "Next: Open Langflow and build your first Content Atomizer flow."
echo "Reference: guide/guide.md (Chapter 1)"
