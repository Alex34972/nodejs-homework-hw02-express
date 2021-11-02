const fs = require('fs/promises')
const Jimp = require('jimp')
const path = require('path')

class uploadFileAvatar {
  constructor(dest) {
    this.dest = dest
  }

  async transformAvatar(pathFile) {
    const picture = Jimp.read(pathFile)
    await (await picture).autocrop()
      .cover(250, 250, Jimp.HORIZONTAL_ALIGN_CENTER | Jimp.VERTICAL_ALIGN_MIDDLE)
      .writeAsync(pathFile)
  }

  async save(file, idUser) {
    await this.transformAvatar(file.path)
    await fs.rename(file.path, path.join(this.dest, file.filename))
    return path.normalize(path.join(idUser, file.filename))
  }
}

module.exports = uploadFileAvatar
