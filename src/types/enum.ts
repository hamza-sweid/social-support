export enum FormStepValue {
  PERSONAL_INFO = 'personalInfo',
  FAMILY_INFO = 'familyInfo',
  SITUATION_INFO = 'situationInfo',
}

export const FormSectionName: Record<FormStepValue, string> = {
  [FormStepValue.PERSONAL_INFO]: 'Personal Information',
  [FormStepValue.FAMILY_INFO]: 'Family Information',
  [FormStepValue.SITUATION_INFO]: 'Situation Information',
};
