# Product Suite Registry

<p style="font-size: 1.1em; color: #666; margin-bottom: 2em;">
Centralized registry for Cegid client environments and product instances.
</p>

!!! info "External Documentation"

    For complete documentation, see the **[Product Suite Registry on Notion](https://cegid.notion.site/Product-Suite-Registry-29deeec0096a802aa29ff6fe2796b10c)**.

---

## Overview

Cegid clients use multiple solutions (HR, Finance, Payroll, etc.), each with several instances (Production, Pre-production, Test...).

The **Product Suite Registry** creates a centralized registry of client environments that can:

- **Automatically discover** instances of Cegid products
- **Structure** them by organization and environment
- **Provide a single entry point** for applications to interact with these systems without manual configuration

---

## Use Case

A user or Cegid application (M2M) wants to interact with a client's various Cegid solutions.

**Input**: Only the client environment name (e.g., `SNCF - Production`)

**Query**: "Give me the instances associated with this environment"

**Output**: All necessary information to operate:

```
HR_API_URL = https://hr.sncf.cegid.com/prod
XRP_ULTIMATE_API_URL = https://xrpu.sncf.cegid.com/prod
PAYROLL_API_URL = https://payroll.sncf.cegid.com/prod
```

No manual configuration. No searching. No errors.

---

## Key Concepts

| Term | Definition |
|------|------------|
| **SIC Code** | Cegid client contract |
| **Organization** | Grouping of a client's contracts (SIC) to manage their usage |
| **Product Suite** | Cegid product exposing instances (e.g., HR, Finance, Search) |
| **Instance** | Deployment of a product for a SIC (e.g., Cegid HR - Prod for SNCF) |
| **Environment** | Coherent set of cross-product instances (e.g., PROD, PREPROD, TEST) |

---

## Identified Use Cases

- Portal EBD
- Multi-product AI agents
- Data Finance
- HR Reporting

---

[:octicons-arrow-right-24: Full Documentation](https://cegid.notion.site/Product-Suite-Registry-29deeec0096a802aa29ff6fe2796b10c){ .md-button .md-button--primary }
