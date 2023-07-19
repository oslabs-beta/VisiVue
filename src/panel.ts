import * as vscode from 'vscode';
import { Parser } from './parser';

export default class Panel {
  public static currentPanel: Panel | undefined;

  private static readonly viewType = 'VisiVue';

  private readonly _panel: vscode.WebviewPanel;
  private readonly _extensionUri: vscode.Uri;
  private readonly _context: vscode.ExtensionContext;
  private _disposables: vscode.Disposable[] = [];
  private parser: Parser | undefined;
  
  // Method to see if a panel already exists. If not, create a new panel with the 'context' passed into it in the extension.ts file
  public static createOrShow(context: vscode.ExtensionContext) {
    const column = vscode.window.activeTextEditor ? vscode.window.activeTextEditor.viewColumn : undefined;
    if (Panel.currentPanel){
      Panel.currentPanel._panel.reveal(column);
    } else {
      Panel.currentPanel = new Panel(context, vscode.ViewColumn.Two);
    }
  }

  private constructor(_context: vscode.ExtensionContext, column: vscode.ViewColumn) {
    this._context = _context;
    this._extensionUri = _context.extensionUri;
    
    // Create and show a new webview panel
    this._panel = vscode.window.createWebviewPanel(Panel.viewType, "VisiVueTree", column, {
      enableScripts: true,
      retainContextWhenHidden: true,
      localResourceRoots: [this._extensionUri],
    });
    
    // Set the webview's initial html content
    this._panel.webview.html = this._getHtmlForWebview(this._panel.webview);
    
    //Listen for when the panel gets disposed
    this._panel.onDidDispose(() => this.dispose(), null, this._disposables);
    this._panel.webview.onDidReceiveMessage(
      async (msg: any) => {
        switch (msg.type) {
          case 'onFile':
            if (msg.value){
              // connects us to parser file
              this.parser = new Parser(msg.value);
              this.parser.entryFileParse();
              this.updateView();  
            }
            break;
          // For the implementation of a button on each individual node that will redirect the user to the source code
          // of the given component that is clicked on. For this to work, must post a message with the type being 'onViewFile'
          // so that this case gets hit.
          case 'onViewFile':
            if (!msg.value) { 
              return; 
            };
            const doc = await vscode.workspace.openTextDocument(msg.value);
            const editor = await vscode.window.showTextDocument(doc, {
              preserveFocus: false,
              preview: false
            });
            break;
        }
      },
      null,
      this._disposables
    );
  }
  
  // Whenever a new file is uploaded, it is parsed. We retrieve the tree and post it to the front-end
  private async updateView() {
    const tree = this.parser!.getTree();
    this._context.workspaceState.update('VisiVueTree', tree);
    this._panel.webview.postMessage({
      type: 'parsed-data',
      value: tree,
      settings: await vscode.workspace.getConfiguration('VisiVueTree')
    });
  }
  
  // Method to clear disposables array and 'clean' the data
  public dispose() {
    Panel.currentPanel = undefined;
    this._panel.dispose();
    while (this._disposables.length) {
      const node = this._disposables.pop();
      if (node) {
        node.dispose();
      }
    }
  }
  private _getHtmlForWebview(webview: vscode.Webview) {
    // @ts-ignore
    const scriptUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, 'out', 'main.wv.js'));
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title> Panel Title </title>
    </head>
    <body>
      <div id="app"></div>
      <script>
        const vscode = acquireVsCodeApi();
        window.onload = () => {
          vscode.postMessage({ command: 'startup' });
          console.log('HTML element started up);
        };
      </script>
      <script src="${scriptUri}"></script>
    </body>
    </html>
    `;
  }
}