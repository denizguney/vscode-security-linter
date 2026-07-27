# VS Code Security Linter

A real-time security linter and risk scanner extension designed for Visual Studio Code. This tool helps developers and security researchers identify configuration flaws, sensitive data leaks, and insecure patterns directly within their code editor.

## Features

* **Real-time Code Analysis:** Scans files as you open or save them.
* **Pattern Matching:** Detects hardcoded API keys, insecure regex usage, and common security misconfigurations.
* **VS Code Diagnostics:** Integrates directly into the Problems panel with visual warnings and underlines.

## Installation

1. Open **Visual Studio Code**.
2. Press `Ctrl+P` (or `Cmd+P` on macOS) to open the Quick Open dialog.
3. Type `ext install vscode-security-linter` (or build from source).

## Building from Source

If you want to contribute or run the extension locally:

```bash
# Clone the repository
git clone [https://github.com/denizguney/vscode-security-linter.git](https://github.com/denizguney/vscode-security-linter.git)

# Navigate to the project directory
cd vscode-security-linter

# Install dependencies
npm install

# Open in VS Code
code .
