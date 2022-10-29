import glob from "glob";
import File from "./File.js";

class Directory {
  constructor(public path: string) {
    this.#checkFiles();
  }

  #checkFiles() {
    glob(`${this.path}/**/*`, { nodir: true }, (err, res) => {
      if (err) throw err;
      res.forEach((path) => {
        const file = new File(path);
        file.checkLinks();
      });
    });
  }
}

export default Directory;
