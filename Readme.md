codecla-cli

A command-line tool, built with Node.js, TypeScript and Commander.js, that generates boilerplate code for coding challenges. Give it a function name, a programming language and a list of inputs, and it creates a ready-to-fill file for you.

Supported languages: JavaScript and Python.

Requirements
Node.js (a current LTS version or newer)
npm
Installation
bash
git clone https://github.com/Noelle2412/codecla-cli.git
cd codecla-cli
npm install
npm run build

npm run build compiles index.ts to JavaScript in the output/ folder.

Usage
bash
npm start -- generate -n <functionName> -l <language> -i <inputs>

Or run the compiled file directly:

bash
node ./output/index.js generate -n <functionName> -l <language> -i <inputs>
Options
Option Long form Required Description
-n --name <functionName> Yes Name of the function to generate. Also used as the file name.
-l --language <languageName> Yes Programming language: javascript or python.
-i --input <inputParameters> No Function parameters, separated by commas (e.g. a,b).

Show the built-in help at any time:

bash
node ./output/index.js generate --help
How it works
You run the generate command with a name, a language and (optionally) inputs.
If the language is not javascript or python, the CLI lets you pick one from a list.
The CLI asks you to confirm before anything is written.
After you confirm, the boilerplate is saved as <functionName>.js or <functionName>.py in the generated/ folder and printed to the terminal.
Examples
JavaScript
bash
npm start -- generate -n twoSum -l javascript -i nums,target

Creates output/twoSum.js:

js
function twoSum(nums,target) {
// Your code here
return;
}
Python
bash
npm start -- generate -n two_sum -l python -i nums,target

Creates generated/two_sum.py:

python
def two_sum(nums,target): # Your code here
return
No inputs
bash
npm start -- generate -n hello -l javascript

Creates generated/hello.js with an empty parameter list.

Project structure
codecla-cli/
├── index.ts # CLI source code
├── tsconfig.json # TypeScript configuration (compiles to ./output)
├── package.json # Dependencies and scripts
└── output/ # Compiled code and generated boilerplate files
Scripts
Script Command Description
build npm run build Compile TypeScript to output/.
start npm start -- <args> Run the compiled CLI.
Built with
TypeScript
Commander.js for command and option parsing
Inquirer (@inquirer/prompts) for the confirmation and language prompts
