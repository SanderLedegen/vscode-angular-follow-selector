import * as vscode from 'vscode'
import { TextDocument, Uri, Position, CancellationToken, Location, ProviderResult } from 'vscode'

export class AngularSelectorDefinitionProvider implements vscode.DefinitionProvider {

  provideDefinition(document: TextDocument, position: Position, token: CancellationToken): ProviderResult<Location> {
    const wordRange = document.getWordRangeAtPosition(position)
    const clickedTag = document.getText(wordRange)
    const findTagInDocumentRegex = new RegExp(`selector:\\s?(['"])${clickedTag}\\1`, 'i')

    return vscode.workspace.findFiles('**/*.component.ts', 'node_modules/*')
      .then(tsFiles => {
        return tsFiles.map(file => {
          return vscode.workspace.openTextDocument(Uri.file(file.fsPath))
            .then(document => {
              return {
                path: file.fsPath,
                match: findTagInDocumentRegex.test(document.getText()),
              }
            })
        })
      })
      .then(mappedTsFiles => {
        return Promise.all(mappedTsFiles)
          .then(tsFileObjects => {
            const matchedTsFileObject = tsFileObjects.find((mo => mo.match))
            return matchedTsFileObject ? matchedTsFileObject.path : null
          })
      })
      .then(tagDefinitionPath => {
        if (tagDefinitionPath === null) {
          // Returning null prevents the tag from being underlined, which makes sense as there's no tag definition match.
          return null
        }

        // Returning a location gives VS Code a hint where to jump to when Ctrl/Cmd + click is invoked on the tag.
        return new Location(Uri.file(tagDefinitionPath), new Position(0, 0))
      })
  }
}
