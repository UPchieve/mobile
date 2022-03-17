interface School {
    _id: string,
    upchieveId: string,
    name: string,
    districtName: string,
    city: string,
    state: string,
}

interface CheckEligibilityRequest {
    schoolUpchieveId: string,
    email: string,
    zipCode: string,
    referredByCode?: string,
    currentGrade?: string
}

interface StudentPartnerManifest {
    name: string,
    signupCode: string,
    studentPartnerOrg: string,
    highSchoolSignup: boolean,
    schoolSignupRequired: boolean,
    collegeSignup: boolean,
}