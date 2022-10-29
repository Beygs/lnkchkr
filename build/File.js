var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _File_instances, _File_getContent, _File_findLinks, _File_checkLink;
import chalk from "chalk";
import { readFileSync } from "fs";
import fetch from "node-fetch";
class File {
    constructor(path) {
        this.path = path;
        _File_instances.add(this);
        this.content = __classPrivateFieldGet(this, _File_instances, "m", _File_getContent).call(this);
        this.links = [];
        this.deadLinks = { file: path, deadLinks: [] };
        __classPrivateFieldGet(this, _File_instances, "m", _File_findLinks).call(this);
    }
    checkLinks() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`\n⏳ Analyzing ${chalk.green(this.path)}`);
            for (const link of this.links) {
                yield __classPrivateFieldGet(this, _File_instances, "m", _File_checkLink).call(this, link);
            }
            console.log(`✔️ ${chalk.green(this.path)} analyzed.`);
            if (this.deadLinks.deadLinks.length === 0)
                console.log(`🎉 No dead link found in file ${chalk.green(this.path)}!`);
            return this.deadLinks;
        });
    }
}
_File_instances = new WeakSet(), _File_getContent = function _File_getContent() {
    return readFileSync(this.path, { encoding: "utf8" });
}, _File_findLinks = function _File_findLinks() {
    const URL_REGEX = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9]{1,6}\b([-a-zA-Z0-9!@:%_\+.~#?&\/\/=]*)/gm;
    this.links = [...this.content.matchAll(URL_REGEX)];
}, _File_checkLink = function _File_checkLink(link) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield fetch(link[0]);
            if (data.status !== 200) {
                console.log(`💀 Dead link found in file ${chalk.green(this.path)}: ${chalk.blue(link[0])} (status ${chalk.yellow(data.status)})`);
                this.deadLinks.deadLinks.push({ url: link[0], status: data.status });
            }
        }
        catch (err) {
            console.log(err);
        }
    });
};
export default File;
