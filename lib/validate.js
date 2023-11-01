export default function login_validate(values) {
  const errors = {};
  //   validation for email
  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  //   validation for password
  if (!values.password) {
    errors.password = "Required";
  } else if (values.password.length < 8 || values.password.length > 20) {
    errors.password = "Must be greater then 8 and less then 20 characters";
  } else if (values.password.includes(" ")) {
    errors.password = "Invalid Password";
  }
  return errors;
}

export function register_validate(values) {
  const errors = {};

  //   validation for username
  if (!values.username) {
    errors.username = "Required";
  } else if (values.username.length < 4 || values.username.length > 14) {
    errors.username = "Must be greater then 4 and less then 14 characters";
  }

  //   validation for email
  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  //   validation for password
  if (!values.password) {
    errors.password = "Required";
  } else if (values.password.length < 8 || values.password.length > 20) {
    errors.password = "Must be greater then 8 and less then 20 characters";
  } else if (values.password.includes(" ")) {
    errors.password = "Invalid Password";
  }

  //   validation for confirm password
  if (!values.cpassword) {
    errors.cpassword = "Required";
  } else if (values.password !== values.cpassword) {
    errors.cpassword = "Password Does Not Match!";
  } else if (values.cpassword.includes(" ")) {
    errors.cpassword = "Invalid Confirm password";
  }

  return errors;
}

export function add_pass_validate(values) {
  const errors = {};

  // validation for site name
  if (!values.site) {
    errors.site = "Required";
  }

  //   validation for username
  if (!values.username) {
    errors.username = "Required";
  }

  //   validation for email
  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  //   validation for password
  if (!values.password) {
    errors.password = "Required";
  }

  return errors;
}

export function add_note_validate(values) {
  const errors = {};

  // validation for note title
  if (!values.title) {
    errors.title = "Required";
  }

  // validation for note text
  if (!values.note) {
    errors.note = "Required";
  } else if (values.note.length < 10) {
    errors.note = "Too short";
  } else if (values.note.length >= 350) {
    errors.note = "Maximum limit reached (350 characters)";
  }

  return errors;
}
