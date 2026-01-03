# Golden Rules MCP

<p style="font-size: 1.1em; color: #666; margin-bottom: 2em;">
MCP server for getting advice on Cegid's best architectural choices.
</p>

---

<div style="text-align: center; margin: 2em 0;">
    <img src="../miguail.png" alt="MigAIL" style="max-width: 200px; border-radius: 50%;">
</div>

---

## What is Golden Rules MCP?

!!! tip "Architecture Advisor"

    **Golden Rules MCP** (aka MigAIL) is an MCP server that helps developers make better architectural decisions by providing guidance based on Cegid's golden rules and best practices.

---

## Features

<div class="grid cards" markdown>

-   :material-lightbulb:{ .lg .middle } **Architecture Advice**

    ---

    Get recommendations on architectural patterns, design choices, and best practices.

-   :material-check-decagram:{ .lg .middle } **Golden Rules**

    ---

    Access Cegid's curated architectural guidelines and standards.

-   :material-code-tags:{ .lg .middle } **Code Review Hints**

    ---

    Suggestions for improving code architecture and structure.

-   :material-robot:{ .lg .middle } **MCP Integration**

    ---

    Works seamlessly with any MCP-compatible AI agent.

</div>

---

## Usage

=== "Claude Code"

    Add MigAIL to your MCP configuration:

    ```json
    {
      "mcpServers": {
        "migail": {
          "command": "npx",
          "args": ["-y", "@cegid/migail-mcp"]
        }
      }
    }
    ```

=== "Agent Integration"

    ```python
    from nexus.ai import NexusAgent

    agent = NexusAgent(
        mcp_servers=["migail"]
    )

    response = agent.ask(
        "What's the best way to structure a microservice?"
    )
    ```

---

## Example Queries

| Query | MigAIL Response |
|-------|-----------------|
| "Should I use REST or GraphQL?" | Contextual recommendation based on use case |
| "How to structure my repository?" | Cegid standard project structure |
| "Best practices for error handling?" | Golden rules for exception management |
