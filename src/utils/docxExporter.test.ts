import test from 'node:test';
import assert from 'node:assert/strict';
import { createDocxFromText } from './docxExporter.ts';

test('createDocxFromText generates valid .docx blob with OpenXML mime type', async () => {
  const blob = await createDocxFromText('Document Title', 'Paragraph 1\nParagraph 2 & special characters < >');
  assert.ok(blob);
  assert.ok(blob.size > 0);
  assert.equal(blob.type, 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
});
