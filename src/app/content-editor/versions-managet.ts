import { Schema } from 'prosemirror-model';
import { Version } from './version.interface';
import { Step } from 'prosemirror-transform';

export class VersionsMananger<T extends Schema> {
  versions: Version<T>[];
  onNewSteps: any[];

  constructor() {
    this.versions = [];
    this.onNewSteps = [];
  }

  receiveSteps(version: number, steps: Step[], clientIDs: (string | number)[], propagateSteps = true, checkVersion = false) {
    if (checkVersion && !this.versions[version - 1]) {
      return;
    }

    this.versions[version] = {
      steps,
      clientIDs
    };

    if (propagateSteps) {
      // Signal listeners
      this.onNewSteps.forEach((f) => { f(); });
    }
  }

  stepsSince(version: number) {
    const versions: Version<T>[] = [];
    for (let index = version; index < this.versions.length; index++) {
      const versionInfo = this.versions[index];
      versions.push(versionInfo);
    }
    return versions;
  }

  receiveSnapshot(version, versions: Version<T>[]) {
    if (version === this.versions.length) {
      return;
    }
    const newVersions = versions.slice(this.versions.length);
    const indexStart = this.versions.length;
    newVersions.forEach((ver, index) => {
      this.receiveSteps(indexStart + index, ver.steps, ver.clientIDs, true, false);
    });
  }

  getVersions() {
    return new Array(this.versions.length).fill(0).map((_, index) => ({...this.versions[index]}));
  }
}

