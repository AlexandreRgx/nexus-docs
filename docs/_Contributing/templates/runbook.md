# Runbook Template

Use this template to document operational procedures for incident response, routine operations, and maintenance tasks.

---

## When to Write a Runbook

Write a runbook for:

- Incident response procedures
- On-call escalation guides
- Routine maintenance tasks
- Deployment procedures
- Recovery procedures
- Troubleshooting guides

---

## Template

Copy the template below to create your runbook:

```markdown
# Runbook: [Title]

| Field | Value |
|-------|-------|
| **Service** | [Service name] |
| **Owner** | [Team or individual] |
| **Last Updated** | YYYY-MM-DD |
| **Review Date** | YYYY-MM-DD |
| **Alert(s)** | [Associated alert names] |

---

## Overview

[Brief description of what this runbook covers and when to use it]

### When to Use This Runbook

- Condition 1
- Condition 2

### Prerequisites

- [ ] Prerequisite 1
- [ ] Prerequisite 2

### Required Access

| System | Access Level | How to Get |
|--------|--------------|------------|
| [System 1] | [Level] | [Instructions] |

---

## Quick Reference

### Symptoms

[What does the problem look like?]

- Symptom 1
- Symptom 2

### Impact

[What is affected when this occurs?]

- Impact 1
- Impact 2

### Quick Fix (If Available)

[One-line fix if there's an obvious solution]

```bash
# Quick fix command
```

---

## Diagnosis

### Step 1: [Diagnosis Step Title]

[Description of what to check]

```bash
# Command to run
```

**Expected Output:**

```
[What normal looks like]
```

**Abnormal Output Indicates:**

- If [condition], then [meaning]

### Step 2: [Diagnosis Step Title]

[Continue with additional diagnosis steps]

---

## Resolution

### Scenario 1: [Scenario Name]

**When:** [Conditions for this scenario]

**Steps:**

1. [Step 1]

    ```bash
    # Command if applicable
    ```

2. [Step 2]

3. [Step 3]

**Verification:**

```bash
# Command to verify fix
```

### Scenario 2: [Scenario Name]

[Repeat for each resolution scenario]

---

## Escalation

### When to Escalate

Escalate if:

- [ ] [Escalation condition 1]
- [ ] [Escalation condition 2]
- [ ] Resolution steps don't work after [time]

### Escalation Path

| Level | Contact | When |
|-------|---------|------|
| L1 | [Contact info] | Initial response |
| L2 | [Contact info] | [Condition] |
| L3 | [Contact info] | [Condition] |

---

## Recovery Verification

### Verification Steps

1. [ ] [Verification step 1]
2. [ ] [Verification step 2]
3. [ ] [Verification step 3]

### Metrics to Check

| Metric | Expected Value | Dashboard Link |
|--------|----------------|----------------|
| [Metric 1] | [Value] | [Link] |

---

## Prevention

### Root Causes

[Common root causes for this issue]

- Root cause 1
- Root cause 2

### Preventive Measures

[What can be done to prevent this issue]

- Measure 1
- Measure 2

---

## Related Resources

### Dashboards

- [Dashboard 1](link)
- [Dashboard 2](link)

### Documentation

- [Related doc 1](link)
- [Related doc 2](link)

### Related Runbooks

- [Runbook 1](link)
- [Runbook 2](link)

---

## Changelog

| Date | Author | Change |
|------|--------|--------|
| YYYY-MM-DD | [Name] | Initial version |
| YYYY-MM-DD | [Name] | [Change description] |
```

---

## Runbook Best Practices

### Write for the On-Call Engineer

- Assume the reader is handling this at 3 AM
- Keep steps clear and sequential
- Avoid assuming deep system knowledge
- Include exact commands to copy-paste

### Be Specific

```markdown
<!-- Bad -->
Check the logs for errors

<!-- Good -->
Check the API Gateway logs for connection timeout errors:
\`\`\`bash
kubectl logs -n production -l app=api-gateway --since=15m | grep -i timeout
\`\`\`
```

### Include Expected Outputs

Show what normal looks like so responders can identify abnormal:

```markdown
**Expected Output (Healthy):**
\`\`\`
Status: Running
Replicas: 3/3
Ready: True
\`\`\`

**Abnormal Output (Investigate):**
\`\`\`
Status: CrashLoopBackOff
Replicas: 1/3
Ready: False
\`\`\`
```

### Keep It Updated

- Review runbooks quarterly
- Update after every incident where the runbook was used
- Remove steps that are no longer relevant
- Add new scenarios as they're discovered

---

## Runbook Categories

Organize runbooks by category:

| Category | Purpose | Examples |
|----------|---------|----------|
| **Incident** | Response to alerts | High error rate, service down |
| **Maintenance** | Routine operations | Certificate rotation, upgrades |
| **Recovery** | Disaster recovery | Database restore, failover |
| **Deployment** | Release procedures | Canary deploy, rollback |

---

## Example Runbook

```markdown
# Runbook: High API Error Rate

| Field | Value |
|-------|-------|
| **Service** | API Gateway |
| **Owner** | Platform Core |
| **Last Updated** | 2025-01-15 |
| **Alert(s)** | APIGatewayHighErrorRate |

---

## Overview

This runbook covers investigation and resolution when the API Gateway
error rate exceeds 5% for more than 5 minutes.

### Prerequisites

- [ ] kubectl access to production cluster
- [ ] Grafana access

---

## Quick Reference

### Symptoms

- Alert: `APIGatewayHighErrorRate`
- Users reporting 5xx errors
- Increased latency

### Quick Fix

If caused by a recent deployment, rollback:

```bash
kubectl rollout undo deployment/api-gateway -n production
```

---

## Diagnosis

### Step 1: Check Error Types

```bash
kubectl logs -n production -l app=api-gateway --since=15m | \
  grep -E "ERROR|5[0-9]{2}" | \
  sort | uniq -c | sort -rn | head -20
```

### Step 2: Check Upstream Services

```bash
kubectl get pods -n production -l tier=backend
```

---

## Resolution

### Scenario 1: Backend Service Unhealthy

**When:** Backend pods are not ready

**Steps:**

1. Identify unhealthy pods:

    ```bash
    kubectl get pods -n production -l tier=backend | grep -v Running
    ```

2. Check pod events:

    ```bash
    kubectl describe pod [pod-name] -n production
    ```

3. Restart if needed:

    ```bash
    kubectl rollout restart deployment/[backend-service] -n production
    ```

---

## Escalation

Escalate to L2 if:

- [ ] Error rate doesn't decrease after 15 minutes
- [ ] Root cause is unclear
- [ ] Multiple services affected

| Level | Contact |
|-------|---------|
| L2 | @platform-core-oncall |
| L3 | @platform-lead |
```

---

## Related Documents

- [RFC Template](rfc.md)
- [ADR Template](adr.md)
- [Incident Management](../operations/incidents.md)
- [Observability](../operations/observability.md)
