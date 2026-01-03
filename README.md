# Nexus Platform Documentation

Professional Engineering & AI Platform documentation built with MkDocs Material and deployed via GitHub Pages.

## Overview

This repository contains the comprehensive documentation for the Nexus Platform, covering:

- **Platform Vision & Principles** - Strategic direction and guiding principles
- **Architecture** - Technical architecture, design patterns, and component catalog
- **AI Platform** - LLM integrations, governance, and best practices
- **Security & Compliance** - Security framework, compliance standards, and access control
- **Operations** - SRE practices, incident management, and observability
- **Templates** - RFC, ADR, and Runbook templates

## Prerequisites

- **Python 3.9+** - Required for MkDocs
- **Git** - For version control
- **pip** - Python package manager

## Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/your-org/nexus-docs.git
cd nexus-docs
```

### 2. Create Virtual Environment (Recommended)

```bash
# Create virtual environment
python -m venv venv

# Activate on macOS/Linux
source venv/bin/activate

# Activate on Windows
venv\Scripts\activate
```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

### 4. Start Local Development Server

```bash
mkdocs serve
```

Open your browser to [http://localhost:8000](http://localhost:8000)

## Local Commands

| Command | Description |
|---------|-------------|
| `mkdocs serve` | Start development server with live reload |
| `mkdocs serve -a localhost:8001` | Start on alternate port |
| `mkdocs build` | Build static site to `site/` directory |
| `mkdocs build --strict` | Build with strict mode (fail on warnings) |

## Repository Structure

```
nexus-docs/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions deployment
├── docs/
│   ├── index.md                # Homepage
│   ├── platform/               # Platform overview docs
│   ├── architecture/           # Architecture documentation
│   ├── ai-platform/            # AI/LLM platform docs
│   ├── security-compliance/    # Security documentation
│   ├── operations/             # SRE and ops docs
│   ├── contributing/           # Contribution guides
│   ├── templates/              # RFC, ADR, Runbook templates
│   ├── reference/              # Glossary and reference
│   ├── stylesheets/            # Custom CSS
│   ├── javascripts/            # Custom JavaScript
│   ├── includes/               # Reusable content
│   └── assets/                 # Images and static files
├── mkdocs.yml                  # MkDocs configuration
├── requirements.txt            # Python dependencies
└── README.md                   # This file
```

## Contributing

We welcome contributions! Please follow our contribution workflow:

### Contribution Workflow

1. **Fork or clone** the repository
2. **Create a branch** for your changes:
   ```bash
   git checkout -b docs/your-change-description
   ```
3. **Make your changes** in the `docs/` directory
4. **Preview locally** with `mkdocs serve`
5. **Commit** with a descriptive message:
   ```bash
   git commit -m "docs: add deployment guide for Kubernetes"
   ```
6. **Push** your branch and create a Pull Request
7. **Request review** from the documentation team

### Branch Naming Convention

| Type | Pattern | Example |
|------|---------|---------|
| New content | `docs/add-<topic>` | `docs/add-kubernetes-guide` |
| Fix | `docs/fix-<issue>` | `docs/fix-typo-glossary` |
| Update | `docs/update-<topic>` | `docs/update-architecture` |

### Commit Message Format

```
docs: <short description>

<optional detailed description>
```

### Review Checklist

Before submitting a PR, ensure:

- [ ] Content previews correctly locally
- [ ] All links are working
- [ ] Follows the [style guide](docs/contributing/style-guide.md)
- [ ] Spelling and grammar are correct
- [ ] Diagrams render properly

## Deployment

### Automatic Deployment

Documentation is automatically deployed to GitHub Pages on every push to `main`:

1. **Push to main** triggers the GitHub Actions workflow
2. **Build job** compiles the documentation
3. **Deploy job** publishes to GitHub Pages

### Manual Deployment

To manually deploy:

```bash
# Build the site
mkdocs build --strict

# The built site is in the site/ directory
```

### GitHub Pages Setup

1. Go to repository **Settings** → **Pages**
2. Under **Source**, select **GitHub Actions**
3. The workflow will handle deployment automatically

## Configuration

### MkDocs Configuration

The main configuration is in `mkdocs.yml`:

- **Theme settings**: Material theme with light/dark mode
- **Navigation**: Hierarchical site structure
- **Extensions**: Mermaid diagrams, code highlighting, admonitions
- **Plugins**: Search, minification

### Customization

- **Styles**: Edit `docs/stylesheets/extra.css`
- **JavaScript**: Edit `docs/javascripts/extra.js`
- **Abbreviations**: Edit `docs/includes/abbreviations.md`

## Features

- **Material Theme** - Modern, responsive design
- **Light/Dark Mode** - Toggle between color schemes
- **Mermaid Diagrams** - Flowcharts, sequence diagrams, etc.
- **Search** - Full-text search with highlighting
- **Code Highlighting** - Syntax highlighting with copy button
- **Responsive Design** - Works on desktop and mobile

## Troubleshooting

### Common Issues

| Issue | Solution |
|-------|----------|
| `mkdocs not found` | Run `pip install -r requirements.txt` |
| Port already in use | Use `mkdocs serve -a localhost:8001` |
| Theme not loading | Check `mkdocs.yml` for syntax errors |
| Mermaid not rendering | Ensure superfences extension is configured |

### Getting Help

- **Slack**: `#platform-docs`
- **Email**: platform-docs@your-org.com

## License

This documentation is for internal use only. See the organization's documentation policy for usage guidelines.

---

Built with [MkDocs](https://www.mkdocs.org/) and [Material for MkDocs](https://squidfunk.github.io/mkdocs-material/)
