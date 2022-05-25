const getAsString = (school: School) => {
  return `${school.name} (${school.city}, ${school.state})`
}

const GRADE_OPTIONS: SelectItem[] = [
  { label: '8th grade', value: '8th' },
  { label: '9th grade', value: '9th' },
  { label: '10th grade', value: '10th' },
  { label: '11th grade', value: '11th' },
  { label: '12th grade', value: '12th' },
  { label: 'College', value: 'College' },
  { label: 'Other', value: 'Other' },
]

export const schoolUtils = {
  getAsString,
}

export const gradesUtils = {
  GRADE_OPTIONS,
}
