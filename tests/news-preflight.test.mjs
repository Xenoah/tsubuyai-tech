import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const workflow = readFileSync(new URL('../.github/workflows/news-preflight.yml', import.meta.url), 'utf8');

test('preflight starts on working-branch creation and pushes before a PR exists', () => {
  assert.match(workflow, /^  create:\s*$/m);
  assert.match(workflow, /  push:\n    branches:\n      - 'news\/\*\*'\n      - 'maintenance\/\*\*'\n/);
  assert.match(workflow, /startsWith\(github\.ref, 'refs\/heads\/news\/'\)/);
  assert.match(workflow, /startsWith\(github\.ref, 'refs\/heads\/maintenance\/'\)/);
  assert.doesNotMatch(workflow, /^  (?:pull_request_target|schedule):/m);
});

test('preflight checks out and identifies the immutable event commit', () => {
  assert.match(workflow, /ref: \$\{\{ github\.sha \}\}/);
  assert.match(workflow, /persist-credentials: false/);
  assert.match(workflow, /test "\$\(git rev-parse HEAD\)" = "\$GITHUB_SHA"/);
  assert.match(workflow, /group: news-preflight-\$\{\{ github\.ref \}\}/);
  assert.match(workflow, /timeout-minutes: 10/);
});

test('preflight retains the brief, test and build gates without bypasses', () => {
  assert.match(workflow, /node-version: '22'/);
  const commands = [...workflow.matchAll(/^        run: (.+)$/gm)].map(match => match[1]);
  assert.deepEqual(commands, ['|', 'npm run brief -- all', 'npm test', 'npm run build', 'cat dist/manifest.json']);
  assert.doesNotMatch(workflow, /continue-on-error|\|\|\s*true|--ignore-scripts/);
});

test('preflight has no publication or repository-write capability', () => {
  const permissions = workflow.match(/^permissions:\n((?:  [^\n]+\n)+)/m)?.[1];
  assert.equal(permissions, '  contents: read\n');
  const jobs = workflow.split(/^jobs:\n/m)[1];
  assert.deepEqual([...jobs.matchAll(/^  ([a-z][a-z-]*):$/gm)].map(match => match[1]), ['preflight']);
  assert.doesNotMatch(workflow, /secrets\.|id-token:|pages:|contents: write|write-all|deploy-pages|upload-pages-artifact|git push|gh pr merge/);
});
