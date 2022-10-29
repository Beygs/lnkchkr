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
const main = () => __awaiter(void 0, void 0, void 0, function* () {
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
});
main();
