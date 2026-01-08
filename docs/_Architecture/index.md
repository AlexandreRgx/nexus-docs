# Architecture

<p style="font-size: 1.2em; color: #666; margin-bottom: 2em;">
Architecture decisions and technical documentation.
</p>

---

## Cloud Architecture

The Nexus Platform is built on AWS with Azure AD for identity management.

![General Schema](assets/Nexus%20Platform%20-%20General%20schema.png)

### Components

| Layer | Service | Purpose |
|-------|---------|---------|
| **Authentication** | Cegid Azure AD | Identity provider (SSO, OAuth2) |
| **Edge** | Amazon CloudFront | CDN and request routing |
| **Static Hosting** | Amazon S3 | Frontend assets and static files |
| **API** | Amazon API Gateway | REST API management and authorization |
| **Compute** | AWS Lambda | Serverless application logic |
| **Database** | Amazon Aurora | Relational data persistence |
| **Cache** | Amazon ElastiCache | Session storage and caching |

---

## Documentation

<div class="grid cards" markdown>

-   :material-database:{ .lg .middle } **Data Model**

    ---

    Core entities: Users, Teams, Resources, Environments.

    [:octicons-arrow-right-24: View](data-model.md)

-   :material-shield-account:{ .lg .middle } **Identity & Governance**

    ---

    Identity, Teams, and Resource Governance model. Azure AD, roles, environments.

    [:octicons-arrow-right-24: View](governance.md)

-   :material-file-document-check:{ .lg .middle } **ADRs**

    ---

    Architecture Decision Records. History of significant technical decisions.

    [:octicons-arrow-right-24: View](adrs.md)

</div>

---

## ADRs (Architecture Decision Records)

An **ADR** documents an important architecture decision with its context, the options considered, and the justification for the final choice.

```mermaid
graph LR
    A[Context] --> B[Options]
    B --> C[Decision]
    C --> D[Consequences]
```

---

## How to Contribute

<div class="grid" markdown>

!!! note "Propose a Decision"

    1. Copy the [ADR template](../_Contributing/templates/adr.md)
    2. Fill in the sections (context, options, decision, consequences)
    3. Submit a PR
    4. Review by the Architecture committee
    5. Merge = decision accepted

!!! tip "Discuss Architecture"

    Architecture discussions happen in the **weekly committee**:

    - Review pending ADRs and RFCs
    - Align on technical choices
    - Take concrete actions

</div>

---

## Related

<div class="grid cards" markdown>

-   :material-file-document-edit:{ .lg .middle } **ADR Template**

    [:octicons-arrow-right-24: View](../_Contributing/templates/adr.md)

-   :material-file-document-outline:{ .lg .middle } **RFC Template**

    [:octicons-arrow-right-24: View](../_Contributing/templates/rfc.md)

-   :material-account-group:{ .lg .middle } **Team & Committees**

    [:octicons-arrow-right-24: View](../_Team.md)

</div>
