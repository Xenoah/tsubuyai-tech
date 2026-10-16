import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { setTimeout as sleep } from 'node:timers/promises';

export const files = Object.freeze(['manifest.json', 'feed.json', 'bootstrap.js']);
const base = 'https://xenoah.github.io/tsubuyai-tech/';
const maxBytes = 1024 * 1024;

export async function readLiveFile(name, fetcher = globalThis.fetch) {
  assert.ok(files.includes(name), 'Unexpected Pages file');
  const response = await fetcher(new URL(name, base), {
    method: 'GET', redirect: 'error', credentials: 'omit', cache: 'no-store',
    signal: AbortSignal.timeout(15000),
  });
  if (response.status !== 200) throw new Error(`${name}: HTTP ${response.status}`);
  if (!response.body) throw new Error(`${name}: empty response body`);
  const chunks = [];
  let length = 0;
  for await (const chunk of response.body) {
    length += chunk.byteLength;
    if (length > maxBytes) throw new Error(`${name}: response exceeds 1 MiB`);
    chunks.push(Buffer.from(chunk));
  }
  return Buffer.concat(chunks);
}

export function compareFiles(expected, actual) {
  for (const name of files) {
    assert.ok(Buffer.isBuffer(expected[name]) && Buffer.isBuffer(actual[name]), `${name}: missing bytes`);
    if (!expected[name].equals(actual[name])) throw new Error(`${name}: deployed bytes differ from the checked-out build`);
  }
  const manifest = JSON.parse(actual['manifest.json']);
  const feed = JSON.parse(actual['feed.json']);
  assert.equal(manifest.version, feed.version, 'Manifest/feed version mismatch');
  assert.equal(manifest.postCount, feed.posts.length, 'Post count mismatch');
  return { version: manifest.version, postCount: manifest.postCount,
    sha256: Object.fromEntries(files.map(name => [name, createHash('sha256').update(actual[name]).digest('hex')])) };
}

export async function verifyPages(expected, { fetcher = globalThis.fetch, attempts = 6,
  delayMs = 10000, sleepFn = sleep, log = console.log } = {}) {
  assert.ok(Number.isInteger(attempts) && attempts >= 1 && attempts <= 12, 'Invalid retry limit');
  let lastError;
  for (let attempt = 1; attempt <= attempts; attempt++) {
    try {
      const actual = Object.fromEntries(await Promise.all(files.map(async name => [name, await readLiveFile(name, fetcher)])));
      const result = compareFiles(expected, actual);
      log(`Pages verified at normal URLs: ${JSON.stringify(result)}`);
      return result;
    } catch (error) {
      lastError = error;
      log(`Pages verification attempt ${attempt}/${attempts}: ${error.message}`);
      if (attempt < attempts) await sleepFn(delayMs);
    }
  }
  throw new Error(`Pages verification failed: ${lastError.message}`, { cause: lastError });
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const expected = Object.fromEntries(await Promise.all(files.map(async name => [name,
      await readFile(new URL(`../dist/${name}`, import.meta.url))])));
    await verifyPages(expected);
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
