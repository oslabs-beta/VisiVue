import * as vscode from "vscode";
import Panel from "./panel";

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    "extension.showPanels",
    () => {
      // @ts-ignore
      Panel.createOrShow(context);
    }
  );

  context.subscriptions.push(disposable);

  // Create VisiVue status bar button in the bottom right of vscode
  const item = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Right
  );

  item.command = "extension.showPanels";
  item.tooltip = "Activate VisiVue Extension";
  item.text = "$(type-hierarchy) Launch VisiVue";
  item.show();
}
export function deactivate() {}
