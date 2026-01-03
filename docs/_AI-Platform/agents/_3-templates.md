# Agent Templates

<p style="font-size: 1.1em; color: #666; margin-bottom: 2em;">
Ready-to-use starters to create agents quickly.
</p>

---

## Available templates

| Template | Description | Use case |
|----------|-------------|----------|
| `basic` | Simple conversational agent | Chatbots, Q&A |
| `rag` | Agent with retrieval | Documentation, support |
| `react` | ReAct agent with tools | Complex tasks |
| `code` | Agent with code execution | Data analysis, automation |
| `multi` | Multi-agent orchestration | Complex workflows |

---

## Usage

```bash
# Create an agent from a template
nexus ai agent new my-agent --template rag

# List available templates
nexus ai agent templates
```

---

## Template: Basic

Simple conversational agent with memory.

```bash
nexus ai agent new my-chatbot --template basic
```

### Structure

```
my-chatbot/
├── agent.py
├── config.yaml
├── tests/
│   └── test_agent.py
└── README.md
```

### Code

```python
# agent.py
from nexus.ai.agents import Agent

class BasicAgent(Agent):
    """Simple conversational agent."""

    system_prompt = """You are a helpful and concise assistant.
    You answer questions clearly and directly."""

    model = "gpt-4o"
    temperature = 0.7
    max_tokens = 1000
```

### When to use

- Simple chatbots
- Q&A assistants
- Conversational interfaces

---

## Template: RAG

Agent with Retrieval-Augmented Generation.

```bash
nexus ai agent new doc-assistant --template rag
```

### Structure

```
doc-assistant/
├── agent.py
├── config.yaml
├── indexer.py         # Indexing script
├── data/              # Source documents
├── tests/
└── README.md
```

### Code

```python
# agent.py
from nexus.ai.agents import Agent, tool
from nexus.ai.retrieval import Retriever

class RAGAgent(Agent):
    """Agent with document search."""

    system_prompt = """You are an assistant that answers questions
    using the provided documentation.

    Always use the search_docs tool before answering.
    Cite your sources in the response."""

    def __init__(self, index_name: str = "default"):
        super().__init__()
        self.retriever = Retriever(index=index_name)

    @tool
    def search_docs(self, query: str) -> str:
        """Search in the documentation."""
        results = self.retriever.search(query, top_k=5)
        return "\n\n".join([
            f"[{r.metadata['source']}]\n{r.content}"
            for r in results
        ])
```

### Indexing

```python
# indexer.py
from nexus.ai.retrieval import Indexer

indexer = Indexer(index_name="my-docs")

# Index markdown files
indexer.add_directory("./data", pattern="*.md")

# Index a web page
indexer.add_url("https://docs.example.com")

# Build the index
indexer.build()
```

### When to use

- Technical documentation
- Customer support
- Internal knowledge base

---

## Template: ReAct

Agent that reasons and acts iteratively.

```bash
nexus ai agent new task-solver --template react
```

### Structure

```
task-solver/
├── agent.py
├── config.yaml
├── tools/
│   ├── __init__.py
│   ├── web.py
│   └── calculator.py
├── tests/
└── README.md
```

### Code

```python
# agent.py
from nexus.ai.agents import ReActAgent, tool

class TaskSolver(ReActAgent):
    """ReAct agent for solving complex tasks."""

    system_prompt = """You are an agent that solves problems step by step.

    For each step:
    1. Thought: think about what needs to be done
    2. Action: use an available tool
    3. Observation: observe the result

    Continue until you have the final answer."""

    max_iterations = 10

    @tool
    def web_search(self, query: str) -> str:
        """Search the web."""
        from nexus.ai.tools import WebSearch
        return WebSearch().search(query)

    @tool
    def calculate(self, expression: str) -> str:
        """Calculate a mathematical expression."""
        from nexus.ai.tools import Calculator
        return Calculator().evaluate(expression)

    @tool
    def get_date(self) -> str:
        """Return the current date."""
        from datetime import datetime
        return datetime.now().isoformat()
```

### When to use

- Multi-step tasks
- Problems requiring reasoning
- Complex automation

---

## Template: Code

Agent capable of executing Python code.

```bash
nexus ai agent new data-analyst --template code
```

### Structure

```
data-analyst/
├── agent.py
├── config.yaml
├── sandbox/           # Sandbox environment
├── tests/
└── README.md
```

### Code

```python
# agent.py
from nexus.ai.agents import Agent, tool
from nexus.ai.tools import CodeSandbox

class DataAnalyst(Agent):
    """Data analysis agent with code execution."""

    system_prompt = """You are a data analyst expert in Python.
    You can execute code to analyze data.

    Available libraries: pandas, numpy, matplotlib, seaborn.
    Data is in the /data folder."""

    def __init__(self):
        super().__init__()
        self.sandbox = CodeSandbox(
            allowed_packages=["pandas", "numpy", "matplotlib"],
            timeout=30
        )

    @tool
    def execute_python(self, code: str) -> str:
        """Execute Python code and return the result."""
        result = self.sandbox.run(code)
        return result.output

    @tool
    def read_csv(self, filename: str) -> str:
        """Read a CSV file and return a preview."""
        code = f"""
import pandas as pd
df = pd.read_csv('/data/{filename}')
print(df.head(10).to_string())
print(f"\\nShape: {{df.shape}}")
print(f"\\nColumns: {{list(df.columns)}}")
"""
        return self.sandbox.run(code).output
```

### When to use

- Data analysis
- Report generation
- Script automation

---

## Template: Multi-agent

Orchestration of multiple specialized agents.

```bash
nexus ai agent new research-team --template multi
```

### Structure

```
research-team/
├── orchestrator.py    # Main agent
├── agents/
│   ├── researcher.py
│   ├── analyst.py
│   └── writer.py
├── config.yaml
├── tests/
└── README.md
```

### Code

```python
# orchestrator.py
from nexus.ai.agents import Orchestrator
from .agents.researcher import Researcher
from .agents.analyst import Analyst
from .agents.writer import Writer

class ResearchTeam(Orchestrator):
    """Multi-agent research team."""

    def __init__(self):
        super().__init__()
        self.researcher = Researcher()
        self.analyst = Analyst()
        self.writer = Writer()

    async def research(self, topic: str) -> str:
        # 1. Research
        raw_data = await self.researcher.run(
            f"Research information about: {topic}"
        )

        # 2. Analysis
        analysis = await self.analyst.run(
            f"Analyze this data:\n{raw_data}"
        )

        # 3. Writing
        report = await self.writer.run(
            f"Write a report based on:\n{analysis}"
        )

        return report
```

### When to use

- Complex workflows
- Tasks requiring multiple expertises
- Processing pipelines

---

## Create your own template

```bash
# Create a custom template
nexus ai agent template create my-template

# Publish the template (team)
nexus ai agent template publish my-template
```

Template structure:

```
my-template/
├── template.yaml      # Metadata
├── files/             # Files to copy
│   ├── agent.py.j2    # Jinja2 templates
│   └── config.yaml.j2
└── hooks/
    └── post_create.sh # Post-creation script
```
