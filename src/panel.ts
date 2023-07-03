import * as vscode from 'vscode';
import { Parser } from './parser';

export default class Panel {
  // Declare variables to be read
  public static currentPanel: Panel | undefined;

  private static readonly viewType = 'sVue';

  private readonly _panel: vscode.WebviewPanel;
  private readonly _extensionUri: vscode.Uri;
  private readonly _context: vscode.ExtensionContext;
  private _disposables: vscode.Disposable[] = [];
  private parser: Parser | undefined;
  
  //declare methods to be used by the class

  // method to see if a panel already exists. If not, create a new panel with the 'context' passed into it in the extension.ts file
  public static createOrShow(context: vscode.ExtensionContext) {

    // Assign 'column' to the panel ('viewColumn') that the user is focused on or none (undefined)
    const column = vscode.window.activeTextEditor ? vscode.window.activeTextEditor.viewColumn : undefined;

    // Panel exists? Show it. Else create one.
    if (Panel.currentPanel){
      Panel.currentPanel._panel.reveal(column);
    } else {
      Panel.currentPanel = new Panel(context, vscode.ViewColumn.Two);
    }
  }

  //declare constructor for every new instance of a Panel
  private constructor(_context: vscode.ExtensionContext, column: vscode.ViewColumn) {
    // set '_context' property to the passed in argument when the constructor is called
    // set uri of this panel using the native extensionUri method (VSCode API) on the '_context' variable we just declared
    // .extensionUri = 'the uri of the directory containing the extension'
    this._context = _context;
    this._extensionUri = _context.extensionUri;
    
    // Create and show a new webview panel
    // 
    this._panel = vscode.window.createWebviewPanel(Panel.viewType, "sVueTree", column, {
      enableScripts: true,
      retainContextWhenHidden: true,
      localResourceRoots: [this._extensionUri],
    });
    
    // Set the webview's initial html content
    // '.Webview' = A panel that contains a webview
    this._panel.webview.html = this._getHtmlForWebview(this._panel.webview);
    
    
    //Listen for when the panel gets disposed
    //disposed - when the user closes the panel or when closed programatically (thru code)
    this._panel.onDidDispose(() => this.dispose(), null, this._disposables);
    console.log("Panel is Created");
    // VSCode API Native Method: onDidReceiveMessage() = event that fires when webview content posts a message
    // Webview content can only post strings of json serializable objects back to our extension
    this._panel.webview.onDidReceiveMessage(
      async (msg: any) => {
        switch (msg.type) {
          case 'onFile':
            if (!msg.value) break;
            this.parser = new Parser(msg.value);
            // this.parser.parse();
            this.updateView();
            break;
          case 'onViewFile':
            if (!msg.value) return;
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
  
  private async updateView() {
    // Saves current state of the tree to the workspace state
    const tree = this.parser!.getTree();
    this._context.workspaceState.update('sVueTree', tree);
    this._panel.webview.postMessage({
      type: 'parsed-data',
      value: tree,
      settings: await vscode.workspace.getConfiguration('sVueTree')
    })
    
    // Sends the updated tree to webview
    this._panel.webview.postMessage({
      type: 'parsed-data',
      value: tree,
      settings: await vscode.workspace.getConfiguration('sVueTree'),
    });
  }
  
  // method to clear disposables array and 'clean' the data
  public dispose() {
    // makes class panel null
    // set current panel to undefined to start
    // a disposable method is called on _panel to initiate the removal process. Entering the the while loop to start popping out all objects stored in an array when createOrShow is invoked
    Panel.currentPanel = undefined;
    this._panel.dispose();
    while (this._disposables.length) {
      const node = this._disposables.pop();
      if (node) {
        node.dispose();
      }
    }
  }
  
  // get html for webview
  // convert our file to a uri that webview can interpret
    // We do this for our scripts well as our styles
  private _getHtmlForWebview(webview: vscode.Webview) {
    
    const scriptUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, 'out', 'main.wv.js')
    );
      
    // const styleUri = webview.asWebviewUri(
    //   vscode.Uri.joinPath(this._extensionUri, 'media', 'styles.css')
    // );

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



