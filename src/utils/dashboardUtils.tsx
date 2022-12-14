import { ImageIndex } from '../../assets/ImageIndex'
import { Topic } from '../interfaces/dashboardInterfaces'

export const topics: Topic[] = [
  {
    key: 'math',
    displayName: 'Math',
    image: ImageIndex.dashboard.subjects.math,
    subTopics: [
      { key: 'prealgebra', displayName: 'Pre-algebra', order: 1 },
      { key: 'algebraOne', displayName: 'Algebra 1', order: 2 },
      { key: 'algebraTwo', displayName: 'Algebra 2', order: 3 },
      { key: 'geometry', displayName: 'Geometry', order: 4 },
      { key: 'trigonometry', displayName: 'Trigonometry', order: 5 },
      { key: 'statistics', displayName: 'Statistics', order: 6 },
      { key: 'precalculus', displayName: 'Precalculus', order: 7 },
      { key: 'calculusAB', displayName: 'Calculus AB', order: 8 },
      // { key: 'calculusBC', displayName: 'Calculus BC', order: 9, },
      { key: 'integratedMathOne', displayName: 'Integrated Math 1', order: 10 },
      { key: 'integratedMathTwo', displayName: 'Integrated Math 2', order: 11 },
      {
        key: 'integratedMathThree',
        displayName: 'Integrated Math 3',
        order: 12,
      },
      {
        key: 'integratedMathFour',
        displayName: 'Integrated Math 4',
        order: 13,
      },
    ],
    order: 1,
  },
  {
    key: 'readingWriting',
    displayName: 'Reading and Writing',
    image: ImageIndex.dashboard.subjects.readWriting,
    subTopics: [
      { key: 'humanitiesEssays', displayName: 'Humanities Essays', order: 1 },
      { key: 'reading', displayName: 'Reading', order: 2 },
    ],
    order: 2,
  },
  {
    key: 'science',
    displayName: 'Science',
    image: ImageIndex.dashboard.subjects.science,
    subTopics: [
      { key: 'biology', displayName: 'Biology', order: 1 },
      { key: 'chemistry', displayName: 'Chemistry', order: 2 },
      { key: 'physicsOne', displayName: 'Physics 1', order: 3 },
      // { key: 'physicsTwo', displayName: 'Physics 2', order: 4, },
      {
        key: 'environmentalScience',
        displayName: 'Environmental Science',
        order: 5,
      },
    ],
    order: 3,
  },
  {
    key: 'socialStudies',
    displayName: 'Social Studies',
    image: ImageIndex.dashboard.subjects.socialStudies,
    subTopics: [{ key: 'usHistory', displayName: 'U.S. History', order: 1 }],
    order: 4,
  },
  {
    key: 'college',
    displayName: 'College Counseling',
    image: ImageIndex.dashboard.subjects.college,
    subTopics: [
      { key: 'planning', displayName: 'Planning', order: 1 },
      { key: 'essays', displayName: 'College Essays', order: 2 },
      { key: 'applications', displayName: 'Applications', order: 3 },
    ],
    order: 5,
  },
  {
    key: 'sat',
    displayName: 'Standardized Testing',
    image: ImageIndex.dashboard.subjects.sat,
    subTopics: [
      { key: 'satMath', displayName: 'SAT Math', order: 1 },
      { key: 'satReading', displayName: 'SAT Reading', order: 2 },
    ],
    order: 6,
  },
  // training: {
  //   subtopics: {
  //     upchieve101: { displayName: 'UPchieve 101' },
  //     tutoringSkills: { displayName: 'Tutoring Skills' },
  //     collegeSkills: { displayName: 'College Counseling Skills' }
  //   },
  //   displayName: 'UPchieve Training'
  // }
]
