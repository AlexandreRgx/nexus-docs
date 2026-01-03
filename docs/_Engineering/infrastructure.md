# Infrastructure as Code

<p style="font-size: 1.1em; color: #666; margin-bottom: 2em;">
Terraform templates with built-in guardrails.
</p>

---

## Overview

Infrastructure is provisioned using **Terraform templates** validated by the Cloud team and Architects.

```mermaid
graph LR
    DEV[Developer] --> PR[Pull Request]
    PR --> GUARD[Guardrails]
    GUARD --> REVIEW[Cloud & Architects Review]
    REVIEW --> CI[CI/CD]
    CI --> CLOUD[AWS]
```

---

## How it Works

1. **Use a template** - Pick from approved Terraform modules
2. **Open a PR** - Guardrails run automatically
3. **Review** - Cloud team & Architects validate
4. **Deploy** - CI/CD applies the infrastructure

---

## Guardrails

Automated checks on every PR:

| Check | Description |
|-------|-------------|
| **Security** | No public access, encryption enabled |
| **Compliance** | Required tags (owner, cost-center) |
| **Cost** | Budget limits enforced |
| **Best practices** | Naming conventions, resource sizing |

---

## Validation

| Validator | Role |
|-----------|------|
| **Cloud Team** | Technical review |
| **Architects** | Architecture compliance |
