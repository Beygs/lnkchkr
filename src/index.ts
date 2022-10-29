#!/usr/bin/env node

import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import Directory from "./Directory.js";
import File from "./File.js";
import chalkAnimation from "chalk-animation";
import figlet from "figlet";

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

const main = async () => {
  console.clear();

  let title: chalkAnimation.Animation;

  figlet.text("LNKCHKR", { font: "Banner3" }, (err, data) => {
    const text = data ?? "LNKCHKR";
    title = chalkAnimation.glitch(text, 2);
  });

  await sleep();

  title!.stop();

  const argv = await yargs(hideBin(process.argv))
    .options({
      d: {
        demandOption: false,
        alias: "directory",
        describe: "Directory to check",
        type: "string",
      },
      f: {
        demandOption: false,
        alias: "file",
        describe: "File to check",
        type: "string",
      },
    })
    .help()
    .strict()
    .alias("help", "h").argv;

  if (argv.f) {
    const file = new File(argv.f);
    file.checkLinks();
  }

  if (argv.d) {
    const directory = new Directory(argv.d);
  }
};

main();
