# Agent Tools

<p style="font-size: 1.1em; color: #666; margin-bottom: 2em;">
Pre-integrated tools to extend your agents' capabilities.
</p>

---

## Overview

Agent Tools allow agents to interact with the outside world:

```mermaid
graph LR
    AGENT[Agent] --> TOOLS{Tools}
    TOOLS --> RAG[RAG API]
    TOOLS --> CODE[Code Execution]
    TOOLS --> WEB[Web Search]
    TOOLS --> CUSTOM[Custom APIs]
```

---

## RAG API

Document search and retrieval to enrich responses.

### Usage

```python
from nexus.ai.tools import RAG

class MyAgent(Agent):
    def __init__(self):
        super().__init__()
        self.rag = RAG(index="documentation")

    @tool
    def search_docs(self, query: str) -> str:
        """Search in the documentation."""
        results = self.rag.search(query, top_k=5)
        return "\n\n".join([
            f"[{r.source}]\n{r.content}"
            for r in results
        ])
```

### Indexing

```python
from nexus.ai.tools import RAGIndexer

indexer = RAGIndexer(index="my-docs")

# Index files
indexer.add_files("./docs/*.md")

# Index text
indexer.add_text(
    content="My content",
    metadata={"source": "manual", "category": "faq"}
)

# Index from URL
indexer.add_url("https://docs.example.com")

# Build the index
indexer.build()
```

### Configuration

```yaml
tools:
  rag:
    index: documentation
    top_k: 5
    similarity_threshold: 0.7
    embedding_model: text-embedding-3-small
```

---

## Code Execution

Python code execution in a secure sandbox.

### Usage

```python
from nexus.ai.tools import CodeSandbox

class DataAgent(Agent):
    def __init__(self):
        super().__init__()
        self.sandbox = CodeSandbox(
            allowed_packages=["pandas", "numpy", "matplotlib"],
            timeout=30
        )

    @tool
    def execute_python(self, code: str) -> str:
        """Execute Python code."""
        result = self.sandbox.run(code)
        return result.output
```

### Security

The sandbox is isolated with:

- **Network**: No network access by default
- **Filesystem**: Read-only except `/tmp`
- **Resources**: Limited CPU and memory
- **Packages**: Explicit whitelist

### Allowed packages

| Package | Description |
|---------|-------------|
| `pandas` | Data manipulation |
| `numpy` | Numerical computing |
| `matplotlib` | Visualization |
| `seaborn` | Statistical visualization |
| `scikit-learn` | Basic ML |
| `requests` | HTTP (if network enabled) |

### Enable network access

```yaml
tools:
  code:
    network: true
    allowed_hosts:
      - "api.example.com"
      - "data.internal"
```

---

## Web Search

Web search to get recent information.

### Usage

```python
from nexus.ai.tools import WebSearch

class ResearchAgent(Agent):
    def __init__(self):
        super().__init__()
        self.search = WebSearch()

    @tool
    def search_web(self, query: str) -> str:
        """Search the web."""
        results = self.search.search(query, max_results=5)
        return "\n\n".join([
            f"[{r.title}]({r.url})\n{r.snippet}"
            for r in results
        ])
```

### Web navigation

To extract content from a page:

```python
from nexus.ai.tools import WebBrowser

browser = WebBrowser()

# Get page content
page = browser.get("https://example.com/article")
print(page.text)  # Extracted text content
print(page.links)  # Links on the page

# Screenshot (headless)
screenshot = browser.screenshot("https://example.com")
```

### Configuration

```yaml
tools:
  web:
    provider: bing  # or google, duckduckgo
    max_results: 10
    safe_search: true
    allowed_domains:
      - "*.wikipedia.org"
      - "docs.*"
```

---

## Custom APIs

Integrate your own APIs as tools.

### Declaration

```python
from nexus.ai.tools import api_tool

@api_tool(
    name="get_weather",
    description="Get current weather for a location"
)
async def get_weather(location: str) -> dict:
    """Get weather for a city."""
    async with httpx.AsyncClient() as client:
        response = await client.get(
            f"https://api.weather.com/v1/current",
            params={"location": location}
        )
        return response.json()


class WeatherAgent(Agent):
    tools = [get_weather]
```

### OpenAPI Integration

Generate tools from an OpenAPI spec:

```python
from nexus.ai.tools import from_openapi

# Automatically generate tools
tools = from_openapi("https://api.example.com/openapi.json")

class MyAgent(Agent):
    tools = tools
```

### MCP Integration

Use MCP servers as tools:

```python
from nexus.ai.tools import MCPTool

class MyAgent(Agent):
    def __init__(self):
        super().__init__()
        # Connect to an MCP server
        self.mcp = MCPTool("github-mcp")

    @tool
    def github_search(self, query: str) -> str:
        """Search on GitHub."""
        return self.mcp.call("search_repositories", query=query)
```

---

## Global configuration

```yaml
# config.yaml
tools:
  # RAG
  rag:
    enabled: true
    index: my-docs

  # Code execution
  code:
    enabled: true
    timeout: 30
    packages:
      - pandas
      - numpy

  # Web
  web:
    enabled: true
    max_results: 5

  # Custom
  custom:
    - name: weather
      url: https://api.weather.internal
      auth: service_account

  # MCP
  mcp:
    - name: github
      server: github-mcp
```

---

## Best practices

!!! tip "Clear descriptions"

    Tool descriptions are sent to the LLM. Be precise about what each tool does and its parameters.

    ```python
    @tool
    def search_docs(self, query: str, category: str = None) -> str:
        """Search in the internal documentation.

        Args:
            query: The question or keywords to search for.
            category: Optional. Filter by category (api, guide, faq).

        Returns:
            The 5 most relevant documents with their sources.
        """
    ```

!!! warning "Input validation"

    Always validate inputs before executing code or queries.

    ```python
    @tool
    def execute_python(self, code: str) -> str:
        if "import os" in code or "subprocess" in code:
            return "Error: Forbidden imports detected"
        # ...
    ```

!!! danger "Costs"

    Tools can consume a lot of resources. Configure limits.

    ```yaml
    tools:
      web:
        rate_limit: 10/minute
      code:
        max_executions_per_request: 5
    ```
