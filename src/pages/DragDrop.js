import React, { useEffect, useState } from "react";
import shortid from "https://cdn.skypack.dev/shortid@2.2.16";
import FileCard from "../component/common/FileCard";
import ReactProgressBar from "../component/common/ReactProgressBar";

const DragDrop = () => {
  const [selectedfile, SetSelectedFile] = useState([]);
  const [finalData, setFinalData] = useState([]);
  const [progressValue, setProgressValue] = useState("");
  const [max, setmax] = useState(0);
  const [showProgressBar, setShowProgressBar] = useState(false);


  const filesizes = (bytes, decimals = 2) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  };

  const InputChange = (e) => {
    let images = [];
    for (let i = 0; i < e.target.files.length; i++) {
      images.push(e.target.files[i]);
      let reader = new FileReader();
      let file = e.target.files[i];
      reader.onloadend = () => {
        const obj = {
          id: shortid.generate(),
          filename: e.target.files[i].name,
          filetype: e.target.files[i].type,
          fileimage: reader.result,
          datetime: e.target.files[i].lastModifiedDate.toLocaleString("en-IN"),
          filesize: filesizes(e.target.files[i].size),
        };
        const data = [...selectedfile, obj];
        SetSelectedFile(data);
      };
      if (e.target.files[i]) {
        reader.readAsDataURL(file);
      }
    }
  };

  return (
    <div className="fileupload-view">
      <div className="row justify-content-center m-0">
        <div className="col-md-6">
          <div className="card mt-5">
            <div className="card-body">
              <div className="kb-data-box">
                <div className="kb-modal-data-title">
                  <div className="kb-data-title">
                    <h6>Multiple File Upload With Preview</h6>
                  </div>
                </div>
                <form value={progressValue} max={max}>
                  <div className="kb-file-upload">
                    <div className="file-upload-box">
                      <input
                        type="file"
                        id="fileupload"
                        className="file-upload-input"
                        onChange={InputChange}
                        multiple
                      />
                      <span>
                        Drag and drop or{" "}
                        <span className="file-link">Choose your files</span>
                      </span>
                    </div>
                  </div>
                  <FileCard
                    selectedfile={selectedfile}
                    finalData={finalData}
                    setFinalData={setFinalData}
                    SetSelectedFile={SetSelectedFile}
                  />
                </form>
              </div>
            </div>
          </div>
          <div className="progress_bar">
            {finalData?.length > 0 ? (
              <>
                <ReactProgressBar finalData={finalData} setFinalData={setFinalData}/>
              </>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DragDrop;

