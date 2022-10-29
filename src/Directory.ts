import glob from "glob";
import File from "./File.js";

class Directory {
  constructor(public path: string) {
    this.#checkFiles();
  }

  #checkFiles() {
    glob(`${this.path}/**/*`, { nodir: true }, async (err, res) => {
      if (err) throw err;
      for (const path of res) {
        const file = new File(path);
        await file.checkLinks();
      }
    });
  }
}

export default Directory;
