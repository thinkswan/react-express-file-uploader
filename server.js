const express = require("express")
const fileUpload = require("express-fileupload")

const app = express()

app.use(fileUpload())

// Upload endpoint
app.post("/upload", (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ message: "No file uploaded " })
  }

  const file = req.files.file
  file.mv(`${__dirname}/client/public/uploads/${file.name}`, err => {
    console.error(err)

    return res.status(500).send(err)
  })

  return res.json({ fileName: file.name, filePath: `/uploads/${file.name}` })
})

app.listen(5000, () => console.log("Server running on port 5000..."))
