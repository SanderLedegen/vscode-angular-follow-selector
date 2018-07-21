import * as vscode from 'vscode'
import * as path from 'path'
import * as fs from 'fs'
import { TextDocument, Position, ProviderResult, Location, Uri } from 'vscode'

export class AngularUrlDefinitionProvider implements vscode.DefinitionProvider {

  urlRangeRegex = /[\w./-]+/

  provideDefinition(document: TextDocument, position: Position): ProviderResult<Location> {
    const wordRange = document.getWordRangeAtPosition(position, this.urlRangeRegex)
    const clickedRelativeUri = document.getText(wordRange)
    const containingLine = document.lineAt(position.line).text

    if (!containingLine.includes('templateUrl') && !containingLine.includes('styleUrls')) {
      return null
    }

    const fullUri = path.resolve(path.dirname(document.fileName), clickedRelativeUri)

    return fs.existsSync(fullUri) ? new Location(Uri.file(fullUri), new Position(0, 0)) : null
  }
}
