import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    console.log('VS Code Security Linter is now active!');

    // Tanılama (Diagnostic) koleksiyonunu oluşturalım
    const diagnosticCollection = vscode.languages.createDiagnosticCollection('securityLinter');
    context.subscriptions.push(diagnosticCollection);

    // Aktif editör değiştiğinde veya dosya kaydedildiğinde tetiklenecek fonksiyon
    if (vscode.window.activeTextEditor) {
        analyzeDocument(vscode.window.activeTextEditor.document, diagnosticCollection);
    }

    context.subscriptions.push(
        vscode.workspace.onDidOpenTextDocument(document => {
            analyzeDocument(document, diagnosticCollection);
        })
    );

    context.subscriptions.push(
        vscode.workspace.onDidSaveTextDocument(document => {
            analyzeDocument(document, diagnosticCollection);
        })
    );
}

function analyzeDocument(document: vscode.TextDocument, diagnosticCollection: vscode.DiagnosticCollection) {
    const diagnostics: vscode.Diagnostic[] = [];
    const text = document.getText();

    // Örnek Güvenlik Kuralı: Hardcoded API Key veya hassas anahtar tespiti için basit regex
    // (Örn: "api_key = '...' " veya "password = '...'")
    const insecurePattern = /(api_key|password|secret)\s*=\s*['"][^'"]+['"]/gi;
    let match;

    while ((match = insecurePattern.exec(text)) !== null) {
        const startPos = document.positionAt(match.index);
        const endPos = document.positionAt(match.index + match[0].length);
        const range = new vscode.Range(startPos, endPos);

        const diagnostic = new vscode.Diagnostic(
            range,
            `Security Warning: Potential hardcoded secret or sensitive credential detected (${match[1]})!`,
            vscode.DiagnosticSeverity.Warning
        );

        diagnostic.source = 'Security Linter';
        diagnostics.push(diagnostic);
    }

    diagnosticCollection.set(document.uri, diagnostics);
}

export function deactivate() {}
