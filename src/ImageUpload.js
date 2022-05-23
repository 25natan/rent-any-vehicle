import React from "react";
import ImageUploading from "react-images-uploading";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";


const ImageUploader = (props) => {
  const { images, setImages } = props;
  const maxNumber = 69;

  const onChange = (imageList, addUpdateIndex) => {
    setImages(imageList);
  };

  return (
    <div className="image-uploader">
      <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          <div className="upload__image-wrapper">
            <Button
              variant="contained"
              style={
                (isDragging ? { color: "red" } : undefined,
                { margin: "0 20px 0" })
              }
              onClick={onImageUpload}
              {...dragProps}
            >
              Click or Drop here
            </Button>
            {imageList.length ? <Button
              size="small"
              startIcon={<DeleteIcon />}
              onClick={onImageRemoveAll}
              variant="outlined"
              style={{ margin: "15px 0 40px 0" }}
            >
              Remove all images
            </Button> : <></>
}
            {imageList.map((image, index) => (
              <div
                key={index}
                className="image-item"
                style={{ marginBottom: "20px" }}
              >
                <img src={image["data_url"]} alt="" width="100" />
                <div className="image-item__btn-wrapper">
                  <Button
                    style={{
                      fontSize: "10px",
                      marginRight: "10px",
                      padding: "3px",
                    }}
                    variant="outlined"
                    onClick={() => onImageUpdate(index)}
                  >
                    Update
                  </Button>

                  <Button
                    variant="outlined"
                    startIcon={
                      <DeleteIcon
                        style={{ fontSize: "15px", padding: "0 0 0 3px" }}
                      />
                    }
                    style={{ fontSize: "10px", padding: "3px" }}
                    onClick={() => onImageRemove(index)}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </ImageUploading>
    </div>
  );
};

export default ImageUploader;
