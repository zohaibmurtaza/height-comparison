export const getAnonymouseAvatar = (height: number, gender: string) => {
  const upperCaseGender = gender.toUpperCase();
  if (height <= 86) {
    return `/images/persons/anonymous/0cm_to_86cm_MALE.svg`;
  } else if (height <= 108) {
    return `/images/persons/anonymous/87cm_to_108cm_${upperCaseGender}.svg`;
  } else if (height <= 138) {
    return `/images/persons/anonymous/109cm_to_138cm_${upperCaseGender}.svg`;
  } else if (height <= 156) {
    return `/images/persons/anonymous/139cm_to_156cm_${upperCaseGender}.svg`;
  } else {
    return `/images/persons/anonymous/167cm_and_above_${upperCaseGender}.svg`;
  }
};
