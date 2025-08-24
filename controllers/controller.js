const { dateFormat } = require("../helpers/helper");
const { User, Doctor, Symptom, Medicine, Appointment, Prescription, Patient, AppointmentSymptom, PrescriptionMedicine } = require(`../models`);

class Controller {
  

  static async home(req, res) {
    try {
      // console.log(req.params)
      const {userid} = req.params
      // console.log(userid)
      const user = await User.findByPk(userid)
      // console.log(user)
      res.render(`home`, {user});
    } catch (error) {
      // console.log(error)
      res.send(error);
    }
  }

  static async doctorPage(req, res) {
    try {
      const {userid} = req.params
      // console.log(userid)
      const user = await User.findByPk(userid)
      res.render(`doctorHome`, {user});
    } catch (error) {
      res.send(error);
    }
  }

  static async getDoctorProfile(req, res) {
    try {
      const {userid} = req.params
      // console.log(userid)
      const user = await User.findByPk(userid)
      res.render(`doctorProfile`, {user});
    } catch (error) {
      res.send(error);
    }
  }

  static async postDoctorProfile(req, res) {
    try {
      const {userid} = req.params
      const {name, specialization, licenseNumber} = req.body
      // console.log(req.body)
      await User.update({name}, {where: {id: userid}})
      // console.log(userid)
      const doctor = await Doctor.findByPk(1)
      await doctor.update({specialization, licenseNumber, UserId:userid})
      res.redirect(`/doctor/${userid}`);
    } catch (error) {
      console.log(error)
      res.send(error);
    }
  }

  static async getNewAppointment(req, res) {
    try {
      const {userid} = req.params
      // console.log(userid)
      const user = await User.findByPk(userid)
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
      const {userid} = req.params
      const {DoctorId, SymptomId, scheduledAt, notes} = req.body
      // console.log(req.params)
      const patient = await Patient.findOne({where:{UserId: userid}})
      const status = false
      const appointment = await Appointment.create({PatientId: patient.id, DoctorId, scheduledAt, notes, status})
      await appointment.addSymptoms(SymptomId)
      res.redirect(`/patient/${userid}`);
    } catch (error) {
      console.log(error)
      res.send(error);
    }
  }

  static async appointmentList(req, res) {
    try {
      const {userid} = req.params
      // console.log(userid)
      const user = await User.findByPk(userid)
      const patient = await Patient.findOne({where:{UserId: userid}, include:User})
      const appointment = await Appointment.findAll({where:{PatientId: patient.id}, include:[{model: Symptom}, {model: Doctor, include:User}]})
      // console.log(appointment[0].Symptoms)
      // console.log(appointment[0].Doctor.User)
      res.render(`appointmentList`, {user, appointment, patient});
    } catch (error) {
      res.send(error);
    }
  }
  
}

module.exports = Controller;
