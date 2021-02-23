const byteArray = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = (event) => {
      resolve(event.target.result)
    }

    reader.onerror = (err) => {
      reject(err)
    }

    reader.readAsDataURL(file)
  })
}

export const fileToByteArray = async (fileToConvert) => {
  const result = await byteArray(fileToConvert)
  const resultArray = result.split(',')
  return resultArray[1]
}
