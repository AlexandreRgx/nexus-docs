# Application Registry

<p style="font-size: 1.1em; color: #666; margin-bottom: 2em;">
Centralized catalog of all applications in the organization.
</p>

---

## Purpose

The Application Registry is the **source of truth** for all applications. It answers:

- What applications exist?
- Who is responsible for them?
- What is the tech stack?
- What environments are deployed?

---

## Data Model

```mermaid
erDiagram
    Application ||--o{ Environment : "deployed in"
    Application ||--o{ Dependency : "depends on"
    Application }o--|| Team : "owned by"
    Application ||--o{ Tag : "has"

    Application {
        string id PK
        string name
        string description
        string tech_stack
        string repo_url
        datetime created_at
    }

    Team {
        string id PK
        string name
        string slack_channel
    }

    Environment {
        string id PK
        string name
        string url
        string status
    }
```

### Required Fields

| Field | Description | Example |
|-------|-------------|---------|
| `name` | Unique application name | `payment-service` |
| `team` | Owner team | `platform` |
| `repo_url` | Repository URL | `github.com/org/payment-service` |
| `tech_stack` | Technologies used | `["python", "fastapi", "postgres"]` |

### Optional Fields

| Field | Description |
|-------|-------------|
| `description` | Short description |
| `docs_url` | Link to documentation |
| `runbook_url` | Link to runbook |
| `tier` | Criticality (tier-1, tier-2, tier-3) |
| `tags` | Free-form tags for filtering |

---

## Usage

### Create an Application

=== "CLI"

    ```bash
    nexus app create payment-service \
      --team platform \
      --repo github.com/org/payment-service \
      --stack python,fastapi,postgres \
      --tier tier-1
    ```

=== "SDK"

    ```python
    from nexus import NexusClient

    client = NexusClient()
    app = client.apps.create(
        name="payment-service",
        team="platform",
        repo_url="github.com/org/payment-service",
        tech_stack=["python", "fastapi", "postgres"],
        tier="tier-1"
    )
    ```

### Search Applications

=== "CLI"

    ```bash
    # By team
    nexus app list --team platform

    # By technology
    nexus app list --stack python

    # By tag
    nexus app list --tag critical
    ```

=== "SDK"

    ```python
    # By team
    apps = client.apps.list(team="platform")

    # By technology
    apps = client.apps.list(tech_stack="python")

    # Full-text search
    apps = client.apps.search("payment")
    ```

### Update an Application

=== "CLI"

    ```bash
    nexus app update payment-service \
      --description "Payment service v2" \
      --add-tag pci-dss
    ```

=== "SDK"

    ```python
    client.apps.update(
        "payment-service",
        description="Payment service v2",
        tags=["pci-dss"]
    )
    ```

---

## Integrations

### CI/CD

The registry integrates automatically with GitHub Actions:

```yaml
# .github/workflows/deploy.yml
- name: Register deployment
  uses: nexus/register-deployment@v1
  with:
    app: payment-service
    environment: production
    version: ${{ github.sha }}
```

### Observability

Registry metadata is propagated to:

- **Grafana**: Dashboards per application/team
- **PagerDuty**: Alert routing to owner team
- **Datadog**: Automatic tags on traces

### Security

- **Ownership**: Every application has an identified owner
- **Compliance**: Tags for PCI, GDPR applications, etc.
- **Audit**: History of modifications

---

## Best Practices

!!! tip "Naming Conventions"

    - Use the format `{domain}-{function}`: `payment-service`, `user-api`
    - Avoid team prefixes: `platform-payment` :material-close:
    - No underscores: `payment_service` :material-close:

!!! warning "Maintenance"

    - Update the registry when stack changes
    - Archive deprecated applications (don't delete)
    - Verify ownership quarterly

---

## API Reference

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/v1/apps` | List applications |
| `POST` | `/api/v1/apps` | Create an application |
| `GET` | `/api/v1/apps/{id}` | Application details |
| `PATCH` | `/api/v1/apps/{id}` | Update |
| `DELETE` | `/api/v1/apps/{id}` | Archive |

### Example Response

```json
{
  "id": "app_abc123",
  "name": "payment-service",
  "team": {
    "id": "team_xyz",
    "name": "platform"
  },
  "tech_stack": ["python", "fastapi", "postgres"],
  "tier": "tier-1",
  "environments": [
    {
      "name": "production",
      "url": "https://payment.internal",
      "status": "healthy"
    }
  ],
  "created_at": "2025-01-15T10:00:00Z"
}
```
