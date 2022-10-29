var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Directory_instances, _Directory_checkFiles;
import glob from "glob";
import File from "./File.js";
class Directory {
    constructor(path) {
        this.path = path;
        _Directory_instances.add(this);
        __classPrivateFieldGet(this, _Directory_instances, "m", _Directory_checkFiles).call(this);
    }
}
_Directory_instances = new WeakSet(), _Directory_checkFiles = function _Directory_checkFiles() {
    glob(`${this.path}/**/*`, { nodir: true }, (err, res) => {
        if (err)
            throw err;
        res.forEach((path) => {
            const file = new File(path);
            file.checkLinks();
        });
    });
};
export default Directory;
