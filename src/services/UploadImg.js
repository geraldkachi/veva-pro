export async function uploadImg(file, preset) {
  let fileData = new FormData();
  fileData.append("invalidate ", true);
  fileData.append("file", file);
  fileData.append("upload_preset", preset);

  // let imgUrl;
  const requestOptions = {
    method: "POST",
    body: fileData,
    redirect: "follow",
  };
  return fetch(
    "https://api.cloudinary.com/v1_1/horllameeday/image/upload",
    requestOptions
  )
    .then(res => res.json())
    .then(response => {
      console.log(response);
      return response;
    })
    .catch(err => console.log(err));
}

export async function deleteImg(token) {
  const requestOptions = {
    method: "POST",
    body: `token=${token}`,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };

  return fetch(
    `https://api.cloudinary.com/v1_1/horllameeday/delete_by_token`,
    requestOptions
  )
    .then(res => res.json())
    .then(response => {
      console.log(response);
      return response;
    })
    .catch(err => console.log(err));
}

// "https://api.cloudinary.com/v1_1/fintechngr/image/upload";

// cloudinary://118759682255234:pruQ7s4FhCooA8E_iCrQ1z9c5_c@dpiyqfdpk
