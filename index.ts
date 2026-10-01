import { Command } from "commander";
import { select, confirm } from "@inquirer/prompts";
import fs from "fs";

const program = new Command();

interface GenerateOptions {
  name: string;
  language: string;
  input: string;
}

async function generateBoilerplate(
  name: string,
  language: string,
  input: string,
): Promise<void> {
  if (language != "javascript" && language != "python") {
    console.log(
      `${language} is not supported, please choose one of the following languages:`,
    );
    language = await languageSelect();
  }

  const answer = await confirmSelect(name, language, input);
  if (answer) {
    const path: string = "generated";
    fs.mkdirSync(path, { recursive: true });
    if (language === "javascript") {
      const code: string = `function ${name}(${input}) {
    // Your code here
    return;
}`;
      fs.writeFileSync(`${path}/${name}.js`, code);
      console.log(`Boilerplate code generated in ./output/${name}.js

${code}
`);
    } else if (language === "python") {
      const code: string = `def ${name}(${input}): 
    # Your code here
    return`;
      fs.writeFileSync(`${path}/${name}.py`, code);
      console.log(`Boilerplate code generated in ./output/${name}.py

${code}
`);
    }
  } else {
    console.log("Cancelled, nothing was generated.");
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
  .action((options: GenerateOptions) => {
    if (!/^[A-Za-z_]*$/.test(options.name)) {
      console.log("Invalid name, please enter a valid function name");
    } else if (!/^[A-Za-z_,]*$/.test(options.input)) {
      console.log("Invalid arguments, please enter valid arguments");
    } else {
      generateBoilerplate(
        options.name,
        options.language.toLowerCase(),
        options.input,
      );
    }
  });

try {
  program.parseAsync();
} catch {
  console.log("Generation failed");
}
