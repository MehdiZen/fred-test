import { useState } from "react";

export function Welcome() {
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [isUrlValid, setIsUrlValid] = useState(true);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

   const handleUrlChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if(event.target.value.length > 10){
    validateEmail(event.target.value);
    }
    else{setIsUrlValid(true)}
    setImageUrl(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (image) {
      console.log("Image à envoyer:", image);
    } else if (imageUrl) {
      console.log("URL à envoyer:", imageUrl);
    }
  };

   const validateEmail = (value: string) => {
      const pattern = /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/;
      setIsUrlValid(pattern.test(value))
   }

  return (
    <div className="imageForm">
      <form onSubmit={handleSubmit}>
        <div className="linkForm">
          <label>
            Entrer un lien d'image : 
            <input type="text" value={imageUrl} onChange={handleUrlChange} style={{width:"100%"}}/>
            {!isUrlValid && imageUrl.length > 4 && <p style={{color:"red", fontSize:"11px", margin: 0, padding: 0}}> Merci de rentrer une URL valide( http(s)://... )</p>}
          </label>
        </div>
          <label htmlFor="images">Ou selectionner une image</label>
        <div className="imageSelector">
            <input type="file" id="images" accept="image/*" onChange={handleImageChange}
             />
        </div>
        <button type="submit">Envoyer</button>
      </form>
    </div>
  );
}