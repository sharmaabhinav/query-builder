
const exportToFile = (data, name) => {
  const file = new File([data], name, {
    type: 'text/plain'
  })

  const link = document.createElement('a')
  const url = window.URL.createObjectURL(file)
  link.href = url
  link.download = file.name
  document.body.appendChild(link)
  link.click()

  document.body.removeChild(link)
  window.URL.revokeObjectURL(url)
}

export default exportToFile
