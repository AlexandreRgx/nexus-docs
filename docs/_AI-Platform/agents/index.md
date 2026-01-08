---
title: Agents
---

# Agents

<p style="font-size: 1.1em; color: #666; margin-bottom: 2em;">
Create, deploy, and manage AI agents in production.
</p>

---

## What is an Agent?

An agent is a program that uses an LLM to accomplish tasks autonomously. Unlike a simple chatbot, an agent can:

- **Use tools**: Call APIs, execute code, search the web
- **Reason**: Break down a complex problem into steps
- **Iterate**: Correct its errors and refine its responses
- **Collaborate**: Communicate with other agents

---

## Protocol Stack

Agents in the Cegid ecosystem communicate through three open protocols:

![AI Protocol Stack](ai-protocol-stack.avif)

| Protocol | Purpose | Specification |
|----------|---------|---------------|
| **AG-UI** | Agent ↔ User Interface | [docs.ag-ui.com](https://docs.ag-ui.com) |
| **A2A** | Agent ↔ Agent | [a2a-protocol.org](https://a2a-protocol.org) |
| **MCP** | Agent ↔ Tools | [modelcontextprotocol.io](https://modelcontextprotocol.io) |

---

## Nexus Agent Platform

Use any agent framework. Nexus provides the infrastructure.

<div class="grid cards" markdown>

-   :material-server:{ .lg .middle } **Hosting & SDK**

    ---

    Managed runtime, identity, observability.

    [:octicons-arrow-right-24: Deploy](_1-hosting.md)

-   :material-badge-account:{ .lg .middle } **Identity & A2A**

    ---

    Authentication and agent-to-agent communication.

    [:octicons-arrow-right-24: Configure](_2-identity.md)

-   :material-format-list-bulleted:{ .lg .middle } **Agent Registry**

    ---

    Discover and publish agents in the Cegid ecosystem.

    [:octicons-arrow-right-24: Browse](#agent-registry)

-   :material-wrench:{ .lg .middle } **Tools**

    ---

    Pre-integrated tools: RAG, Code Exec, Web Search.

    [:octicons-arrow-right-24: Explore](_4-tools.md)

-   :material-database-search:{ .lg .middle } **RAG API**

    ---

    Intelligent search over documents and knowledge bases.

    [:octicons-arrow-right-24: Learn more](_6-rag-api.md)

-   :material-monitor:{ .lg .middle } **Frontend**

    ---

    React component for agent interfaces (AG-UI).

    [:octicons-arrow-right-24: Integrate](_5-frontend.md)

</div>

---

## Quick Start

```bash
# Create a new agent project
nexus ai agent new my-assistant --framework langgraph

# Run locally
cd my-assistant
nexus ai agent serve

# Deploy to production
nexus ai agent deploy --env production
```

---

## Agent Registry

The Agent Registry lists all agents available in the Cegid ecosystem. It uses the [A2A protocol](https://a2a-protocol.org) for discovery.

### Agent Card

Each agent publishes an **Agent Card** (JSON) describing its capabilities:

```json
{
  "name": "invoice-assistant",
  "description": "Helps with invoice processing and queries",
  "url": "https://agents.cegid.cloud/invoice-assistant",
  "skills": [
    { "name": "search_invoices", "description": "Search invoices by criteria" },
    { "name": "create_invoice", "description": "Create a new invoice" }
  ],
  "authentication": {
    "type": "bearer",
    "issuer": "https://auth.cegid.cloud"
  }
}
```

### Discover agents

```bash
# List available agents
nexus ai agent list

# Get agent details
nexus ai agent info invoice-assistant
```

### Publish your agent

```bash
# Register in the catalog
nexus ai agent publish --env production
```

Once published, your agent is discoverable by other agents and applications in the Cegid ecosystem.
