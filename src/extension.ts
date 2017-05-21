import * as vscode from 'vscode'
import { commands, Uri, Position } from "vscode"
import { AngularSelectorDefinitionProvider } from './angular-selector-definition-provider'

export function activate(context: vscode.ExtensionContext) {

    const providerRegistration = vscode.languages.registerDefinitionProvider(
        { language: 'html', pattern: '**/*.component.html' },
        new AngularSelectorDefinitionProvider()
    );
    context.subscriptions.push(providerRegistration);
}

export function deactivate() {
}
