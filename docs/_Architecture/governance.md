# Identity & Governance

<p style="font-size: 1.1em; color: #666; margin-bottom: 2em;">
Identity, Teams, and Resource Governance model.
</p>

---

## Overview

```mermaid
graph TB
    subgraph "Identity"
        AAD[Azure AD]
    end

    subgraph "Governance"
        NA[Nexus Admin]
        TL[Team Leader]
        TM[Team Member]
    end

    subgraph "Resources"
        DEV[dev]
        TEST[test]
        PROD[prod]
    end

    AAD --> NA
    AAD --> TL
    AAD --> TM

    NA --> TL
    TL --> DEV
    TL --> TEST
    TL --> PROD
    TM --> DEV
    TM --> TEST
    TM --> PROD
```

---

## Identity & Access Management

<div class="grid" markdown>

!!! info "Azure AD as Source of Truth"

    | Principle | Description |
    |-----------|-------------|
    | **Source of Truth** | Azure AD is the single identity source |
    | **Authentication** | SSO mandatory, no local Nexus accounts |
    | **Sync** | Users and application identities synced from Azure AD |

</div>

---

## Roles

<div class="grid cards" markdown>

-   :material-shield-crown:{ .lg .middle } **Nexus Admin**

    ---

    - Create, modify, or archive Teams
    - Appoint or revoke Team Leaders
    - Define global platform rules (default quotas, environments, providers, policies)

-   :material-account-tie:{ .lg .middle } **Team Leader**

    ---

    - Can lead one or multiple Teams
    - Manage Team members
    - Create and administer team-scoped resources
    - Define quotas per environment
    - Responsible for usage, costs, and compliance

-   :material-account:{ .lg .middle } **Team Member**

    ---

    - Access only their Team's resources
    - No governance rights

</div>

---

## Team Lifecycle

### Creation (via ServiceNow)

All Team creation goes through **ServiceNow**:

```mermaid
graph LR
    A[ServiceNow Request] --> B[Nexus Admin Validation]
    B --> C[Team Created in Nexus]
    C --> D[Roles Applied via Azure AD]
```

Request includes: name, description, Team Leader(s), environments, initial quotas.

### Team Leader Changes

- All nominations go through ServiceNow
- Validated by Nexus Admin
- Revocation doesn't impact existing resources

---

## Teams as Ownership Unit

Teams are the central unit for:

<div class="grid" markdown>

!!! abstract "Governance"
    Policies and rules

!!! abstract "Security"
    Access control

!!! abstract "Costs"
    Budget and quotas

!!! abstract "Operations"
    Responsibility

</div>

!!! info "Key Rule"
    Every official resource belongs to a Team.

---

## Environments

| Environment | Purpose | Icon |
|-------------|---------|------|
| `dev` | Development and experimentation | :material-test-tube: |
| `test` | Integration and validation | :material-checkbox-marked-circle: |
| `prod` | Production workloads | :material-rocket-launch: |

Environments are:

- [x] Logically isolated
- [x] Independently governed
- [x] Subject to specific quotas and rules

!!! warning "Isolation"
    A resource belongs to one environment and never moves.

---

## Resource Scoping

<div class="grid" markdown>

!!! example "User-scoped (Dev only)"

    For individual experimentation and rapid prototyping:

    - Attached to an Azure AD user
    - **Only in `dev`** environment
    - Strictly limited quotas
    - No promotion possible
    - No prod dependencies

    **Examples:** personal AI agent, temporary LLM access, RAG sandbox

!!! success "Team-scoped (Default)"

    All shared resources or resources in `test`/`prod` are **Team-scoped**:

    - Quotas, costs, and responsibilities owned by the Team
    - Required for any production workload

</div>

---

## No Promotion Model

!!! danger "Critical Rule"
    There is no automatic promotion or copy mechanism between environments.

| Environment | Purpose |
|-------------|---------|
| `dev` | Exploration |
| `test` / `prod` | Intentional, governed creation |

Resources are **recreated**, never promoted.

---

## Resource Types

| Resource | Scope | Icon |
|----------|-------|------|
| **LLM Model Access** | Per Team, per environment | :material-brain: |
| **Application Registration** | Azure AD based, Team-scoped (except dev) | :material-application: |
| **Agent Hosting** | Attached to Team + environment, strict isolation | :material-robot: |

---

## Design Principles

<div class="grid cards" markdown>

-   :material-key: **SSO everywhere**

-   :material-account-cog: **Admins create teams, not users**

-   :material-ticket: **ServiceNow as governance entry point**

-   :material-account-group: **Teams own resources**

-   :material-shield-check: **No prod without ownership**

-   :material-refresh: **Recreate, don't promote**

</div>
