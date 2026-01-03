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
| Platform Core | Weekly rotation | PagerDuty |
| AI Platform | Weekly rotation | PagerDuty |

### Emergency Contacts

| Situation | Contact |
|-----------|---------|
| Platform incident | `#incident-response` Slack |
| Security incident | `#security-incidents` Slack |
| Escalation | PagerDuty |

---

## SLOs

| Service | SLO | Current | Status |
|---------|-----|--------|--------|
| Nexus API | 99.9% | 99.95% | :material-check-circle:{ style="color: green" } |
| AI Gateway | 99.5% | 99.8% | :material-check-circle:{ style="color: green" } |
| Agent Runtime | 99.5% | 99.6% | :material-check-circle:{ style="color: green" } |
| Observability | 99.5% | 99.7% | :material-check-circle:{ style="color: green" } |

---

## Dashboards

| Dashboard | Description | Link |
|-----------|-------------|------|
| Platform Overview | Global platform view | [Grafana](https://grafana.internal/d/platform) |
| AI Metrics | LLM requests, costs, latency | [Grafana](https://grafana.internal/d/ai) |
| Kubernetes | Cluster status | [Grafana](https://grafana.internal/d/k8s) |

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
