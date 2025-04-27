type TSelectImage = {
  imgFile: File | string;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
export function SelectImage({ imgFile, handleImageChange }: TSelectImage) {
  return (
    <>
      <input
        type="file"
        accept=".jpg, .jpeg, .png"
        onChange={handleImageChange}
        style={{ marginTop: 16 }}
      />

      {imgFile instanceof File && (
        <img
          src={URL.createObjectURL(imgFile)}
          alt="Preview"
          style={{
            marginTop: 12,
            width: 100,
            height: 100,
            objectFit: "cover",
            borderRadius: 4,
          }}
        />
      )}
      {typeof imgFile === "string" && (
        <img
          src={imgFile}
          alt="Preview"
          style={{
            marginTop: 12,
            width: 100,
            height: 100,
            objectFit: "cover",
            borderRadius: 4,
          }}
        />
      )}
    </>
  );
}
