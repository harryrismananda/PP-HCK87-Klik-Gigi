const {
  User,
  Doctor,
  Symptom,
  Medicine,
  Appointment,
  Prescription,
  Patient,
} = require(`../models`);
const ejs = require(`ejs`);
const path = require(`path`);
const { Op } = require("sequelize");

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
      const { UserId } = req.params;
      const user = await User.findByPk(UserId);
      const patient = await Patient.findOne({
        where: { UserId: UserId },
        include: User,
      });
      const appointment = await Appointment.findAll({
        where: { PatientId: patient.id },
        include: [
          { model: Symptom },
          { model: Doctor, include: User },
          { model: Prescription },
        ],
        order :[[`id`, `ASC`]]
      });
      

      res.render(`home`, { user, appointment, patient });
    } catch (error) {
      // console.log(error)
      res.send(error);
    }
  }

  static async doctorPage(req, res) {
    try {
      const { UserId } = req.params;
      const { msg, search } = req.query;
      const user = await User.findByPk(UserId, {
        include: Doctor});
    


      const options = {
        where: { DoctorId: user.Doctor.id },
        include: [
          { model: Patient, include:[ { model: User, where: search ? { name: { [Op.iLike]: `%${search}%` } } : undefined, required: search ? true : false }],  required: search ? true : false },
          { model: Symptom },
          
        ],
      };
      if (search) {
        options.include[0].include[0].where = {
          name: { [Op.iLike]: `%${search}%` },
        };
       
      }
      const appointments = await Appointment.findAll(options);
      
      res.render(`doctorHome`, { user, appointments, msg });
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }

  static async getDoctorProfile(req, res) {
    try {
      const { UserId } = req.params;
      const {error} = req.query
      const user = await User.findByPk(UserId, { include: Doctor });
      res.render(`doctorProfile`, { user, error });
    } catch (error) {
      res.send(error);
    }
  }

  static async postDoctorProfile(req, res) {
    try {
      const { UserId } = req.params;
      const { name, specialization, licenseNumber } = req.body;

      await User.update({ name }, { where: { id: UserId } });

      const doctor = await Doctor.findOne({ where: { UserId } });
      await doctor.update({ specialization, licenseNumber });
      res.redirect(`/doctor/${UserId}`);
    } catch (error) {
       if (error.name === "SequelizeValidationError") {
        const { UserId } = req.params;
        const err = Doctor.validation(error.errors)
        res.redirect(`/patient/${UserId}/profile?error=${err}`)
      }
      
      res.send(error);
    }
  }

  static async getPatientProfile(req, res) {
    try {
      const { UserId } = req.params;
      const {error} = req.query
      const user = await User.findByPk(UserId, { include: Patient });
      res.render(`patientProfile`, { user, error });
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }

  static async postPatientProfile(req, res) {
    try {
      const { UserId } = req.params;
      const { name, gender, age, bloodType } = req.body;

      await User.update({ name }, { where: { id: UserId } });

      const patient = await Patient.findOne({ where: { UserId } });
      await patient.update({ gender, age, bloodType });
      res.redirect(`/patient/${UserId}`);
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        const { UserId } = req.params;
        const err = Patient.validation(error.errors)
        res.redirect(`/patient/${UserId}/profile?error=${err}`)
      }
      
      res.send(error);
    }
  }

  static async getPrescription(req, res) {
    try {
      const { UserId, AppointmentId } = req.params;
      const medicines = await Medicine.findAll();
      const appointment = await Appointment.findAppointment(AppointmentId);
      const user = await User.findByPk(UserId);
      res.render(`prescriptionForm`, { user, medicines, appointment });
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }

  static async downloadPrescription(req, res) {
    try {
      const { UserId, AppointmentId, PrescriptionId } = req.params;
      const { generatePDF } = await import(`pdf-node`);
      const user = await User.findByPk(UserId);
      const pdfPath = `../public/output.pdf`;
      const appointment = await Appointment.findAppointment(AppointmentId);
      const prescription = await Prescription.findByPk(PrescriptionId, {
        include: Medicine,
      });
      const html = await ejs.renderFile(
        path.join(__dirname, `../views/output.ejs`),
        { prescription, user, appointment }
      );
      const options = { format: "A4", orientation: "portrait", border: "10mm" };
      const document = {
        html,
        path: path.join(__dirname, pdfPath),
        type: "pdf",
        data: { prescription, user, appointment },
      };
      await generatePDF(document, options);
      res.download(path.join(__dirname, pdfPath));
    } catch (error) {
      console.log(error);
      res.status(500).send("Error Generating PDF");
    }
  }

  static async postPrescription(req, res) {
    try {
      const { UserId, AppointmentId } = req.params;
      const { instruction, MedicineId } = req.body;
      const prescription = await Prescription.create({
        AppointmentId,
        instruction,
      });
      await prescription.addMedicine(MedicineId);

      res.redirect(`/doctor/${UserId}`);
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }

  static async getMedicines(req, res) {
    try {
      const UserId = req.session.userId
      const symptoms = await Symptom.findAll();
      const medicines = await Medicine.findAll();
      res.render(`medicines`, { medicines, symptoms, UserId });
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }

  static async approveAppointment(req, res) {
    try {
      const { UserId, AppointmentId } = req.params;
      
      const appointment = await Appointment.findAppointment(AppointmentId);
      console.log(appointment);
      await appointment.update({ status: true });
      res.redirect(`/doctor/${UserId}`);
    } catch (error) {
      res.send(error);
    }
  }

  static async getNewAppointment(req, res) {
    try {
      const { UserId } = req.params;
      const {error} = req.query
 
      const user = await User.findByPk(UserId);
      const symptoms = await Symptom.findAll();
      const doctors = await Doctor.findAll({ include: User });

      res.render(`addAppointment`, { user, symptoms, doctors, error });
    } catch (error) {
      res.send(error);
    }
  }

  static async postNewAppointment(req, res) {
    try {
      const { UserId } = req.params;
      const { DoctorId, SymptomId, scheduledAt, notes } = req.body;

      const patient = await Patient.findOne({ where: { UserId: UserId } });
      const status = false;
      const appointment = await Appointment.create({
        PatientId: patient.id,
        DoctorId,
        scheduledAt,
        notes,
        status,
      });
      await appointment.addSymptoms(SymptomId);
      res.redirect(`/patient/${UserId}`);
    } catch (error) {
      
      if (error.name === "SequelizeValidationError") {
        const { UserId } = req.params;
        const err = Appointment.validation(error.errors)
        res.redirect(`/patient/${UserId}/NewAppointment?error=${err}`)
      }
      
      res.send(error);
    }
  }

  // static async appointmentList(req, res) {
  //   try {
  //     const { UserId } = req.params;
  //     // console.log(UserId)
  //     const user = await User.findByPk(UserId);
  //     const patient = await Patient.findOne({
  //       where: { UserId: UserId },
  //       include: User,
  //     });
  //     const appointment = await Appointment.findAll({
  //       where: { PatientId: patient.id },
  //       include: [
  //         { model: Symptom },
  //         { model: Doctor, include: User },
  //         { model: Prescription },
  //       ],
  //     });
  //     res.render(`appointmentList`, { user, appointment, patient });
  //   } catch (error) {
  //     res.send(error);
  //   }
  // }

  static async deleteAppointment(req, res) {
    try {
      const { UserId, AppointmentId } = req.params;
      const appointment = await Appointment.findAppointment(AppointmentId);
      await appointment.destroy();

      res.redirect(
        `/doctor/${UserId}/?msg=Appointment with ID: ${appointment.id} for patient: ${appointment.Patient.User.name} has been deleted`
      );
    } catch (error) {
      res.send(error);
    }
  }
}

module.exports = Controller;
