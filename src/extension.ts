import * as vscode from "vscode";
import Panel from "./panel";

export function activate(context: vscode.ExtensionContext) {
  let test = vscode.commands.registerCommand("extension.testPanel", () => {
    vscode.window.showInformationMessage("A message to test for reloads.");
  });

  context.subscriptions.push(test);

	let disposable = vscode.commands.registerCommand('extension.showPanel', () => {
		vscode.window.showInformationMessage('Panel shown from extension.');
    // @ts-ignore
		Panel.createOrShow(context);
	});

  context.subscriptions.push(disposable);
}
export function deactivate() {}
