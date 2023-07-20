<p align=center>
    <img width="250" src="logo/logo.png" alt='VisiVue Logo'>
<p>
<h1>VisiVue (Beta)</h1>
As applications built in Vue JS increase in size and complexity, developers tasked with their maintenance and management often face challenges, particularly when dealing with unanticipated side-effects caused by two-way data binding. This is where VisiVue comes in. VisiVue is a VS Code extension that aims to fulfill our mission of providing Vue developers with deeper insight into their applications' structures, data flow, and trajectory as it scales.

<li>Visualize the component hierarchy of an application</li>   
<li>Keep track of stateful variables as they flow from parent to children</li>
<li>Understand what variables are <strong>one-way</strong> data bound and <strong>two-way</strong> data bound.</li>  
<li>Keep track of which components these stateful variables are drilled through</li> 
<li></li> 

<h1>Get Started</h1>

1. Head to the VS Code store and download VisiVue
2. Once installed, 

<h1>Open Source</h1>

<h3>How to Contribute</h3>

---------------------
We are looking for developers who believe in VisiVue and want to take it to the next level! Here are some features that we would love to implement that have not already been implemented. Feel free to fork this repo and take a look at the source code!
 
| Further Features to Implement | Status |
| ------- | ------ |
| Vue Router Compatiblity | ⏳ |
| Pinia Compatibility | ⏳ |
| Testing Suites | ⏳ |
| Make the tree centered and zoomed properly on mount | ⏳ |
| Icon on each node that pulls up source code for that specifc node | ⏳ |


<br>
<h3>How to Run in Development Mode</h3>

---------------------

1. Clone the dev repo.
``` 
git clone https://github.com/oslabs-beta/VisiVue.git
```
2. Go into the VisiVue directory on your local machine and install dependencies
```
npm install
```
3. Once you have successfully installed dependencies, to open the developer environment for the VS Code extension, press 'ctrl + f5' if you are on Windows, or 'fn + f5' if you are on MacOS. This will open a new VS Code text editor and allow you to see a development version of the extension.

    - Note that may be difficult to get console logs when working on the Vue files specifically, so use the browser version by running:
    ```
    npm run dev
    ```
4. Once the VS Code development version is open, open the command pallete by pressing 'cmd + shift + p' and look for the command 'Show VisiVue Panel' and now you can see the extension!

    - If you are working in the VS Code developer environment, make sure to press 'cmd + r' to refresh the extension so that it compiles and runs your most recent changes.

<br>
Here are some links to documentation that you may find useful:
* 
<br>
<h1>Known Bugs</h1>
<li>
If you select a file and a tree is rendered: subsequently selecting another file  should clear the current tree and render a new tree for that new file. However, what happens is that the newly rendered tree will not have nodes, but will still persist the edges. What we suspect is happening is that Vue Flow's internal processing of our data is causing this issue. We are currently working on a fix.
</li>
<h1>Change Log</h1>
<h1>VisiVue Contributors</h1>
<p dir="auto">Accelerated by <a href="https://github.com/open-source-labs">OS Labs</a> and developed by <a href="https://github.com/a-hend">Abe Henderson</a>, <a href="https://github.com/ChristopherPark3">Christopher Park</a>, <a href="https://github.com/hkulf41">Ulf Wong</a>, <a href="https://github.com/yosuketomita">Yosuke Tomita</a>, and <a href="https://github.com/kaseydn">Kasey Nguyen</a>

