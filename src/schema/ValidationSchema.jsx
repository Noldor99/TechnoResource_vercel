import * as yup from "yup";

const emailRegula =
  /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
const phoneRegula = /^[\+]{0,1}380([0-9]{9})$/;

const ValidationSchema = yup.object().shape({
  // nameInput: yup.string()
  //   // .required('Name is required')
  //   .max(60, 'the max is 60')
  //   .min(2, 'the min is 2'),
  email: yup
    .string()
    .matches(emailRegula, "Email must be a valid email address")
    .email("Email must be a valid email address")
    .required("Email is"),
  phone: yup
    .string()
    .matches(phoneRegula, "Invalid phone number")
    .required("Email is"),
  // position: yup.string()
  //   .required('Position is'),
  // photo: yup.mixed()
  //   .test('required', "You need to provide a file", (value) =>{
  //     return value && value.length
  //   } )
  //   .test("fileSize", "The file is too large", (value, context) => {
  //     return value && value[0] && value[0].size <= 5100000;
  //   })
  //   .test("type", "We only support jpeg", function (value) {
  //     return value && value[0] && value[0].type === "image/jpeg";
  //   }),
});

export default ValidationSchema;
