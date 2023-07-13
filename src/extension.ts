import * as vscode from "vscode";
import Panel from "./panel";

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    "extension.showPanel",
    () => {
      // vscode.window.showInformationMessage('Panel shown from extension.');
      // @ts-ignore
      Panel.createOrShow(context);
    }
  );

  context.subscriptions.push(disposable);

  // Create sVue status bar button
  const item = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Right
  );

  item.command = "extension.showPanel";
  item.tooltip = "Activate sVue Extension";
  item.text = "$(type-hierarchy) Launch sVue";
  item.show();
}
export function deactivate() {}
