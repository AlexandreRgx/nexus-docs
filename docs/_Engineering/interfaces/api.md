# REST API

<p style="font-size: 1.1em; color: #666; margin-bottom: 2em;">
The reference programmatic interface for all Nexus operations.
</p>

---

## Base URL

```
Production : https://nexus.internal/api/v1
Staging    : https://nexus-staging.internal/api/v1
```

---

## Authentication

All requests must include a Bearer token:

```bash
curl https://nexus.internal/api/v1/apps \
  -H "Authorization: Bearer $NEXUS_TOKEN"
```

---

## Endpoints

### Applications

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/apps` | List applications |
| `POST` | `/apps` | Create an application |
| `GET` | `/apps/{id}` | Application details |
| `PATCH` | `/apps/{id}` | Update |
| `DELETE` | `/apps/{id}` | Archive |

#### List Applications

```bash
GET /apps?team=platform&limit=10&offset=0
```

**Query Parameters**

| Param | Type | Description |
|-------|------|-------------|
| `team` | string | Filter by team |
| `tech_stack` | string | Filter by technology |
| `tag` | string | Filter by tag |
| `search` | string | Full-text search |
| `limit` | int | Number of results (default: 20, max: 100) |
| `offset` | int | Offset for pagination |

**Response**

```json
{
  "data": [
    {
      "id": "app_abc123",
      "name": "payment-service",
      "team": {"id": "team_xyz", "name": "platform"},
      "tech_stack": ["python", "fastapi"],
      "created_at": "2025-01-15T10:00:00Z"
    }
  ],
  "meta": {
    "total": 42,
    "limit": 20,
    "offset": 0
  }
}
```

#### Create an Application

```bash
POST /apps
Content-Type: application/json

{
  "name": "payment-service",
  "team_id": "team_xyz",
  "repo_url": "github.com/org/payment-service",
  "tech_stack": ["python", "fastapi"],
  "tier": "tier-1"
}
```

**Response**: `201 Created`

```json
{
  "data": {
    "id": "app_abc123",
    "name": "payment-service",
    ...
  }
}
```

---

### Services

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/services` | List services |
| `POST` | `/services` | Register a service |
| `GET` | `/services/{name}` | Service details |
| `GET` | `/services/{name}/endpoints` | Available endpoints |
| `DELETE` | `/services/{name}/instances/{id}` | Deregister |

#### Discover a Service

```bash
GET /services/payment-service/endpoints?filter[status]=healthy
```

**Response**

```json
{
  "data": [
    {
      "id": "inst_abc123",
      "host": "payment-1.internal",
      "port": 8080,
      "status": "healthy",
      "metadata": {"version": "2.1.0"}
    },
    {
      "id": "inst_def456",
      "host": "payment-2.internal",
      "port": 8080,
      "status": "healthy",
      "metadata": {"version": "2.1.0"}
    }
  ]
}
```

---

### Infrastructure

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/infra/modules` | List available modules |
| `GET` | `/infra/resources` | List resources |
| `POST` | `/infra/resources` | Create a resource |
| `GET` | `/infra/resources/{id}` | Resource details |
| `DELETE` | `/infra/resources/{id}` | Delete a resource |

#### Create a Resource

```bash
POST /infra/resources
Content-Type: application/json

{
  "module": "nexus/postgres",
  "name": "my-database",
  "params": {
    "size": "small",
    "version": "15"
  },
  "environment": "production"
}
```

**Response**: `202 Accepted`

```json
{
  "data": {
    "id": "res_abc123",
    "status": "planning",
    "plan_url": "https://nexus.internal/plans/plan_xyz"
  }
}
```

---

## Pagination

All lists support pagination:

```bash
GET /apps?limit=20&offset=40
```

Response includes pagination metadata:

```json
{
  "data": [...],
  "meta": {
    "total": 142,
    "limit": 20,
    "offset": 40,
    "has_more": true
  }
}
```

---

## Filtering

### Syntax

```bash
# Equality
GET /apps?team=platform

# Multiple values (OR)
GET /apps?tech_stack=python,go

# Search
GET /apps?search=payment
```

### Advanced Filters (v2)

```bash
# Greater than
GET /apps?filter[created_at][gt]=2025-01-01

# Contains
GET /apps?filter[tags][contains]=critical
```

---

## Webhooks

Nexus can send webhooks on certain events:

```bash
POST /webhooks
Content-Type: application/json

{
  "url": "https://my-service.internal/nexus-events",
  "events": ["app.created", "app.updated", "service.unhealthy"],
  "secret": "my-webhook-secret"
}
```

### Available Events

| Event | Description |
|-------|-------------|
| `app.created` | Application created |
| `app.updated` | Application updated |
| `app.deleted` | Application archived |
| `service.registered` | Service registered |
| `service.healthy` | Service became healthy |
| `service.unhealthy` | Service became unhealthy |
| `infra.created` | Resource provisioned |
| `infra.failed` | Provisioning failed |

### Payload

```json
{
  "event": "service.unhealthy",
  "timestamp": "2025-01-15T10:30:00Z",
  "data": {
    "service": "payment-service",
    "instance_id": "inst_abc123",
    "previous_status": "healthy",
    "new_status": "unhealthy"
  }
}
```

---

## SDK vs Direct API

!!! tip "Recommendation"

    Use the SDK rather than the direct API when possible. The SDK handles:

    - Automatic retry on network errors
    - Transparent pagination
    - Strong typing
    - Error handling
