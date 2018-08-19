export default {
  getFieldSingleValue (data, fieldName, propertyName) {
    if (data[fieldName] && data[fieldName].length) {
      if (!propertyName) {
        propertyName = 'value'
      }
      return data[fieldName][0][propertyName]
    }
    return null
  },
  getFieldMultiImage (data, fieldName) {
    let rs = []
    if (data[fieldName] && data[fieldName].length) {
      data[fieldName].forEach((item) => {
        rs.push(item.url)
      })
    }
    return rs
  },
  getVaritionFromCompleteOrder (order) {
    if (this.getFieldSingleValue(order, 'type', 'target_id') === 'booking_online') {
      return order.order_items[0].purchased_entity[0].variation_id[0]
    } else {
      return order.order_items[0].purchased_entity[0]
    }
  },
  getOrderProductTitle (order) {
    return order.order_items[0]._product.name
  },
  getOrderVariationTitle (order) {
    return this.getFieldSingleValue(this.getVaritionFromCompleteOrder(order), 'title')
  },
  getFormattedPrice (price) {
    if (price) {
      let str = ''
      if (price.number < 0) str = '-'
      return str + '¥' + Math.abs(Math.round(price.number * 100) / 100).toFixed(2)
    } else {
      return ''
    }
  },
  getFormattedDatetime (moment, datetime) {
    if (datetime) {
      let datetimeString = datetime.value
      let object = moment.utc(datetimeString).local()
      return object.format('YYYY-MM-DD H:m:s')
    } else {
      return ''
    }
  }
}
