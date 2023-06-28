import * as vscode from 'vscode';
export function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension "extension" is now active!');

	let disposable = vscode.commands.registerCommand('extension.showPanel', () => {
		vscode.window.showInformationMessage('Panel shown from extension.');
	});

	context.subscriptions.push(disposable);
}
export function deactivate() {}
