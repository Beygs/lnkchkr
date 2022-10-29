import chalk from "chalk";
import { readFileSync } from "fs";
import fetch from "node-fetch";

class File {
  content: string;
  links: RegExpMatchArray[];

  constructor(public path: string) {
    this.content = this.#getContent();
    this.links = [];

    this.#findLinks();
  }

  #getContent(): string {
    return readFileSync(this.path, { encoding: "utf8" });
  }

  #findLinks(): void {
    const URL_REGEX = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9]{1,6}\b([-a-zA-Z0-9!@:%_\+.~#?&\/\/=]*)/gm
    this.links = [...this.content.matchAll(URL_REGEX)];
  }

  async #checkLink(link: RegExpMatchArray) {
    try {
      const data = await fetch(link[0]);
      if (data.status !== 200) {
        console.log(`💀 Dead link found in file ${chalk.green(this.path)}: ${chalk.blue(link[0])} (status ${chalk.yellow(data.status)})`);
      }
    } catch (err) {
      console.log(err);
    }
  }

  checkLinks() {
    this.links.forEach((link) => this.#checkLink(link));
  }
}

export default File;
