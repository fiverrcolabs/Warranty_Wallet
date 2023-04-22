import { StatusCodes } from 'http-status-codes'
import qrcode from 'qrcode'
import Item from '../models/Item.js'
import { BadRequestError } from '../errors/index.js'

const generateQRCodes = async (req, res) => {
  const { productId, noOfQRCodes } = req.body

  if (
    !productId ||
    !noOfQRCodes ||
    !Number.isInteger(noOfQRCodes) ||
    noOfQRCodes < 1
  ) {
    throw new BadRequestError('please provide all values')
  }

  const items = []

  for (let index = 0; index < noOfQRCodes; index++) {
    let item = await Item.create({ productId })

    const codeBase64 = await qrcode.toDataURL(
      `${process.env.productPathforQRCode}/${item._id}`
    )
    
    item.qr = codeBase64
    item.createdDate=Date.now()
    item = await item.save()
    items.push(item)
  }

  res.status(StatusCodes.OK).json(items)
}

export { generateQRCodes }
