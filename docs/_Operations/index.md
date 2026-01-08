# Operations

<p style="font-size: 1.2em; color: #666; margin-bottom: 2em;">
Operational practices and incident management.
</p>

---

## Documentation

<div class="grid cards" markdown>

-   :material-alert:{ .lg .middle } **Incident Management**

    ---

    Incident response procedures and escalations.

    [:octicons-arrow-right-24: View](incidents.md)

</div>

---

## On-Call

### Rotation

| Team | Schedule | Tool |
|--------|----------|------|
| Platform Core | Weekly rotation | GitHub Issues |
| AI Platform | Weekly rotation | GitHub Issues |

### Emergency Contacts

| Situation | Contact |
|-----------|---------|
| Platform incident | `#incident-response` Slack |
| Security incident | `#security-incidents` Slack |
| Escalation | GitHub Issues |

---

## Target SLOs

| Service | Target |
|---------|--------|
| Nexus API | 99.9% |
| AI Gateway | 99.5% |
| Agent Runtime | 99.5% |
| Observability | 99.5% |

---

## Observability

Monitoring and observability powered by **Dynatrace**.

| Dashboard | Description |
|-----------|-------------|
| Platform Overview | Global platform health and performance |
| AI Metrics | LLM requests, costs, latency |
| Infrastructure | AWS resources and serverless metrics |

---

## Runbooks

Runbooks document operational procedures:

- Use the [runbook template](../_Contributing/templates/runbook.md) to create a new runbook
- Each critical service must have an associated runbook
- Runbooks must be tested regularly

---

## Related Documentation

- [Architecture](../_Architecture/index.md)
- [Runbook Template](../_Contributing/templates/runbook.md)
