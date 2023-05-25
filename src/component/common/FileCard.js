const FileCard = ({
  selectedfile,
  setFinalData,
  finalData,
  SetSelectedFile,
}) => {
  const proceed = (e, id) => {
    e.preventDefault();
    console.log("selectedfile", selectedfile);
    if (selectedfile?.length > 0) {
      const udatesData = selectedfile?.map((data, index) => ({
        ...data,
        min: 0,
        max: parseInt(data.filesize?.split(" ")?.[0]),
      }));
      
      const data = [...finalData, ...udatesData];
      setFinalData(data);
      SetSelectedFile([]);
    }
  };

  const DeleteSelectFile = (id) => {
    if (window.confirm("Are you sure you want to delete this Image?")) {
      const result = selectedfile.filter((data) => data.id !== id);
      SetSelectedFile(result);
    } else {
    }
  };

  return (
    <>
      <div className="kb-attach-box mb-3">
        {selectedfile?.map((data, index) => {
          const { id, filename, filetype, fileimage, datetime, filesize } =
            data;
          return (
            <div className="file-atc-box" key={id}>
              {filename.match(/.(jpg|jpeg|png|gif|svg)$/i) ? (
                <div className="file-image">
                  {" "}
                  <img src={fileimage} alt="" />
                </div>
              ) : (
                <div className="file-image">
                  <i className="far fa-file-alt"></i>
                </div>
              )}
              <div className="file-detail">
                <h6>{filename}</h6>
                <p></p>
                <p>
                  <span>Size : {filesize}</span>
                  <span className="ml-2">Modified Time : {datetime}</span>
                </p>
                <div className="file-actions">
                  <button
                    type="button"
                    className="file-action-btn"
                    onClick={() => DeleteSelectFile(id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })}
        {selectedfile?.length > 0 ? (
          <div>
            <input type="text" placeholder="Enter some text" />
            <button onClick={(e) => proceed(e)}>Submit</button>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default FileCard;
