# Data Model

<p style="font-size: 1.1em; color: #666; margin-bottom: 2em;">
Core data model for the Nexus Platform.
</p>

---

## Overview

![Nexus Data Model](assets/Nexus%20Data%20Model.png)

[:material-open-in-new: See it on dbdiagram.io](https://dbdiagram.io/d/Nexus-Data-Model-695f83e2d6e030a024743aab){ .md-button }

This model represents a technical product management platform integrated with Azure AD, with full auditability.

- **Products** are the core organizational unit, grouping resources
- **Access control** is driven by Azure AD groups, with optional application-level RBAC
- **Resources** are deployed across environments with version tracking
- **Audit logs** ensure traceability and compliance

---

## Core Entities

### products

Products are the central organizational unit that group resources and define ownership.

| Column | Type | Description |
|--------|------|-------------|
| `id` | integer | Primary key |
| `name` | varchar | Unique product name |
| `description` | text | Product description |
| `created_at` | timestamp | Creation date |
| `updated_at` | timestamp | Last update |

### resources

Platform resources owned by products.

| Column | Type | Description |
|--------|------|-------------|
| `id` | integer | Primary key |
| `name` | varchar | Resource name |
| `type` | enum | `application`, `agent`, `mcp_server`, `database`, `storage` |
| `product_id` | integer | FK to products (owner) |
| `status` | enum | `active`, `inactive`, `provisioning` |
| `config` | jsonb | Resource-specific configuration |
| `created_at` | timestamp | Creation date |
| `updated_at` | timestamp | Last update |

### environments

Deployment targets for resources.

| Column | Type | Description |
|--------|------|-------------|
| `id` | integer | Primary key |
| `name` | varchar | Environment name |
| `type` | enum | `development`, `staging`, `production` |
| `created_at` | timestamp | Creation date |

### resource_deployments

Tracks resource deployments across environments.

| Column | Type | Description |
|--------|------|-------------|
| `resource_id` | integer | FK to resources |
| `environment_id` | integer | FK to environments |
| `version` | varchar | Deployed version |
| `status` | enum | `deployed`, `pending`, `failed` |
| `deployed_at` | timestamp | Deployment timestamp |
| `deployed_by` | integer | FK to users (deployer) |

---

## Identity & Access

### users

Platform users synchronized from Azure AD.

| Column | Type | Description |
|--------|------|-------------|
| `id` | integer | Primary key |
| `email` | varchar | Unique email address |
| `name` | varchar | Display name |
| `role` | enum | Global role: `admin`, `user` |
| `created_at` | timestamp | Account creation date |
| `updated_at` | timestamp | Last update |

### aad_groups

Azure AD groups synchronized to the platform.

| Column | Type | Description |
|--------|------|-------------|
| `id` | integer | Primary key |
| `external_id` | varchar | Azure AD group ID |
| `display_name` | varchar | Group display name |
| `created_at` | timestamp | Sync date |
| `updated_at` | timestamp | Last sync |

### product_aad_groups

Links products to Azure AD groups for access control.

| Column | Type | Description |
|--------|------|-------------|
| `product_id` | integer | FK to products |
| `aad_group_id` | integer | FK to aad_groups |
| `created_at` | timestamp | Link creation date |

Users inherit product access through their Azure AD group memberships.

### product_members

Optional application-level RBAC for internal roles, exceptions, or service accounts.

| Column | Type | Description |
|--------|------|-------------|
| `user_id` | integer | FK to users |
| `product_id` | integer | FK to products |
| `role` | enum | `admin`, `member` |
| `joined_at` | timestamp | Membership date |

!!! info "When to use product_members"
    Use this table for:

    - Internal role differentiation (admin vs member)
    - Access exceptions not covered by Azure AD groups
    - Service accounts or technical users

---

## Audit & Compliance

### audit_logs

Complete audit trail for all significant actions.

| Column | Type | Description |
|--------|------|-------------|
| `id` | bigint | Primary key |
| `actor_user_id` | integer | FK to users (nullable for system actions) |
| `actor_type` | enum | `user`, `system`, `service` |
| `entity_type` | enum | `user`, `product`, `aad_group`, `product_aad_group`, `product_member`, `resource`, `environment`, `resource_deployment` |
| `entity_id` | integer | ID of the affected entity |
| `action` | enum | `create`, `update`, `delete`, `deploy`, `undeploy`, `link`, `unlink`, `status_change` |
| `before` | jsonb | State before the action |
| `after` | jsonb | State after the action |
| `metadata` | jsonb | Additional context |
| `created_at` | timestamp | Action timestamp |

!!! tip "Audit coverage"
    All actions are logged: creation, updates, deployments, Azure AD linking, and status changes—whether performed by users or system processes.

---

## Relationships

```
products ◄──── resources ───► resource_deployments ◄──── environments
    │
    ├──── product_aad_groups ───► aad_groups
    │
    └──── product_members ───► users
```

| Relationship | Description |
|--------------|-------------|
| products → resources | A product owns multiple resources (applications, agents, databases, etc.) |
| products → product_aad_groups → aad_groups | Access via Azure AD groups |
| products → product_members → users | Optional direct membership |
| resources → resource_deployments → environments | Resources deployed to environments |
| users → resource_deployments | Tracks who performed deployments |
| * → audit_logs | All entities are audited |

---

## Access Control Model

<div class="grid" markdown>

!!! abstract "Primary: Azure AD Groups"

    Access is primarily controlled through Azure AD group membership:

    1. Product is linked to Azure AD groups via `product_aad_groups`
    2. Users in those groups automatically have access
    3. Group membership managed in Azure AD

!!! abstract "Secondary: Product Members"

    Optional application-level RBAC via `product_members`:

    - `admin`: Full control over product and resources
    - `member`: View and operate on resources

    Used for exceptions, service accounts, or fine-grained roles.

</div>

---

## Product Registry

Reference table of registered products with their Azure AD groups and owners.

!!! info "Source"
    [Generic Services Onboarding](https://engineering.cegid.com/GenericServices/Onboarding.html)

### Integration Environment

| Product | Description | Azure AD Group | Owner |
|---------|-------------|----------------|-------|
| `aca-dev` | ACA (development) | GRP-CF-DEVOPS-DEV | Sébastien Kermarrec |
| `agenticcpa-dev` | Agentic CPA (Development) | GRP-AGENTICCPA-DEV | Loic Portales |
| `apim-dev` | Cegid API Management (Development) | GRP-CC-APIM-DEVOPS | Sébastien Lescure |
| `apim-inte` | Cegid API Management (Integration) | GRP-CC-APIM-DEVOPS | Sébastien Lescure |
| `business-os-dev` | Cegid Business OS (Development) | GRP-BUSINESS-OS-DEVOPS-DEV | Yannick Gosset |
| `business-os-inte` | Cegid Business OS (Integration) | GRP-BUSINESS-OS-DEVOPS-INTE | Yannick Gosset |
| `cda-dev` | Cegid Data Access (Development) | GRP-CC-CDA-DEVOPS | Sébastien Lescure |
| `cda-inte` | Cegid Data Access (Integration) | GRP-CC-CDA-DEVOPS | Sébastien Lescure |
| `cegidexpert-dev` | Cegid Expert (Development) | GRP-DEVOPS-CEGID-EXPERT-DEV | Yannick Gosset |
| `cegidpmi-dev` | Cegid PMI (Development) | GRP-EFACTURE-INTE-PMI | Pascal Jouin |
| `cpa-core-dev` | CPA Core (Development) | GRP-DEVOPS-CPA-CORE-DEV | Yannick Gosset |
| `cpa-core-inte` | CPA Core (Integration) | GRP-DEVOPS-CPA-CORE-INTE | Yannick Gosset |
| `cpi-dev` | CPI (Development) | GRP-8344-DEV-CPI-DEVOPS | Francois Baronnet |
| `cplib-dev` | Cegid Profession Liberale (Development) | GRP-CPLIB-DEV | Yannick Gosset |
| `crb-dev-inte` | Cegid Relations Bancaires (Dev & Inte) | GRP-CRB-DEV-INTEGRATION | Francois Panard |
| `dataviz-dev` | Dataviz (Development) | GRP-DATAVIZ-DEVOPS-DEV | Sébastien Lescure |
| `dataviz-inte` | Dataviz (Integration) | GRP-DATAVIZ-DEVOPS-INTE | Sébastien Lescure |
| `datafinance-dev` | Cegid Datafinance (Development) | GRP-DEVOPS-DEV-DATAFINANCE | Francois Panard |
| `datafinance-inte` | Cegid Datafinance (Integration) | GRP-DEVOPS-INTE-DATAFINANCE | Francois Panard |
| `devisfact-dev` | Cegid Devis Facture (Development) | GRP-DEVISFACT-DEVOPS-DEV | Yannick Gosset |
| `devisfact-inte` | Cegid Devis Facture (Integration) | GRP-DEVISFACT-DEVOPS-INTE | Yannick Gosset |
| `documents-dev` | Document Platform Services (Development) | GRP-CC-DOCS | Sebastien Lescure |
| `documents-inte` | Document Platform Services (Integration) | GRP-CC-DOCS | Sebastien Lescure |
| `dsi-group-inte` | Cegid DSI (Integration) | GRP-DSI-TO-CEGIDACCOUNT-INTE | Elie Andriafehivolarisoa |
| `dsnlink-dev` | DSN Link (Development) | GRP-DSNLINK-DEV | Damien Geranton |
| `ebd-pf-dev` | Enterprise Business Division (Development) | GRP-EBD-PF-DEV | Damien Geranton |
| `ebp-apicloud-dev` | EBP API Cloud (Development) | GRP-EBPAPICLOUD-DEVOPS-DEV | Francois Baronnet |
| `ebp-business-dev` | EBP Business (Development) | GRP-EBPBUSINESS-DEVOPS-DEV | Francois Baronnet |
| `efacture-dev` | Cegid eFacture (Development) | GRP-STREAM-EFACTURE-DEV | Joao Miguel Soares |
| `efacture-inte` | Cegid eFacture (Integration) | GRP-STREAM-EFACTURE-INTE | Joao Miguel Soares |
| `efacture-test` | Cegid eFacture (Test) | GRP-STREAM-EFACTURE-TEST | Joao Miguel Soares |
| `exalog-dev` | EXALOG (Development) | GRP-DEVOPS-EXALOG-DEV | François Panard |
| `fes-dev` | File Exchange Services (Development) | GRP-CC-FES-DEVOPS-DEV | Sébastien Lescure |
| `fes-inte` | File Exchange Services (Integration) | GRP-CC-FES-DEVOPS-INTE | Sébastien Lescure |
| `flow-dev` | Cegid Flow (Development) | GRP-FLOW-DEVOPS-DEV | Myles Rankin |
| `hcm-dev` | Human Capital Management (Development) | GRP-HCM-DEVOPSDEV | Eduardo Fernandes Vieira |
| `hru-inte` | Cegid Payroll Ultimate (Integration) | GRPRD_Cegid HR Ultimate_DEV_RHPi_HRU | Damien Geranton |
| `iam-ebp-dev` | EBP Login (Development) | GRP-EBPLOGIN-DEVOPS-DEV | Sébastien Lescure |
| `isie-dev` | Cegid ISIE (Development) | GRP-ISIE-DEVOPS-DEV | François Panard |
| `kite-dev` | Kite (Development) | GRP-KITE-DEVOPS-DEV | Maxime Duquenne |
| `leportail-dev` | Le Portail Cegid (Development) | GRP-LEPORTAIL-DEVOPS-DEV | Yannick Gosset |
| `leportail-inte` | Le Portail Cegid (Integration) | GRP-LEPORTAIL-DEVOPS-INTE | Yannick Gosset |
| `loop-dev` | Cegid Loop (Development) | GRP-LOOP-DEV | Yannick Gosset |
| `notilus-car-dev` | Cegid Notilus Car (Development) | GRP-NOTILUS-CAR-DEVOPS-DEV | François Panard |
| `notilus-integ-dev` | Cegid Notilus Intégration (Development) | Notilus Integration | François Panard |
| `notilus-tne-dev` | Cegid Notilus TnE (Development) | TNE Admin | François Panard |
| `payroll-copilot-dev` | Cegid Pulse for CPU (Development) | GRP-PAYROLL-COPILOT-DEVOPS-DEV | Damien Geranton |
| `pilot-dev` | Cegid Pilot (Development) | GRP-PILOT-DEVOPS-DEV | Yannick Gosset |
| `pilot-inte` | Cegid Pilot (Integration) | GRP-PILOT-DEVOPS-INTE | Yannick Gosset |
| `quadraplus-dev` | Quadraplus (Development) | GRP-8322-DEV-TECHNICALBASE-Contributors | Yannick Gosset |
| `retail-dev` | Retail (Development) | GRP-RETAIL-DEVOPS-DEV | Yan Peuillon |
| `retail-inte` | Retail (Integration) | GRP-Federation-RetailApps-Integration | Yan Peuillon |
| `sampleapp` | A BU sample application suite | GRP-CC-DEVOPS | Sébastien Lescure |
| `symbio-dev` | SYMBIO (Development) | GRP-SYMBIO-DEV | François Panard |
| `talent-dev` | Talent (Development) | GRP-TALENT-DEVOPS-DEV | Damien Geranton |
| `tax-dev` | Tax (CTU, Etafi) (Development) | GRP-TAXSUITE-DEV | François Panard |
| `tax-inte` | Tax (CTU, Etafi) (Integration) | GRP-TAXSUITE-INTE | François Panard |
| `tda-dev` | TDA (Development) | GRP-TDA-DEVOPS-DEV | Yannick Gosset |
| `tda-inte` | TDA (Integration) | GRP-TDA-DEVOPS-INTE | Yannick Gosset |
| `technicalbase-inte` | Technicalbase (Integration) | GRP-8322-DEV-TECHNICALBASE-Contributors | Yannick Gosset |
| `vsb-project-dev` | VSB Project (Development) | GRP-VSBPROJECT-DEVOPS-DEV | Francois Baronnet |
| `xrpflex-dev` | Cegid XRP Flex (Development) | GRP-XRPFLEX-DEVOPS-DEV | François Panard |
| `xrpflex-inte` | Cegid XRP Flex (Integration) | GRP-XRPFLEX-DEVOPS-INTE | François Panard |
| `xrpsprint-inte` | Cegid XRP Sprint (Integration) | GRP-DEVOPS-XRP-Sprint-DEV | François Panard |
| `xrpultimate-dev` | Cegid XRP Ultimate (Development) | GRP-XRP-Ultimate-DEV | Pierre Laurens |

### Production Environment

| Product | Description | Azure AD Group | Owner |
|---------|-------------|----------------|-------|
| `agenticcpa` | Agentic CPA | GRP-AGENTICCPA-PROD | Loic Portales |
| `apim` | Cegid API Management | GRP-CC-APIM-DEVOPS | Sébastien Lescure |
| `business-os` | Cegid Business OS | GRP-BUSINESS-OS-DEVOPS-PROD | Yannick Gosset |
| `cda` | Cegid Data Access | GRP-CC-CDA-DEVOPS | Sébastien Lescure |
| `cegidexpert` | Cegid Expert | GRP-DEVOPS-CEGID-EXPERT | Yannick Gosset |
| `cpi` | CPI | GRP-8344-PROD-CPI-DEVOPS | Francois Baronnet |
| `dataviz` | Dataviz | GRP-DATAVIZ-DEVOPS-PROD | Sébastien Lescure |
| `datafinance` | Cegid Datafinance | GRP-DEVOPS-PROD-DATAFINANCE | Francois Panard |
| `devisfact` | Cegid Devis Facture | GRP-DEVISFACT-DEVOPS-PROD | Yannick Gosset |
| `documents` | Document Platform Services | GRP-CC-DOCS-DEVOPS | Sebastien Lescure |
| `dsi-group` | Cegid DSI | GRP-DSI-TO-CEGIDACCOUNT-PROD | Elie Andriafehivolarisoa |
| `ebp-apicloud` | EBP API Cloud | GRP-EBPAPICLOUD-DEVOPS | Francois Baronnet |
| `efacture` | Cegid eFacture | GRP-STREAM-EFACTURE-PROD | Joao Miguel Soares |
| `exalog` | Cegid Bankx (EXALOG) | GRP-DEVOPS-BANKX-PROD | François Panard |
| `fes` | File Exchange Services | GRP-CC-FES-DEVOPS-PROD | Sébastien Lescure |
| `hcm` | Human Capital Management | GRP-HCM-DEVOPS | Eduardo Fernandes Vieira |
| `hru` | Cegid Payroll Ultimate | GRPRD_Cegid HR Ultimate_PROD_RHPi_HRU | Damien Geranton |
| `iam` | Cegid Account | GRP-ACCOUNT-DEVOPS-PROD | Sébastien Lescure |
| `isie` | Cegid ISIE | GRP-ISIE-DEVOPS-PROD | François Panard |
| `leportail` | Le Portail Cegid | GRP-LEPORTAIL-DEVOPS-PROD | Yannick Gosset |
| `loop` | Cegid Loop | GRP-LOOP-MANAGER | Yannick Gosset |
| `notilus-integ` | Cegid Notilus Intégration | Notilus Integration | François Panard |
| `notilus-tne` | Cegid Notilus TnE | GRP-NOTILUS-TNE-DEVOPS-PROD | François Panard |
| `payroll-copilot` | Cegid Pulse for CPU | GRP-PAYROLL-COPILOT-DEVOPS | Damien Geranton |
| `pilot` | Cegid Pilot | GRP-PILOT-DEVOPS-PROD | Yannick Gosset |
| `quadraplus` | Quadraplus | GRP-8322-TECHNICALBASE-Contributors | Yannick Gosset |
| `retail` | Retail | GRP-Federation-RetailApps | Yan Peuillon |
| `talent` | Talent | GRP-TALENT-DEVOPS-PRD | Damien Geranton |
| `tax` | Tax (CTU, Etafi) | GRP-TAXSUITE-PROD | François Panard |
| `tda` | TDA | GRP-TDA-DEVOPS-PROD | Yannick Gosset |
| `vsb-project` | VSB Project | GRP-VSBPROJECT-DEVOPS-PROD | Francois Baronnet |
| `xrpflex` | Cegid XRP Flex | GRP-XRPFLEX-DEVOPS-PROD | François Panard |
| `xrpsprint` | Cegid XRP Sprint | GRP-DEVOPS-XRP-Sprint | François Panard |
| `xrpultimate` | Cegid XRP Ultimate | GRP-XRP-Ultimate-PROD | Pierre Laurens |
