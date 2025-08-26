const bcrypt = require(`bcryptjs`);

const licenseNumberHook = (doctor) => {
  // console.log(doctor)
  let key = "";
  for (let i = 0; i < doctor.specialization.length; i++) {
    const element = doctor.specialization[i];
    if (i < 4) {
      key += element;
    } else {
      break;
    }
  }
  doctor.licenseNumber = `${key}-${doctor.licenseNumber}`;
};

const hashPassword = (user, option) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(user.password, salt);
  user.password = hash;
};




module.exports = { licenseNumberHook, hashPassword };
