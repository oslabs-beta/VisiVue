import * as vscode from 'vscode';
import Panel from './panel';

export function activate(context: vscode.ExtensionContext) {

	let disposable = vscode.commands.registerCommand('extension.showPanel', () => {
		vscode.window.showInformationMessage('Panel shown from extension.');
		Panel.createOrShow(context);
	});

	context.subscriptions.push(disposable);
}
export function deactivate() {}
