"use client";
import { useRef, useState } from "react";
import styles from "./image-picker.module.css";
import Image from "next/image";
export default function ImagePicker({ label, name }) {
  const [imageDisplay, setImageDisplay] = useState(null);
  const imageinput = useRef();

  function handleButton() {
    imageinput.current.click();
  }

  function handleImageDisplay(event) {
    const file = event.target.files[0];
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setImageDisplay(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }

  return (
    <div className={styles.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={styles.controls}>
        <div className={styles.preview}>
          {imageDisplay ? (
            <Image src={imageDisplay} alt="The image selected by user." fill />
          ) : (
            <p>No image picket yet.</p>
          )}
        </div>
        <input
          className={styles.input}
          type="file"
          id={name}
          accept="image/png, image/jpeg"
          name={name}
          ref={imageinput}
          onChange={handleImageDisplay}
          required
        />
        <button className={styles.button} type="button" onClick={handleButton}>
          Pick an Image
        </button>
      </div>
    </div>
  );
}
