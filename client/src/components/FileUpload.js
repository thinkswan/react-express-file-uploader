import React, { Fragment } from "react"

const FileUpload = props => {
  return (
    <Fragment>
      <div className="custom-file mb-4">
        <input type="file" className="custom-file-input" id="customFile" />
        <label className="custom-file-label" htmlFor="customFile">
          Choose file
        </label>
      </div>

      <input
        type="submit"
        value="Upload file"
        className="btn btn-primary btn-block mt-4"
      />
    </Fragment>
  )
}

export default FileUpload
