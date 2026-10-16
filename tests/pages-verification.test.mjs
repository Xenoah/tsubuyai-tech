import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { files, readLiveFile, compareFiles, verifyPages } from '../scripts/verify-pages.mjs';

const fixture = () => ({
  'manifest.json': Buffer.from('{"version":"test-version","postCount":1}'),
  'feed.json': Buffer.from('{"version":"test-version","posts":[{"id":"one"}]}'),
  'bootstrap.js': Buffer.from('window.TSUBUYAI_TECH_BOOT={"version":"test-version","posts":[{"id":"one"}]};'),
});

test('the exact three deployed files must match the checked-out build', () => {
  const expected = fixture();
  assert.equal(compareFiles(expected, fixture()).postCount, 1);
  for (const name of files) {
    assert.throws(() => compareFiles(expected, { ...fixture(), [name]: Buffer.from('stale') }), /deployed bytes differ/);
  }
  assert.throws(() => compareFiles(expected, { ...fixture(), 'feed.json': undefined }), /missing bytes/);
});

test('a matching but internally inconsistent manifest cannot pass', () => {
  const bad = { ...fixture(), 'manifest.json': Buffer.from('{"version":"wrong","postCount":1}') };
  assert.throws(() => compareFiles(bad, bad), /version mismatch/);
});

test('live requests use normal HTTPS URLs with no query or credentials', async () => {
  const expected = fixture();
  const fetcher = async (url, options) => {
    assert.equal(url.origin, 'https://xenoah.github.io');
    assert.equal(url.search, '');
    assert.equal(url.hash, '');
    assert.equal(options.method, 'GET');
    assert.equal(options.redirect, 'error');
    assert.equal(options.credentials, 'omit');
    assert.ok(options.signal instanceof AbortSignal);
    return new Response(expected[url.pathname.split('/').at(-1)]);
  };
  const result = await verifyPages(expected, { fetcher, attempts: 1, log: () => {} });
  assert.equal(result.version, 'test-version');
  assert.equal(Object.keys(result.sha256).length, 3);
  await assert.rejects(readLiveFile('../secrets', fetcher), /Unexpected Pages file/);
});

test('HTTP failures and oversized responses fail closed', async () => {
  await assert.rejects(readLiveFile('feed.json', async () => new Response('not found', { status: 404 })), /HTTP 404/);
  await assert.rejects(readLiveFile('feed.json', async () => new Response(new Uint8Array(1024 * 1024 + 1))), /exceeds 1 MiB/);
});

test('stale CDN responses are retried without changing the URL', async () => {
  const expected = fixture();
  let calls = 0, delays = 0;
  const fetcher = async url => new Response(++calls <= 3 ? 'stale' : expected[url.pathname.split('/').at(-1)]);
  const result = await verifyPages(expected, { fetcher, attempts: 2, delayMs: 0,
    sleepFn: async () => { delays++; }, log: () => {} });
  assert.equal(result.version, 'test-version');
  assert.equal(delays, 1);
  assert.equal(calls, 6);
});

test('exhausted retries are never reported as successful publication', async () => {
  await assert.rejects(verifyPages(fixture(), { fetcher: async () => new Response('wrong'),
    attempts: 2, sleepFn: async () => {}, log: () => {} }), /Pages verification failed/);
});

test('verification uses the successful main deployment SHA with read-only permissions', () => {
  const workflow = readFileSync(new URL('../.github/workflows/pages-verify.yml', import.meta.url), 'utf8');
  assert.match(workflow, /workflows: \['Validate and deploy Pages'\]/);
  assert.match(workflow, /head_branch == 'main'/);
  assert.match(workflow, /conclusion == 'success'/);
  assert.match(workflow, /workflow_run.event == 'push'/);
  assert.match(workflow, /head_repository.full_name == github.repository/);
  assert.match(workflow, /VERIFIED_COMMIT: \$\{\{ github.event.workflow_run.head_sha \|\| github.sha \}\}/);
  assert.match(workflow, /persist-credentials: false/);
  assert.match(workflow, /test "\$\(git rev-parse HEAD\)" = "\$VERIFIED_COMMIT"/);
  assert.doesNotMatch(workflow, /secrets\.|contents: write|write-all|id-token:|pages:|deploy-pages|git push/);
});
