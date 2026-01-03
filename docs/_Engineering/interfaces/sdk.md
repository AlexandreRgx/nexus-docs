# SDK

<p style="font-size: 1.1em; color: #666; margin-bottom: 2em;">
Typed clients for Python, TypeScript, and Go. Auto-generated via Fern.
</p>

---

## Installation

=== "Python"

    ```bash
    pip install nexus-sdk
    ```

=== "TypeScript"

    ```bash
    npm install @nexus/sdk
    # or
    yarn add @nexus/sdk
    ```

=== "Go"

    ```bash
    go get github.com/your-org/nexus-sdk-go
    ```

---

## Initialization

=== "Python"

    ```python
    from nexus import NexusClient

    # Auto-detects NEXUS_TOKEN or ~/.nexus/config.yaml
    client = NexusClient()

    # Or explicit configuration
    client = NexusClient(
        token="...",
        base_url="https://nexus.internal"
    )
    ```

=== "TypeScript"

    ```typescript
    import { NexusClient } from '@nexus/sdk';

    // Auto-detects NEXUS_TOKEN
    const client = new NexusClient();

    // Or explicit configuration
    const client = new NexusClient({
      token: process.env.NEXUS_TOKEN,
      baseUrl: 'https://nexus.internal'
    });
    ```

=== "Go"

    ```go
    import "github.com/your-org/nexus-sdk-go"

    client := nexus.NewClient(
        nexus.WithToken(os.Getenv("NEXUS_TOKEN")),
    )
    ```

---

## Applications

### List

=== "Python"

    ```python
    # List all applications
    apps = client.apps.list()

    # With filters
    apps = client.apps.list(
        team="platform",
        tech_stack="python"
    )

    # Automatic pagination
    for app in client.apps.list_all():
        print(app.name)
    ```

=== "TypeScript"

    ```typescript
    // List all applications
    const apps = await client.apps.list();

    // With filters
    const apps = await client.apps.list({
      team: 'platform',
      techStack: 'python'
    });

    // Automatic pagination
    for await (const app of client.apps.listAll()) {
      console.log(app.name);
    }
    ```

### Create

=== "Python"

    ```python
    app = client.apps.create(
        name="my-service",
        team="platform",
        repo_url="github.com/org/my-service",
        tech_stack=["python", "fastapi"],
        tier="tier-2"
    )
    print(f"Created: {app.id}")
    ```

=== "TypeScript"

    ```typescript
    const app = await client.apps.create({
      name: 'my-service',
      team: 'platform',
      repoUrl: 'github.com/org/my-service',
      techStack: ['typescript', 'nestjs'],
      tier: 'tier-2'
    });
    console.log(`Created: ${app.id}`);
    ```

### Update

=== "Python"

    ```python
    app = client.apps.update(
        "my-service",
        description="Updated description",
        tags=["critical", "pci"]
    )
    ```

=== "TypeScript"

    ```typescript
    const app = await client.apps.update('my-service', {
      description: 'Updated description',
      tags: ['critical', 'pci']
    });
    ```

---

## Services

### Discovery

=== "Python"

    ```python
    # Get service endpoints
    endpoints = client.services.discover("payment-service")

    for ep in endpoints:
        print(f"{ep.host}:{ep.port} - {ep.status}")

    # Filter by metadata
    endpoints = client.services.discover(
        "payment-service",
        filter={"version": "2.*", "region": "eu-west-1"}
    )
    ```

=== "TypeScript"

    ```typescript
    const endpoints = await client.services.discover('payment-service');

    for (const ep of endpoints) {
      console.log(`${ep.host}:${ep.port} - ${ep.status}`);
    }
    ```

### Built-in HTTP Client

=== "Python"

    ```python
    # Create a client with automatic load balancing
    payment = client.services.http_client("payment-service")

    # HTTP calls
    response = payment.post("/pay", json={"amount": 100})
    response = payment.get("/status")

    # Automatic retry on error
    ```

=== "TypeScript"

    ```typescript
    const payment = client.services.httpClient('payment-service');

    const response = await payment.post('/pay', { amount: 100 });
    const status = await payment.get('/status');
    ```

---

## Infrastructure

### Provision

=== "Python"

    ```python
    # Create a database
    resource = client.infra.create(
        module="nexus/postgres",
        name="my-database",
        params={
            "size": "small",
            "version": "15"
        },
        environment="production"
    )

    # Wait for provisioning to complete
    resource = client.infra.wait_for(resource.id, timeout=300)
    print(f"Database ready: {resource.outputs['connection_string']}")
    ```

=== "TypeScript"

    ```typescript
    const resource = await client.infra.create({
      module: 'nexus/postgres',
      name: 'my-database',
      params: {
        size: 'small',
        version: '15'
      },
      environment: 'production'
    });

    // Wait for provisioning
    const ready = await client.infra.waitFor(resource.id, { timeout: 300 });
    console.log(`Database ready: ${ready.outputs.connectionString}`);
    ```

### List Resources

=== "Python"

    ```python
    resources = client.infra.list(
        environment="production",
        module="nexus/postgres"
    )

    for res in resources:
        print(f"{res.name}: {res.status}")
    ```

---

## Error Handling

=== "Python"

    ```python
    from nexus.exceptions import (
        NexusError,
        NotFoundError,
        ValidationError,
        RateLimitError
    )

    try:
        app = client.apps.get("unknown-app")
    except NotFoundError as e:
        print(f"App not found: {e.resource_id}")
    except ValidationError as e:
        print(f"Validation failed: {e.errors}")
    except RateLimitError as e:
        print(f"Rate limited, retry after: {e.retry_after}s")
    except NexusError as e:
        print(f"Nexus error: {e.code} - {e.message}")
    ```

=== "TypeScript"

    ```typescript
    import {
      NexusError,
      NotFoundError,
      ValidationError,
      RateLimitError
    } from '@nexus/sdk';

    try {
      const app = await client.apps.get('unknown-app');
    } catch (e) {
      if (e instanceof NotFoundError) {
        console.log(`App not found: ${e.resourceId}`);
      } else if (e instanceof RateLimitError) {
        console.log(`Rate limited, retry after: ${e.retryAfter}s`);
      }
    }
    ```

---

## Advanced Configuration

=== "Python"

    ```python
    from nexus import NexusClient
    import httpx

    client = NexusClient(
        token="...",
        base_url="https://nexus.internal",
        timeout=30.0,
        retry_config={
            "max_retries": 3,
            "backoff_factor": 0.5
        },
        # Custom HTTP client
        http_client=httpx.Client(
            verify="/path/to/ca-bundle.crt"
        )
    )
    ```

=== "TypeScript"

    ```typescript
    const client = new NexusClient({
      token: '...',
      baseUrl: 'https://nexus.internal',
      timeout: 30000,
      retryConfig: {
        maxRetries: 3,
        backoffFactor: 0.5
      }
    });
    ```

---

## Types

The SDK is fully typed:

=== "Python"

    ```python
    from nexus.types import Application, Service, InfraResource

    def process_app(app: Application) -> None:
        print(app.name)  # IDE autocomplete
        print(app.team.name)
        print(app.tech_stack)
    ```

=== "TypeScript"

    ```typescript
    import type { Application, Service, InfraResource } from '@nexus/sdk';

    function processApp(app: Application): void {
      console.log(app.name);  // IDE autocomplete
      console.log(app.team.name);
      console.log(app.techStack);
    }
    ```
