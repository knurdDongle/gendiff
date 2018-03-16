import { readFileSync } from 'fs';
import { trimEnd } from 'lodash';
import getDiff from '../src';

const pathTo = filename => `${__dirname}/__fixtures__/ini_tests/${filename}`;

test('hexletNested', () => {
  const expected = readFileSync(pathTo('hexletNested_json_expected'), 'utf-8');
  expect(getDiff(pathTo('hexletNested_before.ini'), pathTo('hexletNested_after.ini'))).toBe(expected);
});

test('all', () => {
  const expected = readFileSync(pathTo('all_json_expected'), 'utf-8');
  expect(getDiff(pathTo('all_before.ini'), pathTo('all_after.ini'))).toBe(expected);
});

test('hexletNested_plain', () => {
  const expected = trimEnd(readFileSync(pathTo('hexletNested_plain_expected'), 'utf-8'));
  expect(getDiff(pathTo('hexletNested_before.ini'), pathTo('hexletNested_after.ini'), 'plain')).toBe(expected);
});

test('all_plain', () => {
  const expected = trimEnd(readFileSync(pathTo('all_plain_expected'), 'utf-8'));
  expect(getDiff(pathTo('all_before.ini'), pathTo('all_after.ini'), 'plain')).toBe(expected);
});
