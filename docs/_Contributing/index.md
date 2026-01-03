# Contributing

<p style="font-size: 1.2em; color: #666; margin-bottom: 2em;">
Guide for contributing to the Nexus documentation.
</p>

---

## Quick Start

```bash
# Clone the repo
git clone https://github.com/your-org/nexus-docs.git
cd nexus-docs

# Create a virtualenv
python -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Start the local server
zensical serve
```

Open `http://localhost:8000` to preview.

---

## Workflow

```mermaid
graph LR
    BRANCH[Create branch] --> WRITE[Write]
    WRITE --> PREVIEW[Preview]
    PREVIEW --> COMMIT[Commit]
    COMMIT --> PR[Open PR]
    PR --> REVIEW[Review]
    REVIEW --> MERGE[Merge]
```

---

## Conventions

### Branch naming

| Type | Format | Example |
|------|--------|---------|
| New content | `docs/add-<topic>` | `docs/add-agent-templates` |
| Fix | `docs/fix-<issue>` | `docs/fix-typo-api` |
| Update | `docs/update-<topic>` | `docs/update-roadmap` |

### File naming

- Use kebab-case: `model-access.md`
- Descriptive and short names
- English for technical names

---

## Types of contributions

### Documentation

- Fix typos and errors
- Clarify existing content
- Add missing information
- Update outdated content

### New content

- Guides and tutorials
- Architecture documentation
- Operational runbooks
- RFCs and ADRs

---

## Navigation

<div class="grid cards" markdown>

-   :material-format-paint:{ .lg .middle } **Style Guide**

    ---

    Writing and formatting conventions.

    [:octicons-arrow-right-24: View](style-guide.md)

</div>

---

## Questions?

- **Slack**: `#platform-docs`
- **GitHub**: Issues on the repo
