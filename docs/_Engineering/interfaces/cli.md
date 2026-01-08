# CLI

<p style="font-size: 1.1em; color: #666; margin-bottom: 2em;">
Command-line interface for daily operations with Nexus.
</p>

---

## Installation

=== "macOS"

    ```bash
    brew install nexus-cli
    ```

=== "Linux"

    ```bash
    curl -sSL https://nexus.cegid.com/install.sh | bash
    ```

=== "Windows"

    ```powershell
    scoop install nexus-cli
    ```

=== "pip"

    ```bash
    pip install nexus-cli
    ```

---

## Authentication

```bash
# Interactive login (opens browser)
nexus auth login

# Check authentication
nexus auth status

# Logout
nexus auth logout
```

Token is stored in `~/.nexus/config.yaml`.

### Service Account

```bash
# Create a service account
nexus auth create-sa my-ci --scopes apps:read,services:write

# Use a token
export NEXUS_TOKEN=<token>
```

---

## Commands

### Applications

```bash
# List applications
nexus app list
nexus app list --team platform
nexus app list --stack python --format json

# Create an application
nexus app create my-service \
  --team platform \
  --repo github.com/org/my-service \
  --stack python,fastapi

# Details
nexus app get my-service

# Update
nexus app update my-service --description "New description"
nexus app update my-service --add-tag critical

# Delete (archive)
nexus app delete my-service
```

### Services

```bash
# List services
nexus service list

# Register a service
nexus service register my-service \
  --host my-service-1.internal \
  --port 8080 \
  --health-endpoint /health

# Discover endpoints
nexus service discover payment-service
nexus service discover payment-service --filter version=2.*

# Check health
nexus service health payment-service

# Deregister
nexus service deregister my-service --instance inst_abc123
```

### Infrastructure

```bash
# List available modules
nexus infra modules
nexus infra modules --filter postgres

# Create a resource
nexus infra create postgres \
  --name my-database \
  --size small \
  --env production

# List resources
nexus infra list
nexus infra list --env production

# Check status
nexus infra status my-database

# Destroy
nexus infra destroy my-database --env production
```

---

## Output Formats

```bash
# Table (default)
nexus app list

# JSON
nexus app list --format json

# YAML
nexus app list --format yaml

# Quiet (IDs only)
nexus app list --format quiet

# Templating
nexus app list --format "{{.name}}: {{.team.name}}"
```

---

## Configuration

### Switch Context

```bash
# List contexts
nexus config get-contexts

# Switch context
nexus config use-context staging

# Show current context
nexus config current-context
```

### Environment Variables

| Variable | Description |
|----------|-------------|
| `NEXUS_TOKEN` | Authentication token |
| `NEXUS_API_URL` | API URL |
| `NEXUS_CONTEXT` | Context to use |
| `NEXUS_FORMAT` | Default output format |

---

## Auto-completion

=== "Bash"

    ```bash
    # Add to ~/.bashrc
    source <(nexus completion bash)
    ```

=== "Zsh"

    ```bash
    # Add to ~/.zshrc
    source <(nexus completion zsh)
    ```

=== "Fish"

    ```bash
    nexus completion fish | source
    ```

---

## Scripting

### Common Examples

```bash
# List team apps as JSON and filter with jq
nexus app list --team platform --format json | jq '.[] | .name'

# Loop over unhealthy services
nexus service list --status unhealthy --format quiet | while read svc; do
  echo "Checking $svc..."
  nexus service health $svc
done

# Create resources from a file
cat resources.txt | while read name; do
  nexus infra create postgres --name $name --size small
done
```

### Exit Codes

| Code | Meaning |
|------|---------|
| 0 | Success |
| 1 | Generic error |
| 2 | Usage error (bad arguments) |
| 3 | Resource not found |
| 4 | Permission denied |
| 5 | Rate limited |

---

## Useful Aliases

```bash
# ~/.bashrc or ~/.zshrc
alias nx='nexus'
alias nxa='nexus app'
alias nxs='nexus service'
alias nxi='nexus infra'

# Shortcuts
alias nxal='nexus app list'
alias nxsd='nexus service discover'
```

---

## Debugging

```bash
# Verbose mode
nexus app list -v

# Debug mode (shows HTTP requests)
nexus app list --debug

# Dry-run (doesn't execute)
nexus app create my-app --dry-run
```

---

## Plugins

The CLI supports plugins to extend its functionality:

```bash
# List installed plugins
nexus plugin list

# Install a plugin
nexus plugin install nexus-plugin-aws

# Use a plugin
nexus aws list-functions my-app
```

### Create a Plugin

A plugin is an executable named `nexus-<name>`:

```bash
#!/bin/bash
# nexus-hello
echo "Hello from plugin!"
echo "Args: $@"
```

```bash
chmod +x nexus-hello
mv nexus-hello /usr/local/bin/

nexus hello world
# Hello from plugin!
# Args: world
```
