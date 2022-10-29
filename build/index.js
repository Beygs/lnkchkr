#!/usr/bin/env node
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import Directory from "./Directory.js";
import File from "./File.js";
import chalkAnimation from "chalk-animation";
import figlet from "figlet";
import { writeFileSync } from "fs";
const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    console.clear();
    let title;
    figlet.text("LNKCHKR", { font: "Banner3" }, (err, data) => {
        const text = data !== null && data !== void 0 ? data : "LNKCHKR";
        title = chalkAnimation.glitch(text, 2);
    });
    yield sleep();
    title.stop();
    const argv = yield yargs(hideBin(process.argv))
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
        }
    })
        .help()
        .strict()
        .alias("help", "h").argv;
    let analyzed;
    if (argv.f)
        analyzed = new File(argv.f);
    if (argv.d)
        analyzed = new Directory(argv.d);
    yield analyzed.checkLinks();
    if (argv.s)
        writeFileSync("lnkchkr-result.json", JSON.stringify(analyzed.deadLinks));
});
main();