<h1>Tech Stack</h1>

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![Vue.js](https://img.shields.io/badge/vuejs-%2335495e.svg?style=for-the-badge&logo=vuedotjs&logoColor=%234FC08D)
![Webpack](https://img.shields.io/badge/webpack-%238DD6F9.svg?style=for-the-badge&logo=webpack&logoColor=black)
![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)
![VueFlow](https://img.shields.io/badge/Vue%20Flow-%2335495e.svg?style=for-the-badge&logo=vuedotjs&logoColor=%234FC08D)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)

<h1>VisiVue Contributors</h1>
<p dir="auto">Accelerated by <a href="https://github.com/open-source-labs">OS Labs</a></p>
<table>
<thead>
<tr>
<th>Name</th>
<th>GitHub</th>
<th>LinkedIn</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>Abe Henderson</strong></td>
<td><a href="https://github.com/a-hend"><img src="https://camo.githubusercontent.com/f6d50128cb007f85916b7a899da5d94f654dce35a37331c8d28573aef46f4274/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f6769746875622d2532333132313031312e7376673f7374796c653d666f722d7468652d6261646765266c6f676f3d676974687562266c6f676f436f6c6f723d7768697465" alt="GitHub" data-canonical-src="https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&amp;logo=github&amp;logoColor=white" style="max-width: 100%;"></a></td>
<td><a href="https://www.linkedin.com/in/abe-henderson-367638139/" rel="nofollow"><img src="https://camo.githubusercontent.com/7e1a1a039c75a7c4d2a91d7f97bf0a1c2adcf7cb49b7dbbfc02963a4f9fdaca4/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f6c696e6b6564696e2d2532333030373742352e7376673f7374796c653d666f722d7468652d6261646765266c6f676f3d6c696e6b6564696e266c6f676f436f6c6f723d7768697465" alt="LinkedIn" data-canonical-src="https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&amp;logo=linkedin&amp;logoColor=white" style="max-width: 100%;"></a></td>
</tr>
<tr>
<td><strong>Christopher Park</strong></td>
<td><a href="https://github.com/ChristopherPark3"><img src="https://camo.githubusercontent.com/f6d50128cb007f85916b7a899da5d94f654dce35a37331c8d28573aef46f4274/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f6769746875622d2532333132313031312e7376673f7374796c653d666f722d7468652d6261646765266c6f676f3d676974687562266c6f676f436f6c6f723d7768697465" alt="GitHub" data-canonical-src="https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&amp;logo=github&amp;logoColor=white" style="max-width: 100%;"></a></td>
<td><a href="https://www.linkedin.com/in/christopherjcpark/" rel="nofollow"><img src="https://camo.githubusercontent.com/7e1a1a039c75a7c4d2a91d7f97bf0a1c2adcf7cb49b7dbbfc02963a4f9fdaca4/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f6c696e6b6564696e2d2532333030373742352e7376673f7374796c653d666f722d7468652d6261646765266c6f676f3d6c696e6b6564696e266c6f676f436f6c6f723d7768697465" alt="LinkedIn" data-canonical-src="https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&amp;logo=linkedin&amp;logoColor=white" style="max-width: 100%;"></a></td>
</tr>
<tr>
<td><strong>Ulf Wong</strong></td>
<td><a href="https://github.com/hkulf41"><img src="https://camo.githubusercontent.com/f6d50128cb007f85916b7a899da5d94f654dce35a37331c8d28573aef46f4274/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f6769746875622d2532333132313031312e7376673f7374796c653d666f722d7468652d6261646765266c6f676f3d676974687562266c6f676f436f6c6f723d7768697465" alt="GitHub" data-canonical-src="https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&amp;logo=github&amp;logoColor=white" style="max-width: 100%;"></a></td>
<td><a href="https://www.linkedin.com/in/ulf-wong/" rel="nofollow"><img src="https://camo.githubusercontent.com/7e1a1a039c75a7c4d2a91d7f97bf0a1c2adcf7cb49b7dbbfc02963a4f9fdaca4/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f6c696e6b6564696e2d2532333030373742352e7376673f7374796c653d666f722d7468652d6261646765266c6f676f3d6c696e6b6564696e266c6f676f436f6c6f723d7768697465" alt="LinkedIn" data-canonical-src="https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&amp;logo=linkedin&amp;logoColor=white" style="max-width: 100%;"></a></td>
</tr>
<tr>
<td><strong>Yosuke Tomita</strong></td>
<td><a href="https://github.com/yosuketomita"><img src="https://camo.githubusercontent.com/f6d50128cb007f85916b7a899da5d94f654dce35a37331c8d28573aef46f4274/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f6769746875622d2532333132313031312e7376673f7374796c653d666f722d7468652d6261646765266c6f676f3d676974687562266c6f676f436f6c6f723d7768697465" alt="GitHub" data-canonical-src="https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&amp;logo=github&amp;logoColor=white" style="max-width: 100%;"></a></td>
<td><a href="https://www.linkedin.com/in/yosuke-tomita-58617a82/" rel="nofollow"><img src="https://camo.githubusercontent.com/7e1a1a039c75a7c4d2a91d7f97bf0a1c2adcf7cb49b7dbbfc02963a4f9fdaca4/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f6c696e6b6564696e2d2532333030373742352e7376673f7374796c653d666f722d7468652d6261646765266c6f676f3d6c696e6b6564696e266c6f676f436f6c6f723d7768697465" alt="LinkedIn" data-canonical-src="https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&amp;logo=linkedin&amp;logoColor=white" style="max-width: 100%;"></a></td>
</tr>
<tr>
<td><strong>Kasey Nguyen</strong></td>
<td><a href="https://github.com/kaseydn"><img src="https://camo.githubusercontent.com/f6d50128cb007f85916b7a899da5d94f654dce35a37331c8d28573aef46f4274/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f6769746875622d2532333132313031312e7376673f7374796c653d666f722d7468652d6261646765266c6f676f3d676974687562266c6f676f436f6c6f723d7768697465" alt="GitHub" data-canonical-src="https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&amp;logo=github&amp;logoColor=white" style="max-width: 100%;"></a></td>
<td><a href="https://www.linkedin.com/in/kaseynguyen0527/" rel="nofollow"><img src="https://camo.githubusercontent.com/7e1a1a039c75a7c4d2a91d7f97bf0a1c2adcf7cb49b7dbbfc02963a4f9fdaca4/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f6c696e6b6564696e2d2532333030373742352e7376673f7374796c653d666f722d7468652d6261646765266c6f676f3d6c696e6b6564696e266c6f676f436f6c6f723d7768697465" alt="LinkedIn" data-canonical-src="https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&amp;logo=linkedin&amp;logoColor=white" style="max-width: 100%;"></a></td>
</tr>
</tbody>
</table>

---

Inspired by <a src="https://github.com/oslabs-beta/ReacTree">ReacTree</a>



