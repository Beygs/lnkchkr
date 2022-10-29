import glob from "glob";
import File from "./File.js";

class Directory {
  files: File[];
  deadLinks: { file: string; deadLinks: string[] }[];

  constructor(public path: string) {
    this.files = this.#getFiles();
    this.deadLinks = [];
  }

  #getFiles() {
    const files = glob.sync(`${this.path}/**/*`, { nodir: true });

    return files.map((path) => new File(path));
  }

  async checkLinks() {
    for (const file of this.files) {
      const result = await file.checkLinks();
      if (result.deadLinks.length > 0)
        this.deadLinks.push(result);
    }
  }
}

export default Directory;
