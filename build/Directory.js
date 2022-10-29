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
var _Directory_instances, _Directory_getFiles;
import glob from "glob";
import File from "./File.js";
class Directory {
    constructor(path) {
        this.path = path;
        _Directory_instances.add(this);
        this.files = __classPrivateFieldGet(this, _Directory_instances, "m", _Directory_getFiles).call(this);
        this.deadLinks = [];
    }
    checkLinks() {
        return __awaiter(this, void 0, void 0, function* () {
            for (const file of this.files) {
                const result = yield file.checkLinks();
                if (result.deadLinks.length > 0)
                    this.deadLinks.push(result);
            }
        });
    }
}
_Directory_instances = new WeakSet(), _Directory_getFiles = function _Directory_getFiles() {
    const files = glob.sync(`${this.path}/**/*`, { nodir: true });
    return files.map((path) => new File(path));
};
export default Directory;
