# Nexus Platform Documentation

Documentation site for the Nexus Platform - Engineering & AI.

## Quick Start

```bash
# Install dependencies
pip install -r requirements.txt

# Start dev server
zensical serve

# Build site
zensical build
```

Open http://localhost:8000

## Structure

```
docs/
├── _Architecture/     # ADRs, governance
├── _AI-Platform/      # Model access, agents, MCP
├── _Engineering/      # Registries, interfaces, IaC
├── _Operations/       # Incident management
└── _Contributing/     # Templates, style guide
```

## Contributing

1. Create a branch: `docs/add-<topic>` or `docs/fix-<issue>`
2. Edit files in `docs/`
3. Preview with `zensical serve`
4. Submit PR

## Links

- Deployed site: [GitHub Pages](https://cegid.github.io/nexus-docs/)
