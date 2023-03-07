import 'dotenv/config';
import { getObjectDiff } from '@donedeal0/superdiff';
import yargsParser from 'yargs-parser';

import fs from 'node:fs/promises';
import { join } from 'node:path';
import { inspect } from 'node:util';

import R6API from '../src';
import { insertToFile, isPathExists, styleContent } from './utils';

/**
 * yarn methods [...method names] --force
 */
(async () => {
  const { email, password } = process.env;
  const { email2, password2 } = process.env;

  const r6api = new R6API({ email, password });
  const r6api2 = new R6API({
    email: email2,
    password: password2,
    ubiAppId: 'e3d5ea9e-50bd-43b7-88bf-39794f4e3d40'
  });

  const platform = 'uplay';
  const usernames = ['Daniel.Nt'];
  const profileIds = ['0b95544b-0228-49a7-b338-6d15cfbc3d6a'];

  const argv = yargsParser(process.argv.slice(2));

  const selectedMethods = argv._.length ? argv._ : null;

  const methods = await Promise.all(
    [
      {
        name: 'findUserByUsername',
        output: r6api
          .findUserByUsername({ platform, usernames })
          .catch(console.error)
      },
      {
        name: 'findUserById',
        output: r6api
          .findUserById({ platform, ids: profileIds })
          .catch(console.error)
      },
      {
        name: 'getUserProgression',
        output: r6api
          .getUserProgression({ platform, profileIds })
          .catch(console.error)
      },
      {
        name: 'getUserSeasonal',
        output: r6api
          .getUserSeasonal({ platform: 'crossplay', profileIds })
          .catch(console.error)
      },
      {
        name: 'getUserSeasonalv2',
        output: r6api2.getUserSeasonalv2({ profileIds }).catch(console.error)
      },
      {
        name: 'getUserStats',
        output: r6api
          .getUserStats({
            platform: 'uplay',
            profileId: '0b95544b-0228-49a7-b338-6d15cfbc3d6a',
            view: 'seasonal',
            aggregation: 'summary',
            gameModes: ['ranked'],
            teamRoles: ['all'],
            seasonsId: [25]
          })
          .catch(console.error)
      },
      {
        name: 'getUserStatus',
        output: r6api
          .getUserStatus({ userIds: profileIds })
          .catch(console.error)
      },
      {
        name: 'getUserApplications',
        output: r6api.getUserApplications({ profileIds }).catch(console.error)
      },
      {
        name: 'getUserGamesPlayed',
        output: r6api.getUserGamesPlayed({ profileIds }).catch(console.error)
      },
      {
        name: 'getApplications',
        output: r6api
          .getApplications({
            applicationIds: ['f68a4bb5-608a-4ff2-8123-be8ef797e0a6']
          })
          .catch(console.error)
      },
      {
        name: 'getServiceStatus',
        output: r6api.getServiceStatus().catch(console.error)
      },
      {
        name: 'getNews',
        output: r6api.getNews({ limit: 1 }).catch(console.error)
      },
      {
        name: 'getNewsById',
        output: r6api
          .getNewsById({ id: '26Ar2mQAv7zwB6MN61HVPt' })
          .catch(console.error)
      }
    ]
      .filter(method =>
        selectedMethods ? selectedMethods.includes(method.name) : method
      )
      .map(async ({ name, output }) => ({ name, output: await output }))
  );

  const getDocsMethodPath = (name: string) =>
    join(__dirname, `../docs/methods/${name}.json`);

  const getDocsMethodFile = async (name: string) => {
    if (!(await isPathExists(getDocsMethodPath(name))))
      await fs.writeFile(getDocsMethodPath(name), '[]');
    return await fs.readFile(getDocsMethodPath(name), 'utf8');
  };

  const isObject = (maybeObject: unknown) =>
    maybeObject instanceof Object && maybeObject.constructor === Object;

  const structureChange = (prev: unknown, next: unknown) => {
    const bothAreArray = Array.isArray(prev) && Array.isArray(next);
    const bothAreObject = isObject(prev) && isObject(next);
    if (!bothAreArray && !bothAreObject) return true;

    type DiffStatus = 'added' | 'equal' | 'moved' | 'deleted' | 'updated';

    interface ObjectDiff {
      status: DiffStatus;
      subPropertiesDiff?: ObjectDiff[];
      subDiff?: ObjectDiff[];
    }

    const diffHasStatuses = (
      objects: ObjectDiff[],
      statuses: DiffStatus[]
    ): boolean => {
      for (const object of objects) {
        if (statuses.includes(object.status)) return true;
        if (object.subPropertiesDiff)
          return diffHasStatuses(object.subPropertiesDiff, statuses);
        else if (object.subDiff)
          return diffHasStatuses(object.subDiff, statuses);
      }
      return false;
    };

    // NOTE: comparing first item in array if prev and next array typeof array
    return diffHasStatuses(
      getObjectDiff(
        (bothAreArray ? prev[0] : prev) as Record<string, unknown>,
        (bothAreArray ? next[0] : next) as Record<string, unknown>
      ).diff,
      ['added', 'deleted']
    );
  };

  for (const { name, output } of methods) {
    const prevOutput = await getDocsMethodFile(name);

    const namePad = name.padEnd(
      Math.max(...methods.map(method => method.name.length))
    );

    if (!output) {
      console.log(`${namePad} : No output`);
      return;
    }

    if (structureChange(JSON.parse(prevOutput), output) || argv['force']) {
      console.log(
        `${namePad} : ${
          argv['force'] ? 'Running with force' : 'Structual change detected'
        }`
      );

      await fs.writeFile(
        getDocsMethodPath(name),
        JSON.stringify(output, (_, value) => (value as unknown) ?? null, 2)
      );

      await insertToFile({
        filePath: join(__dirname, '../readme.md'),
        sectionName: `${name.toUpperCase()}_OUTPUT`,
        content: styleContent({
          content: inspect(output, { depth: Infinity }),
          style: 'hiddenCodeBlock',
          hiddenCodeBlockSummary: 'Output',
          codeBlockLang: 'ts'
        }),
        prefix: '\n\n',
        suffix: '\n\n'
      });
    } else console.log(`${namePad} : No structual change detected`);
  }
})();
