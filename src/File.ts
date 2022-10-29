import chalk from "chalk";
import { readFileSync, writeFileSync } from "fs";
import fetch from "node-fetch";

class File {
  content: string;
  links: RegExpMatchArray[];
  deadLinks: { file: string; deadLinks: { url: string; status: number }[] };

  constructor(public path: string, public mark?: boolean) {
    this.content = this.#getContent();
    this.links = [];
    this.deadLinks = { file: path, deadLinks: [] };

    this.#findLinks();
  }

  #getContent(): string {
    return readFileSync(this.path, { encoding: "utf8" });
  }

  #findLinks(): void {
    const URL_REGEX =
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9]{1,6}\b([-a-zA-Z0-9!@:%_\+.~#?&\/\/=]*)/gm;
    this.links = [...this.content.matchAll(URL_REGEX)];
  }

  async #checkLink(link: RegExpMatchArray) {
    try {
      const data = await fetch(link[0]);
      if (data.status !== 200) {
        console.log(
          `💀 Dead link found in file ${chalk.green(this.path)}: ${chalk.blue(
            link[0]
          )} (status ${chalk.yellow(data.status)})`
        );
        this.deadLinks.deadLinks.push({ url: link[0], status: data.status });

        if (this.mark)
          this.content = this.content.replace(
            link[0],
            (match) => `<!---lnkchkr-deadlink-${data.status}-->${match}`
          );
      }
    } catch (err) {
      console.log(err);
    }
  }

  async checkLinks() {
    console.log(`\n⏳ Analyzing ${chalk.green(this.path)}`);
    for (const link of this.links) {
      await this.#checkLink(link);
    }
    console.log(`✔️ ${chalk.green(this.path)} analyzed.`);
    if (this.deadLinks.deadLinks.length === 0)
      console.log(`🎉 No dead link found in file ${chalk.green(this.path)}!`);

    if (this.mark && this.deadLinks.deadLinks.length > 0)
      writeFileSync(this.path, this.content);
    return this.deadLinks;
  }
}

export default File;
