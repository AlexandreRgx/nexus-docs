# Architecture Decision Records

<p style="font-size: 1.1em; color: #666; margin-bottom: 2em;">
History of significant architecture decisions.
</p>

---

## What is an ADR?

An **Architecture Decision Record (ADR)** documents an important architecture decision with its context, the options considered, and the justification for the final choice.

```mermaid
graph LR
    A[Context] --> B[Options]
    B --> C[Decision]
    C --> D[Consequences]

    style A fill:#e3f2fd
    style B fill:#fff3e0
    style C fill:#e8f5e9
    style D fill:#fce4ec
```

### Structure

<div class="grid cards" markdown>

-   :material-help-circle:{ .lg .middle } **Context**

    Why do we need to make this decision?

-   :material-format-list-bulleted:{ .lg .middle } **Options**

    What alternatives were considered?

-   :material-check-circle:{ .lg .middle } **Decision**

    What did we choose and why?

-   :material-arrow-right-circle:{ .lg .middle } **Consequences**

    What are the implications?

</div>

---

## ADR Index

| ID | Title | Status | Date |
|----|-------|--------|------|
| [ADR-001](#adr-001) | AI Gateway for LLM access | :material-check-circle:{ style="color: green" } Accepted | 2025-01 |

---

## Detailed ADRs

### ADR-001

!!! success "AI Gateway for LLM access"

    **Status:** Accepted
    **Date:** 2025-01-15
    **Authors:** AI Team

#### Context

We need a unified AI Gateway to abstract access to different LLM providers (Azure OpenAI, Anthropic, Mistral, etc.) and provide common features (logging, caching, rate limiting, governance).

#### Options considered

| Option | Advantages | Disadvantages |
|--------|------------|---------------|
| **LiteLLM** | Open source, 100+ providers, OpenAI-compatible | External dependency |
| **Portkey** | Enterprise features, compliance, guardrails | Commercial license |
| **Helicone** | Observability-first, Rust-based | Limited governance |
| **Custom** | Full control | Development effort |

#### Decision

An **AI Gateway** architecture is chosen for:

- [x] OpenAI-compatible API
- [x] Multi-provider support
- [x] Built-in caching and observability
- [x] Centralized governance

#### Consequences

<div class="grid" markdown>

!!! note "Operational"
    Self-hosted deployment required

!!! note "Training"
    Team training on configuration

!!! tip "Benefits"
    Centralized cost management enabled

</div>

---

## Create an ADR

<div class="grid cards" markdown>

-   :material-file-document-edit:{ .lg .middle } **Use the ADR Template**

    ---

    Start from the standard template to propose a new architecture decision.

    [:octicons-arrow-right-24: ADR Template](../_Contributing/templates/adr.md)

</div>
