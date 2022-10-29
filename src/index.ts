#!/usr/bin/env node

import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import Directory from "./Directory.js";
import File from "./File.js";
import chalkAnimation from "chalk-animation";
import figlet from "figlet";
import { writeFileSync } from "fs";
import beautify from "js-beautify";

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
      s: {
        demandOption: false,
        alias: "save",
        describe: "Save result to a file",
        type: "boolean",
      },
      m: {
        demandOption: false,
        alias: "mark",
        describe: "Mark dead links in files",
        type: "boolean",
      },
    })
    .help()
    .strict()
    .alias("help", "h").argv;

  let analyzed: File | Directory;

  if (argv.f) analyzed = new File(argv.f, argv.m);

  if (argv.d) analyzed = new Directory(argv.d, argv.m);

  await analyzed!.checkLinks();

  if (argv.s) {
    const options = { indent_size: 2, space_in_empty_paren: true };
    const json = JSON.stringify(analyzed!.deadLinks);
    writeFileSync("lnkchkr-result.json", beautify(json, options));
  }
};

main();
