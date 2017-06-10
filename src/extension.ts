import * as vscode from 'vscode'
import { AngularSelectorDefinitionProvider } from './providers/angular-selector-definition-provider'
import { AngularUrlDefinitionProvider } from './providers/angular-url-definition-provider'

export function activate(context: vscode.ExtensionContext) {

  const selectorRegistration = vscode.languages.registerDefinitionProvider(
    { language: 'html', pattern: '**/*.component.html' },
    new AngularSelectorDefinitionProvider()
  )

  const urlRegistration = vscode.languages.registerDefinitionProvider(
    { language: 'typescript', pattern: '**/*.component.ts' },
    new AngularUrlDefinitionProvider()
  )

  context.subscriptions.push(
    selectorRegistration,
    urlRegistration,
  )
}

export function deactivate() {
}
