# Authentication

<p style="font-size: 1.1em; color: #666; margin-bottom: 2em;">
Authentication workflows and session management.
</p>

---

## Overview

The Nexus Platform uses **OAuth2 Authorization Code with PKCE** for secure browser-based authentication, with Azure AD as the identity provider.

| Principle | Description |
|-----------|-------------|
| **Identity Provider** | Cegid Azure AD (SSO) |
| **Protocol** | OAuth2 + PKCE |
| **Session Storage** | Amazon ElastiCache |
| **Security** | HttpOnly cookies, CSRF protection, SameSite=Lax |

---

## General Authentication Architecture

The diagram below illustrates how different clients authenticate to access Nexus Platform services.

![General Auth Workflow](assets/Nexus%20Platform%20-%20General%20auth%20workflow.png)

| Client Type | Authentication Method | Description |
|-------------|----------------------|-------------|
| **Postman / CLI / SDK** | OAuth2 Access Token | Programmatic access using bearer tokens |
| **WebApp** | Session Cookie | Browser-based access with HttpOnly cookies |

The **Authorizer** component acts as the central gateway, validating identity through either session cookies or OAuth2 access tokens before granting access to downstream services:

- **AI Gateway**: Model inference and AI capabilities
- **Agent Hosting**: Agent execution environment
- **RAG API**: Retrieval-augmented generation services
- **Third-party APIs**: External integrations (e.g., MS Graph)

---

## Login Workflow

The login flow authenticates users via Azure AD and establishes a session.

![Login Workflow](assets/Nexus%20Platform%20-%20Login%20Workflow.png)

| Step | Action | Description |
|------|--------|-------------|
| **0** | `/login` | User navigates to login, receives 302 redirect to Azure AD |
| **1** | OAuth2 + PKCE | User authenticates with Cegid Azure ID |
| **2** | Callback | Azure AD redirects to `/auth/callback` with authorization code |
| **4** | Token Exchange | Lambda exchanges code for tokens, creates session, stores context in ElastiCache |
| **5** | Session Cookie | Response sets `sessionId` and `csrf` cookies (HttpOnly, Secure, SameSite=Lax) |

!!! note "Cache-Control"
    CloudFront is configured with `Cache-Control: no-store` for authentication endpoints to prevent caching of sensitive responses.

---

## Authentication Workflow

Once logged in, subsequent API requests are authenticated using session cookies.

![Authentication Workflow](assets/Nexus%20Platform%20-%20Authentication%20workflow.png)

| Component | Responsibility |
|-----------|---------------|
| **CloudFront** | Receives request with Session ID + CSRF cookie |
| **API Gateway** | Routes to Lambda Authorizer |
| **Authorizer** | Resolves token, validates session, verifies CSRF, loads user context |
| **ElastiCache** | Stores and retrieves session data |
| **Lambda** | Executes application logic with authenticated context |

!!! tip "Performance"
    Authorizer results are cached to reduce latency on subsequent requests within the same session.

---

## CLI / SDK Authentication

For programmatic access via CLI or SDK, applications authenticate directly with Azure AD to obtain an OAuth2 access token.

![CLI/SDK Authentication](assets/Nexus%20Platform%20-%20CLI%20_%20SDK%20Authent.png)

| Step | Description |
|------|-------------|
| **1** | Application requests access token from Cegid Azure AD via OAuth2 |
| **2** | Access token is included in API requests to CloudFront |
| **3** | API Gateway routes to the Authorizer which validates the token |
| **4** | If valid, request proceeds to the Lambda application |

!!! info "Unified Authorizer"
    The same Authorizer component validates both session cookies (WebApp) and access tokens (CLI/SDK). Results are cached by API Gateway for performance.

---

## Security Features

<div class="grid cards" markdown>

-   :material-cookie:{ .lg .middle } **HttpOnly Cookies**

    ---

    Session cookies cannot be accessed by JavaScript, preventing XSS attacks.

-   :material-shield-check:{ .lg .middle } **CSRF Protection**

    ---

    Dedicated CSRF token validated on every state-changing request.

-   :material-lock:{ .lg .middle } **SameSite Policy**

    ---

    Cookies use `SameSite=Lax` to prevent cross-site request forgery.

-   :material-cached:{ .lg .middle } **No-Store Cache**

    ---

    Authentication endpoints never cached by CDN or browser.

</div>
