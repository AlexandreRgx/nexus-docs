# Agent Frontend

<p style="font-size: 1.1em; color: #666; margin-bottom: 2em;">
Standardized agent interface component for React applications.
</p>

---

## Overview

A standardized agent interface component published in the **Cegid Design System** (CDS React).

---

## AG-UI Protocol

The component uses **AG-UI** (Agent-User Interface) as the communication protocol between the frontend and agents. AG-UI provides:

- Real-time streaming of agent responses
- Structured event handling (tool calls, human-in-the-loop, errors)
- Standardized message format across all agents

See [AG-UI specification](https://docs.ag-ui.com) for protocol details.

---

## Display Modes

| Mode | Description | Use case |
|------|-------------|----------|
| **Fullscreen** | Agent occupies the entire viewport | Dedicated agent applications |
| **Windowed** | Floating panel with configurable size and position | Embedded assistant in existing apps |

---

## Features

- AG-UI protocol support (streaming, events)
- Fullscreen and windowed display modes
- Conversation history with persistence
- Tool execution visualization
- Human-in-the-loop actions
- Theming (Cegid branding + custom)
- Configurable panel position and size

---

## Usage

```tsx
import { AgentChat } from '@cegid/design-system';

function App() {
  return (
    <AgentChat
      agentUrl="https://agents.cegid.cloud/my-assistant"
      title="My Assistant"
      mode="windowed"  // or "fullscreen"
      position="bottom-right"
      width={400}
      height={600}
    />
  );
}
```

---

## Customization Options

```tsx
<AgentChat
  agentUrl="https://agents.cegid.cloud/my-assistant"
  title="My Assistant"
  mode="windowed"
  position="bottom-right"      // "bottom-left" | "top-right" | "top-left"
  width={400}
  height={600}
  resizable={true}
  draggable={true}
  theme="light"               // "light" | "dark" | "auto"
  showToolExecutions={true}
  persistHistory={true}
/>
```

The component handles AG-UI protocol communication automatically.

---

## Props Reference

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `agentUrl` | `string` | required | URL of the agent endpoint |
| `title` | `string` | `"Assistant"` | Title displayed in the header |
| `mode` | `"fullscreen" \| "windowed"` | `"windowed"` | Display mode |
| `position` | `string` | `"bottom-right"` | Initial position (windowed mode) |
| `width` | `number` | `400` | Width in pixels (windowed mode) |
| `height` | `number` | `600` | Height in pixels (windowed mode) |
| `resizable` | `boolean` | `true` | Allow user to resize |
| `draggable` | `boolean` | `true` | Allow user to drag |
| `theme` | `"light" \| "dark" \| "auto"` | `"auto"` | Color theme |
| `showToolExecutions` | `boolean` | `true` | Show tool call details |
| `persistHistory` | `boolean` | `true` | Persist conversation in localStorage |

---

## Installation

```bash
npm install @cegid/design-system
# or
yarn add @cegid/design-system
```

!!! info "CDS React"
    This component is published as part of the [Cegid Design System](https://cds.cegid.com) React package (`@cegid/design-system`).
