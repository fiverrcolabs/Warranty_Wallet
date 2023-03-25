import { StatusCodes } from 'http-status-codes'
import qrcode from 'qrcode'
import QRCode from '../models/QRCode.js'
import { BadRequestError } from '../errors/index.js'

const generateQRCode = async (req, res) => {
  const { productId } = req.body

  // TODO: verify valid product

  if (!productId) {
    throw new BadRequestError('invalid product id')
  }

  const qrCodeAlreadyExists = await QRCode.findOne({ productId })

  if (qrCodeAlreadyExists) {
    throw new BadRequestError(`${productId} already has a QR code`)
  }

  const codeBase64 = await qrcode.toDataURL(`${process.env.productPathforQRCode}/${productId}`)

  const qrCode = await QRCode.create({ productId, code: codeBase64 })

  res.status(StatusCodes.OK).json({ qrCode: qrCode.code })
}

export { generateQRCode }