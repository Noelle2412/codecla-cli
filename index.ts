import { Command } from "commander";
import { select, confirm } from "@inquirer/prompts";
import fs from "fs";

const program = new Command();

async function generateBoilerplate(
  name: string,
  language: string,
  input: string,
): Promise<void> {
  if (
    language.toLowerCase() != "javascript" &&
    language.toLowerCase() != "python"
  ) {
    language = await languageSelect();
  }

  const answer = await confirmSelect(name, language, input);
  if (answer) {
    if (language === "javascript") {
      const code: string = `function ${name}(${input}) {
    // Your code here
    return;
}`;
      fs.writeFileSync(`./output/${name}.js`, code);
      console.log(`Boilerplate code generated in ./output/${name}.js

${code}
`);
    } else if (language === "python") {
      const code: string = `def ${name}(${input}): 
    # Your code here
    return`;
      fs.writeFileSync(`./output/${name}.py`, code);
      console.log(`Boilerplate code generated in ./output/${name}.py

${code}
`);
    }
  }
}

async function confirmSelect(
  name: string,
  language: string,
  input: string,
): Promise<boolean> {
  const confirmation: boolean = await confirm({
    message: `Generate boilerplate code for ${language} with function ${name} and ${input != "" ? `parameters ${input}` : "no parameters"}?`,
  });
  return confirmation;
}

async function languageSelect(): Promise<string> {
  const language = await select({
    message: "Choose your programming language",
    choices: ["javascript", "python"],
  });
  return language;
}

program
  .command("generate")
  .description("generate Boilerplate Function")
  .requiredOption(
    "-n, --name <functionName>",
    "Name of the function to be generated",
  )
  .requiredOption(
    "-l, --language <languageName>",
    "Name of the programming language",
  )
  .option(
    "-i, --input <inputParameters>",
    "Parameters for the function, separated by a comma",
    "",
  )
  .action(({ name, language, input }) => {
    generateBoilerplate(name, language, input);
  });

program.parse();
