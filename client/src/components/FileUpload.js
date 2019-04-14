import React, { Fragment, useState } from "react"
import Message from "./Message"
import ProgressBar from "./ProgressBar"
import axios from "axios"

const FileUpload = props => {
  const [file, setFile] = useState("")
  const [filename, setFilename] = useState("Choose file")
  const [uploadedFile, setUploadedFile] = useState({})
  const [message, setMessage] = useState("")
  const [uploadPercentage, setUploadPercentage] = useState(0)

  const onChange = e => {
    const fileObj = e.target.files[0]

    setFile(fileObj)
    setFilename(fileObj.name)
  }

  const onSubmit = async e => {
    e.preventDefault()

    const formData = new FormData()
    formData.append("file", file)

    try {
      const res = await axios.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        onUploadProgress: progressEvent => {
          setUploadPercentage(
            parseInt(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            )
          )

          setTimeout(() => setUploadPercentage(0), 10000)
        }
      })

      const { fileName, filePath } = res.data

      setUploadedFile({ fileName, filePath })
      setMessage("File uploaded")
    } catch (e) {
      if (e.response.status === 500) {
        return setMessage("Server error")
      }

      return setMessage(e.response.data.msg)
    }
  }

  return (
    <Fragment>
      {message ? <Message message={message} /> : null}

      <form onSubmit={onSubmit}>
        <div className="custom-file mb-4">
          <input
            type="file"
            className="custom-file-input"
            id="customFile"
            onChange={onChange}
          />
          <label className="custom-file-label" htmlFor="customFile">
            {filename}
          </label>
        </div>

        <ProgressBar percentage={uploadPercentage} />

        <input
          type="submit"
          value="Upload file"
          className="btn btn-primary btn-block mt-4"
        />
      </form>

      {uploadedFile ? (
        <div className="row mt-5">
          <div className="col-md-6 m-auto">
            <h3 className="text-center">{uploadedFile.fileName}</h3>
            <img src={uploadedFile.filePath} alt="" style={{ width: "100%" }} />
          </div>
        </div>
      ) : null}
    </Fragment>
  )
}

export default FileUpload
