import genDiff from '../src/index.js';

test('gendiff', () => {
  expect(genDiff('__fixtures__/file1.json', '__fixtures__/file2.json')).toEqual(
    `{
- follow: false
  host: hexlet.io
- proxy: 123.234.53.22
- timeout: 50
+ timeout: 20
+ verbose: true
}`,
  );
  expect(genDiff('__fixtures__/file1.yaml', '__fixtures__/file2.yaml')).toEqual(
    `{
- follow: false
  host: hexlet.io
- proxy: 123.234.53.22
- timeout: 50
+ timeout: 20
+ verbose: true
}`,
  );
});
