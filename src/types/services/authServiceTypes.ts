export interface CreateAccountRequest {
    email: string,
    password: string,
    highSchoolId: string,
    zipCode: string,
    firstName: string,
    lastName: string,
    currentGrade: string,
}

export interface CreateAccountResponse {
    _id: string,
    zipCode: string,
    currentGrade: string,
    inGatesStudy: boolean,
    email: string,
    password: string,
    verified: boolean,
    verifiedEmail: boolean,
    verifiedPhone: boolean,
    firstname: string,
    lastname: string,
    isVolunteer: boolean,
    isAdmin: boolean,
    isBanned: boolean,
    isTestUser: boolean,
    isFakeUser: boolean,
    isDeactivated: boolean,
    type: string,
    createdAt: string,
    lastActivityAt: string,
    referralCode: string,
}

export type VerificationMethod = 'email' | 'sms';

export interface SendValidationRequest {
    _id: string,
    firstName: string,
    sendTo: string,
    verificationMethod: VerificationMethod,
}

export interface ConfirmValidationRequest {
    userId: string,
    sendTo: string,
    verificationMethod: VerificationMethod,
    verificationCode: string,
}

export interface CreateAccountWithWithPartnerRequest {
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    terms: boolean,
    college: string,
    highSchoolId?: string,
    studentPartnerOrg: string,
    // "partnerUserId": "string",
    // "partnerSite": "string",
}