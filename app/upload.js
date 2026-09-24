import React from "react";
import { Cloudinary } from "@cloudinary/url-gen";
import { auto } from "@cloudinary/url-gen/actions/resize";
import { autoGravity } from "@cloudinary/url-gen/qualifiers/gravity";
import { AdvancedImage } from "@cloudinary/react";

const App = () => {
  const cld = new Cloudinary({ cloud: { cloudName: "dpmk70mvq" } });

  const img = cld.image("main-sample");

  return <AdvancedImage cldImg={img} />;
};

export default App;
