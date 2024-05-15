const notFound = (req,res) =>{
  return res.status(404).send('404 not found')
}

module.exports = notFound;