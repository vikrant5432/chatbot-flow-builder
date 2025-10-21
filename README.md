
# 🤖 Chatbot Flow Builder


### 🟢 [**🚀 Live Demo**](https://chatbot-flow-builder-five-henna.vercel.app/)

A **React + TypeScript** chatbot flow builder built using **React Flow**, allowing users to visually design conversational flows by connecting message nodes together.

---

## 🧩 Overview

A **Chatbot Flow** is a series of messages (nodes) connected by edges that define the conversation order.  
This builder allows users to:
- Drag and drop new message nodes.
- Connect them to define message order.
- Edit node content in a settings panel.
- Save flows with validation.
- Preview the chat conversation in a live simulator.

---

## 🚀 Features

### 🧱 1. **Text Node**
- Currently supports a single **Text Message Node**.
- Each node stores message text (`data.message`).
- Added to the canvas via **drag & drop** from the Nodes Panel.
- Fully editable through the **Settings Panel**.

---

### 📋 2. **Nodes Panel**
- Displays all available node types (currently only Message node).
- Easily extensible for new node types.
- Implements drag-and-drop via HTML5 `DataTransfer`.

---

### 🔗 3. **Edges**
- Connect two nodes to define conversational order.
- Uses React Flow’s `Connection` and `Edge` API.
- Rendered dynamically using the `"smoothstep"` edge type.

---

### ⚙️ 4. **Source & Target Handles**
| Handle | Behavior | Description |
|--------|-----------|--------------|
| **Source Handle** | Only 1 outgoing edge allowed | Ensures linear message flow per node |
| **Target Handle** | Multiple incoming edges allowed | Enables converging message branches |

Implemented via reducer logic that enforces unique source connections:
```ts
state.edges = state.edges.filter((edge) => edge.source !== source);
````

---

### 🧩 5. **Settings Panel**

* Replaces the Nodes Panel when a node is selected.
* Allows editing node message text.
* Includes options to **Save** or **Delete** the selected node.
* Auto-syncs updates with Redux state.

---

### 💾 6. **Save Flow Validation**

* Prevents invalid flow saving when:

  * There are multiple nodes **without outgoing edges** (multiple endpoints).
* Displays relevant toast messages via **react-toastify**.

Validation logic:

```ts
const nodesWithoutOutgoing = nodes.filter(
  (node) => !edges.some((edge) => edge.source === node.id)
);
if (nodesWithoutOutgoing.length > 1) {
  toast.error("Cannot save flow: Multiple nodes without outgoing edges detected.");
}
```

---

### 💬 7. **Chat Preview (Bonus Feature)**

> Extends the base requirements — allows testing your chatbot flow in real-time.

* Automatically starts from the **first valid node** (no incoming edges).
* Dynamically follows edges to the next message.
* Supports user input simulation.
* Built-in **reset** and **close** functionality.
* Messages persist via Redux state.

---

### 🧭 8. **Flow Canvas**

* Built using **@xyflow/react (React Flow)**.
* Supports:

  * Zooming
  * Panning
  * Snapping to grid
  * Background, Controls, and MiniMap
* Drag and drop integration with Sidebar Nodes.

---

## 🧰 Tech Stack

| Category             | Library                                         |
| -------------------- | ----------------------------------------------- |
| **Framework**        | React 18 + TypeScript                           |
| **State Management** | Redux Toolkit                                   |
| **Flow Rendering**   | @xyflow/react (React Flow)                      |
| **Styling**          | TailwindCSS                                     |
| **UI Components**    | Lucide Icons + Custom Elements                  |
| **Notifications**    | react-toastify                                  |
| **Animations**       | Custom Tailwind keyframes / tailwindcss-animate |

---

## 🏗️ Architecture Overview

```
src/
 ├── components/
 │   ├── flow-builder/
 │   │   ├── FlowBuilder.tsx
 │   │   ├── NodeCanvas.tsx
 │   ├── sidebar/Sidebar.tsx
 │   ├── settings/SettingPanel.tsx
 │   ├── header/Header.tsx
 │   └── chat-interface/ChatInterface.tsx
 ├── elements/
 │   ├── button/Button.tsx
 │   ├── label/Label.tsx
 │   ├── textarea/Textarea.tsx
 ├── lib/
 │   ├── store/
 │   │   ├── flowBuilderSlice.ts
 │   │   ├── chatSlice.ts
 │   │   └── store.ts
 │   ├── hooks/
 │   │   ├── useAppDispatch.ts
 │   │   └── useAppSelector.ts
 │   └── types/
 │       ├── flowBuilder.ts
 │       └── chat.ts
 ├── App.tsx
 └── index.css
```

### Key Highlights:

* **Feature-based folder structure** for scalability.
* Separate **Redux slices** for flow and chat management.
* **Fully typed** data models (`FlowNode`, `ChatMessage`).
* **Reusable UI primitives** (Button, Label, Textarea).

---

## 🧠 Redux Logic Summary

### `flowBuilderSlice.ts`

* Handles all node and edge CRUD operations.
* Enforces connection rules.
* Manages selected node and flow reset.

### `chatSlice.ts`

* Manages chatbot simulation.
* Handles start, message updates, reset, and preview toggling.

---

## ⚙️ Installation & Setup

```bash
# Clone repository
git clone https://github.com/yourusername/chatbot-flow-builder.git

# Navigate into folder
cd chatbot-flow-builder

# Install dependencies
npm install

# Start dev server
npm run dev
```

App will run on 👉 `http://localhost:5173`

---

## 🧩 Future Improvements

* Add more node types (e.g., Condition, API Call, Delay).
* Persist flows to local storage or backend.
* Allow dragging edges from source to multiple targets (optional branching).
* Visual highlight of start and end nodes.
* Add export/import of flow as JSON.
* Integrate AI-based auto flow suggestion.

---