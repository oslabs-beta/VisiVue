import * as vscode from 'vscode';
import Panel from './panel';

export function activate(context: vscode.ExtensionContext) {
	
	let test = vscode.commands.registerCommand('extension.testPanel', () => {
		vscode.window.showInformationMessage('A message to test for reloads.');
	});

	context.subscriptions.push(test);

	let disposable = vscode.commands.registerCommand('extension.showPanel', () => {
		vscode.window.showInformationMessage('Panel shown from extension.');
		Panel.createOrShow(context);
	});

	context.subscriptions.push(disposable);
}
export function deactivate() {}




// ------------------------- REACT TREE ----------------------------
// export function activate(extContext: vscode.ExtensionContext) {
//   extContext.subscriptions.push(
//     vscode.commands.registerCommand('reacTree.start', () => {
//       ReacTreePanel.createOrShow(extContext);
//     })
//   );
  
//   // Create reacTree status bar button
//   const item = vscode.window.createStatusBarItem(
//     vscode.StatusBarAlignment.Right
//   );

//   item.command = 'reacTree.start';
//   item.tooltip = 'Activate ReacTree';
//   item.text = '$(type-hierarchy) Start Tree';
//   item.show();
// }
