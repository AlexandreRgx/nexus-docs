# Incident Management

<p style="font-size: 1.1em; color: #666; margin-bottom: 2em;">
How we handle incidents.
</p>

---

## Process

```mermaid
graph LR
    DETECT[Detection] --> TRIAGE[Triage]
    TRIAGE --> RESPOND[Response]
    RESPOND --> RESOLVE[Resolution]
    RESOLVE --> REVIEW[Post-mortem]
```

---

## Severities

| Severity | Impact | Response SLA |
|----------|--------|-------------|
| **SEV1** | Production down | 15 min |
| **SEV2** | Major degradation | 30 min |
| **SEV3** | Minor degradation | 2h |
| **SEV4** | Limited impact | 1 day |

---

## Tools

| Tool | Purpose |
|------|---------|
| :material-github: GitHub Issues | Declare & track incidents |

---

## Post-mortem

Required within 48h for SEV1/SEV2:

- What happened?
- Root cause
- Action items to prevent recurrence
