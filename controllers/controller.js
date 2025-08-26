const { User, Doctor, Symptom, Medicine, Appointment, Prescription, Patient } = require(`../models`);
const ejs = require(`ejs`)
const path = require(`path`);

class Controller {
  

  static async landingPage(req, res) {
    try {
      res.redirect(`/user/login`);
    } catch (error) {
      // console.log(error)
      res.send(error);
    }
  }

  static async home(req, res) {
    try {
      const {UserId} = req.params
      const user = await User.findByPk(UserId)
      
      res.render(`home`, {user});
    } catch (error) {
      // console.log(error)
      res.send(error);
    }
  }

  static async doctorPage(req, res) {
    try {
      const {UserId} = req.params
      
      const user = await User.findByPk(UserId, {include: Doctor, where:{UserId: UserId} })
      const appointments = await Appointment.findAll({where:{DoctorId: user.Doctor.id}, include:[{model: Patient, include:User}, {model:Symptom}]})

      res.render(`doctorHome`, {user, appointments});
    } catch (error) {
      res.send(error);
    }
  }

  static async getDoctorProfile(req, res) {
    try {
      const {UserId} = req.params
      
      const user = await User.findByPk(UserId)
      res.render(`doctorProfile`, {user});
    } catch (error) {
      res.send(error);
    }
  }

  static async postDoctorProfile(req, res) {
    try {
      const {UserId} = req.params
      const {name, specialization, licenseNumber} = req.body
      
      await User.update({name}, {where: {id: UserId}})
      
      const doctor = await Doctor.findByPk(1)
      await doctor.update({specialization, licenseNumber, UserId:UserId})
      res.redirect(`/doctor/${UserId}`);
    } catch (error) {
      console.log(error)
      res.send(error);
    }
  }
  static async getPrescription(req, res) {
    try {
      const {UserId, AppointmentId} = req.params
      const medicines = await Medicine.findAll()
      const appointment = await Appointment.findAppointment(AppointmentId)
      const user = await User.findByPk(UserId)
      res.render(`prescriptionForm`, {user, medicines, appointment});
    } catch (error) {
      console.log(error)
      res.send(error);
    }
  }

  static async downloadPrescription(req, res) {
    try {
      const {UserId, AppointmentId, PrescriptionId} = req.params
      const {generatePDF} = await import(`pdf-node`)
      const user = await User.findByPk(UserId)
      const pdfPath = `../public/output.pdf`
      const appointment = await Appointment.findAppointment(AppointmentId)
      const prescription = await Prescription.findByPk(PrescriptionId, {include:Medicine})
      const html = await ejs.renderFile(path.join(__dirname, `../views/output.ejs`),{ prescription, user, appointment})
      const options = { format: "A4", orientation: "portrait", border: "10mm" };
      const document = {html, path: path.join(__dirname, pdfPath), type:'pdf', data: { prescription, user, appointment}}
      await generatePDF(document, options)
      res.download(path.join(__dirname, pdfPath));
    } catch (error) {
      console.log(error)
      res.status(500).send("Error Generating PDF");
    }
  }

  static async postPrescription(req, res) {
    try {
      const {UserId, AppointmentId} = req.params
      const {instruction, MedicineId} = req.body
      const prescription = await Prescription.create({AppointmentId, instruction})
      await prescription.addMedicine(MedicineId)
      
      
      res.redirect(`/doctor/${UserId}`);
    } catch (error) {
      console.log(error)
      res.send(error);
    }
  }

   static async getMedicines(req, res) {
    try {
      const symptoms = await Symptom.findAll()
      const medicines = await Medicine.findAll()
      res.render(`medicines`, {medicines, symptoms});
    } catch (error) {
      console.log(error)
      res.send(error);
    }
  }

  static async approveAppointment(req, res) {
    try {
      const {UserId, AppointmentId} = req.params
      // console.log(UserId)
      const appointment = await Appointment.findAppointment(AppointmentId)
      console.log(appointment)
      await appointment.update({status: true})
      res.redirect(`/doctor/${UserId}`);
    } catch (error) {
      res.send(error);
    }
  }

  static async getNewAppointment(req, res) {
    try {
      const {UserId} = req.params
      // console.log(UserId)
      const user = await User.findByPk(UserId)
      const symptoms = await Symptom.findAll()
      const doctors = await Doctor.findAll({include:User})
      // console.log(doctors[0].User.name)
      res.render(`addAppointment`, {user, symptoms, doctors});
    } catch (error) {
      res.send(error);
    }
  }

  static async postNewAppointment(req, res) {
    try {
      const {UserId} = req.params
      const {DoctorId, SymptomId, scheduledAt, notes} = req.body
      // console.log(req.params)
      const patient = await Patient.findOne({where:{UserId: UserId}})
      const status = false
      const appointment = await Appointment.create({PatientId: patient.id, DoctorId, scheduledAt, notes, status})
      await appointment.addSymptoms(SymptomId)
      res.redirect(`/patient/${UserId}`);
    } catch (error) {
      console.log(error)
      res.send(error);
    }
  }

  static async appointmentList(req, res) {
    try {
      const {UserId} = req.params
      // console.log(UserId)
      const user = await User.findByPk(UserId)
      const patient = await Patient.findOne({where:{UserId: UserId}, include:User})
      const appointment = await Appointment.findAll({where:{PatientId: patient.id}, include:[{model: Symptom}, {model: Doctor, include:User}, {model:Prescription}]})
      res.render(`appointmentList`, {user, appointment, patient});
    } catch (error) {
      res.send(error);
    }
  }
  
}

module.exports = Controller;
