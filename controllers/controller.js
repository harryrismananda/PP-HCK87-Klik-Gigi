class Controller {
  
static async home (req,res) {
  try {
    res.send(`Udah masuk`)
    
  } catch (error) {
    res.send(error)
  }
}


}

module.exports = Controller