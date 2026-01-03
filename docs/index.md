---
hide:
  - navigation
  - toc
---

# Nexus Platform

!!! warning "Documentation & Design Space"

    :material-hammer-wrench: **This is not the platform itself.** This site documents the vision, roadmap, and architecture for building the Nexus Platform. It serves as a collaborative space to design, discuss, and plan the project.

<p style="font-size: 1.4em; color: #666; margin-top: -0.5em; margin-bottom: 1.5em;">
The internal platform that unifies Engineering and AI.
</p>

<div class="grid cards" markdown>

-   :material-sitemap:{ .lg .middle } __Architecture__

    ---

    Technical overview and decisions (ADRs).

    [:octicons-arrow-right-24: View](_Architecture/index.md)

-   :material-robot:{ .lg .middle } __AI Platform__

    ---

    Model Access, Agents, and MCP ecosystem.

    [:octicons-arrow-right-24: Explore](_AI-Platform/index.md)

-   :material-server:{ .lg .middle } __Engineering Platform__

    ---

    Registries, infrastructure, and unified interfaces.

    [:octicons-arrow-right-24: Explore](_Engineering/index.md)

-   :material-clipboard-check:{ .lg .middle } __Operations__

    ---

    Observability and incident management.

    [:octicons-arrow-right-24: Explore](_Operations/index.md)

</div>

---

## Founding Principles

<div class="grid" markdown>

!!! abstract "Opinionated by Default"

    **Strong choices to move fast.**

    The platform enforces strong conventions. Fewer decisions = more velocity. Teams can focus on business value.

!!! tip "Engineering Excellence"

    **Quality is non-negotiable.**

    Tests, observability, documentation: everything is built-in from the start. Golden paths and embedded best practices.

!!! example "API-first"

    **Everything is an API, everything is programmable.**

    CLI, SDK, REST API: three interfaces, one source of truth. Auto-generated via Fern.

!!! success "Controlled Self-service"

    **Autonomy within defined boundaries.**

    Teams move forward without tickets, within governance limits. Automatic guardrails and compliance by design.

</div>

---

## The Two Pillars

<div class="grid" markdown>

!!! info "Engineering Platform"

    **Infrastructure at the service of developers.**

    | Component | Description |
    |-----------|-------------|
    | **Application Registry** | Centralized application catalog |
    | **Product Suite Registry** | Client environments & instances |
    | **Infrastructure as Code** | Declarative provisioning |
    | **Nexus Interfaces** | Unified API, SDK, CLI (Fern) |

    [:octicons-arrow-right-24: Learn more](_Engineering/index.md)

!!! warning "AI Platform"

    **Accessible, governed, observable AI.**

    | Component | Description |
    |-----------|-------------|
    | **Model Access** | Unified AI Gateway |
    | **Agents** | Templates, hosting, A2A identity |
    | **MCP Ecosystem** | MCP server catalog |
    | **Easy Building** | No-code for non-technical users |

    [:octicons-arrow-right-24: Learn more](_AI-Platform/index.md)

</div>

---

## For the Team

<div class="grid cards" markdown>

-   :material-file-document-edit:{ .lg .middle } __Propose an RFC__

    ---

    Have an idea for an evolution? Use the RFC template.

    [:octicons-arrow-right-24: RFC Template](_Contributing/templates/rfc.md)

-   :material-scale-balance:{ .lg .middle } __Document a Decision__

    ---

    Record architecture choices with an ADR.

    [:octicons-arrow-right-24: ADR Template](_Contributing/templates/adr.md)

-   :material-book-open-page-variant:{ .lg .middle } __Write a Runbook__

    ---

    Document operational procedures.

    [:octicons-arrow-right-24: Runbook Template](_Contributing/templates/runbook.md)

-   :material-pencil:{ .lg .middle } __Contribute__

    ---

    Guidelines for contributing to this documentation.

    [:octicons-arrow-right-24: Guide](_Contributing/index.md)

</div>

---

<div style="text-align: center; padding: 2em 0; color: #888;">

:material-slack: `#platform-engineering` · :material-github: [nexus-docs](https://github.com/your-org/nexus-docs)

</div>
