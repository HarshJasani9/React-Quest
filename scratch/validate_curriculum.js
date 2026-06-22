import { lessons, modules } from '../src/content/contentRegistry.js';

console.log('=== React-Quest Curriculum Validator ===');
console.log(`Loaded ${modules.length} modules.`);
console.log(`Loaded ${Object.keys(lessons).length} registered lessons.`);

// Collect all lesson IDs from modules
const moduleLessonIds = modules.reduce((acc, mod) => {
  return [...acc, ...(mod.lessonIds || [])];
}, []);

console.log(`Found ${moduleLessonIds.length} lesson IDs declared in module indices.`);

// Check for mismatches
const missingInLessons = moduleLessonIds.filter(id => !lessons[id]);
const untrackedInModules = Object.keys(lessons).filter(id => !moduleLessonIds.includes(id));

if (missingInLessons.length > 0) {
  console.error('❌ ERROR: The following lesson IDs are in modules but missing in registry:', missingInLessons);
  process.exit(1);
} else {
  console.log('✅ All module-declared lessons exist in the registry.');
}

if (untrackedInModules.length > 0) {
  console.warn('⚠️ WARNING: The following lessons are in registry but untracked in modules:', untrackedInModules);
}

// Prerequisite verification helper
function getLessonById(id) {
  return lessons[id] || null;
}

// 1. Verify all prerequisites exist
let brokenPrereqs = 0;
Object.entries(lessons).forEach(([id, lesson]) => {
  if (lesson.prerequisites) {
    lesson.prerequisites.forEach(prereqId => {
      if (!lessons[prereqId]) {
        console.error(`❌ ERROR: Lesson ${id} has non-existent prerequisite: ${prereqId}`);
        brokenPrereqs++;
      }
    });
  }
});

if (brokenPrereqs === 0) {
  console.log('✅ All declared prerequisites exist in the lesson registry.');
} else {
  process.exit(1);
}

// 2. Perform a simulated step-by-step play-through of the entire curriculum
console.log('\n=== Simulating Play-through QA Pass ===');
const completedLessons = new Set();

function isUnlocked(lesson) {
  if (!lesson) return false;
  if (!lesson.prerequisites || lesson.prerequisites.length === 0) {
    return true;
  }
  return lesson.prerequisites.every(prereqId => {
    // If prerequisite is not registered/authored, treat it as completed (matching app behavior)
    const isAuthored = lessons[prereqId] !== undefined;
    if (!isAuthored) return true;
    return completedLessons.has(prereqId);
  });
}

let currentLockIndex = 0;
let progressSucceeded = true;

for (let i = 0; i < moduleLessonIds.length; i++) {
  const lessonId = moduleLessonIds[i];
  const lesson = lessons[lessonId];
  
  if (!lesson) {
    console.error(`❌ ERROR: Lesson data for ${lessonId} is missing.`);
    progressSucceeded = false;
    break;
  }

  // Check if this lesson is unlocked based on our current progress
  const unlocked = isUnlocked(lesson);
  if (!unlocked) {
    console.error(`❌ ERROR: Lesson ${lessonId} ("${lesson.title}") is LOCKED but should be unlocked!`);
    console.error(`Pending prerequisites:`, lesson.prerequisites.filter(p => !completedLessons.has(p)));
    progressSucceeded = false;
    break;
  }

  console.log(`[Play-through] Completed: ${lessonId} - ${lesson.title}`);
  
  // Mark this lesson as completed
  completedLessons.add(lessonId);
}

if (progressSucceeded && completedLessons.size === moduleLessonIds.length) {
  console.log(`\n🎉 SUCCESS: Sim-QA pass of all ${completedLessons.size} lessons completed successfully!`);
  console.log('No lock loops or deadlocks found in prerequisite declarations.');
} else {
  console.error('\n❌ FAILED: Curriculum flow validation failed.');
  process.exit(1);
}
