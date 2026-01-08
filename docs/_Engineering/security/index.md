# Security

<p style="font-size: 1.1em; color: #666; margin-bottom: 2em;">
Security practices and guidelines for the Nexus platform.
</p>

---

## Principles

<div class="grid cards" markdown>

-   :material-shield-check:{ .lg .middle } **Zero Trust**

    ---

    Never trust, always verify. All requests authenticated and authorized.

-   :material-lock:{ .lg .middle } **Least Privilege**

    ---

    Minimal access required. Permissions scoped to Products and environments.

-   :material-eye:{ .lg .middle } **Defense in Depth**

    ---

    Multiple layers of security controls at every level.

-   :material-file-document-check:{ .lg .middle } **Audit Everything**

    ---

    Complete traceability via `audit_logs` for compliance.

</div>

---

## Authentication

| Method | Use case |
|--------|----------|
| **Azure AD SSO** | User authentication (mandatory) |
| **Service Accounts** | CI/CD and automation |
| **API Keys** | External integrations |

All authentication flows via Azure AD. No local accounts.

---

## Authorization

Access control is managed at two levels:

| Level | Mechanism | Description |
|-------|-----------|-------------|
| **Product Access** | Azure AD Groups | Users inherit access via `product_aad_groups` |
| **Role-based** | `product_members` | Optional admin/member roles for exceptions |
| **Environment** | Deployment policies | Restrict who can deploy to production |

---

## Secrets Management

| Secret Type | Storage | Rotation |
|-------------|---------|----------|
| API Keys | AWS Secrets Manager | Automatic |
| Database credentials | AWS Secrets Manager | Automatic |
| Service tokens | Short-lived (1h) | On expiry |

!!! warning "Never commit secrets"
    Use environment variables or secrets references. Never hardcode credentials.

---

## Network Security

- **VPC isolation**: Resources in private subnets
- **mTLS**: Service-to-service encryption
- **WAF**: Web Application Firewall on public endpoints
- **DDoS protection**: AWS Shield

