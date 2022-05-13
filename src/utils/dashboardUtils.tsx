import { ImageIndex } from "../../assets/ImageIndex";
import { Topic } from "../interfaces/dashboardInterfaces";

export const topics: Topic[] = [
  {
    key: 'math',
    displayName: 'Math',
    image: ImageIndex.dashboard.subjects.math,
    subTopics: [
      { key: 'prealgebra', displayName: 'Pre-algebra' },
      { key: 'algebraOne', displayName: 'Algebra 1' },
      { key: 'algebraTwo', displayName: 'Algebra 2' },
      { key: 'geometry', displayName: 'Geometry' },
      { key: 'trigonometry', displayName: 'Trigonometry' },
      { key: 'statistics', displayName: 'Statistics' },
      { key: 'precalculus', displayName: 'Precalculus' },
      { key: 'calculusAB', displayName: 'Calculus AB' },
      { key: 'calculusBC', displayName: 'Calculus BC' },
      { key: 'integratedMathOne', displayName: 'Integrated Math 1' },
      { key: 'integratedMathTwo', displayName: 'Integrated Math 2' },
      { key: 'integratedMathThree', displayName: 'Integrated Math 3' },
      { key: 'integratedMathFour', displayName: 'Integrated Math 4' }
    ],
  },
  {
    key: 'science',
    displayName: 'Science',
    image: ImageIndex.dashboard.subjects.science,
    subTopics: [
      { key: 'biology', displayName: 'Biology' },
      { key: 'chemistry', displayName: 'Chemistry' },
      { key: 'physicsOne', displayName: 'Physics 1' },
      { key: 'physicsTwo', displayName: 'Physics 2' },
      { key: 'environmentalScience', displayName: 'Environmental Science' }
    ],
  },
  {
    key: 'readingWriting',
    displayName: 'Reading and Writing',
    image: ImageIndex.dashboard.subjects.readWriting,
    subTopics: [
      { key: 'humanitiesEssays', displayName: 'Humanities Essays' },
      { key: 'reading', displayName: 'Reading' }
    ],
  },
  {
    key: 'college',
    displayName: 'College Counseling',
    image: ImageIndex.dashboard.subjects.college,
    subTopics: [
      { key: 'planning', displayName: 'Planning' },
      { key: 'essays', displayName: 'College Essays' },
      { key: 'applications', displayName: 'Applications' }
    ],
  },
  {
    key: 'sat',
    displayName: 'Standardized Testing',
    image: ImageIndex.dashboard.subjects.sat,
    subTopics: [
      { key: 'satMath', displayName: 'SAT Math' },
      { key: 'satReading', displayName: 'SAT Reading' }
    ],
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