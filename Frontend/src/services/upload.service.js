export const uploadService = {
  uploadImg
}
async function uploadImg(ev) {
  const CLOUD_NAME = "dgwgcf6mk"
  const UPLOAD_PRESET = "ao68llgp"
  const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/home/Giggler/gig-images/upload`

  try {
    const formData = new FormData()
    formData.append('upload_preset', UPLOAD_PRESET)
    formData.append('file', ev.target.files[0])

    const res = await fetch(UPLOAD_URL, {
      method: 'POST',
      body: formData
    })
    const imgUrl = await res.json()
    return imgUrl
  } catch (err) {
    console.error('Failed to upload', err)
    throw err
  }
}