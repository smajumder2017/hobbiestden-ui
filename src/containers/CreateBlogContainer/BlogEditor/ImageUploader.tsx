import React, { useState, useRef } from "react";
import { Button, Drawer } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import ReactCrop, { Crop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

interface IOwnProps {
  handleUpload: (file: File) => Promise<void>;
  value: string;
  crop: boolean;
  handleCropSubmit?: (file: File) => Promise<void>;
  onFileSelect?: (file: string) => void;
  buttonText: string
}

export const FileUploader: React.FC<IOwnProps> = (props) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [cropModal, setCropModal] = useState(false);

  const [crop, setCrop] = useState<Crop>({
    unit: "%",
    width: 30,
    aspect: 16 / 4,
  });
  const [fileName, setFileName] = useState<string>("");
  const [imageRef, setImageRef] = useState<any>(null);
  const [croppedImage, setCroppedImage] = useState<File | null>(null);
  const canvas = useRef<HTMLCanvasElement>(null);

  const resetState = () => {
    setFileName("");
    setImageRef(null);
    setCroppedImage(null);
    setCrop({
      unit: "%",
      width: 30,
      aspect: 16 / 4,
    });
    setCropModal(false);
  };

  const onSelectFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      if (props.crop) {
        const reader = new FileReader();
        reader.addEventListener("load", () =>
        props.onFileSelect && props.onFileSelect(reader.result?.toString() || "")
        );
        reader.readAsDataURL(e.target.files[0]);
        setFileName(e.target.files[0].name);
        setCropModal(true);
      } else {
        try {
          await props.handleUpload(e.target.files[0]);
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  const onCropChange = (crop: Crop) => {
    // You could also use percentCrop:
    // this.setState({ crop: percentCrop });
    setCrop(crop);
  };

  const getCroppedImg = (
    image: any,
    crop: Crop
  ): Promise<Blob> | void => {
    if (canvas.current) {
      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;
      if (canvas && crop.height && crop.width) {
        canvas.current.width = crop.width;
        canvas.current.height = crop.height;
        const ctx = canvas.current.getContext("2d");
        if (ctx) {
          ctx.drawImage(
            image,
            crop.x || 0 * scaleX,
            crop.y || 0 * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height
          );
        }
        return new Promise((resolve, reject)=>{
          if(canvas.current) {
            canvas.current.toBlob((blob) => {
              if(!blob) {
                return;
              }
              resolve(blob);
            },'image/jpeg', 1);
          }
        });
      }
    }
  };

  const makeClientCrop = async (crop: Crop) => {
    if (imageRef && crop.width && crop.height) {
      const croppedImage = await getCroppedImg(imageRef, crop);
      console.log(croppedImage)
      if (croppedImage) setCroppedImage(blobToFile(croppedImage, fileName));
    }
  };

  const blobToFile = (theBlob: Blob, fileName: string): File => {
    var b: any = theBlob;
    //A Blob() is almost a File() - it's just missing the two properties below which we will add
    b.lastModifiedDate = new Date();
    b.name = fileName;
    //Cast to a File() type
    return theBlob as File;
  };

  const handleCropSubmit = () => {
    console.log(croppedImage);
    if (croppedImage && props.handleCropSubmit) {
      props.handleCropSubmit(croppedImage);
    }
    resetState();
    setCropModal(false);
  };

  return (
    <div>
      <input
        type="file"
        className="hidden"
        ref={fileInputRef}
        accept="image/*"
        onChange={onSelectFile}
        placeholder="Upload Image"
      />
      <canvas ref={canvas} hidden />
      <div style={{ display: "flex" }}>
        <Button
          block
          type="dashed"
          icon={<UploadOutlined />}
          onClick={() => {
            fileInputRef.current?.click();
          }}
        >
          {props.buttonText}
        </Button>
      </div>
      <Drawer
        title="Adjust Image"
        width={720}
        placement={"right"}
        onClose={() => setCropModal((prev) => !prev)}
        visible={cropModal}
        bodyStyle={{ paddingBottom: 80 }}
        footer={
          <div
            style={{
              textAlign: "right",
            }}
          >
            <Button
              onClick={() => setCropModal(false)}
              style={{ marginRight: 8 }}
            >
              Cancel
            </Button>
            <Button onClick={handleCropSubmit} type="primary">
              Submit
            </Button>
          </div>
        }
      >
        {props.value && (
          <ReactCrop
            src={props.value}
            crop={crop}
            ruleOfThirds
            onImageLoaded={(ref) => {
              setImageRef(ref);
            }}
            onComplete={(crop) => makeClientCrop(crop)}
            onChange={onCropChange}
          />
        )}
      </Drawer>
    </div>
  );
};
