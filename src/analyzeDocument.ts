function analyzeDocument(document: vscode.TextDocument, diagnosticCollection: vscode.DiagnosticCollection) {
    const diagnostics: vscode.Diagnostic[] = [];
    const text = document.getText();

    // 1. Kural: Hardcoded API Key veya hassas anahtar tespiti
    const secretPattern = /(api_key|password|secret|token)\s*=\s*['"][^'"]+['"]/gi;
    let match;

    while ((match = secretPattern.exec(text)) !== null) {
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

    // 2. Kural: Tehlikeli fonksiyon kullanımları (eval vb.)
    const evalPattern = /\beval\s*\(/gi;
    while ((match = evalPattern.exec(text)) !== null) {
        const startPos = document.positionAt(match.index);
        const endPos = document.positionAt(match.index + match[0].length);
        const range = new vscode.Range(startPos, endPos);

        const diagnostic = new vscode.Diagnostic(
            range,
            `Security Warning: Use of eval() is highly discouraged due to arbitrary code execution risks.`,
            vscode.DiagnosticSeverity.Error
        );
        diagnostic.source = 'Security Linter';
        diagnostics.push(diagnostic);
    }

    // 3. Kural: Güvensiz HTTP URL bağlantıları
    const insecureHttpPattern = /http:\/\/[^\s'"]+/gi;
    while ((match = insecureHttpPattern.exec(text)) !== null) {
        const startPos = document.positionAt(match.index);
        const endPos = document.positionAt(match.index + match[0].length);
        const range = new vscode.Range(startPos, endPos);

        const diagnostic = new vscode.Diagnostic(
            range,
            `Security Warning: Insecure HTTP protocol used. Consider switching to HTTPS.`,
            vscode.DiagnosticSeverity.Information
        );
        diagnostic.source = 'Security Linter';
        diagnostics.push(diagnostic);
    }

    diagnosticCollection.set(document.uri, diagnostics);
}
