import { lessons } from '../src/content/contentRegistry.js';

const allTerms = new Set();
const termToLessons = {};

Object.entries(lessons).forEach(([id, lesson]) => {
  if (lesson.glossaryTerms) {
    lesson.glossaryTerms.forEach(term => {
      allTerms.add(term);
      if (!termToLessons[term]) {
        termToLessons[term] = [];
      }
      termToLessons[term].push({ id, title: lesson.title });
    });
  }
});

console.log('Unique Terms:', Array.from(allTerms).sort());
console.log('Term to Lessons Mapping:', JSON.stringify(termToLessons, null, 2));
