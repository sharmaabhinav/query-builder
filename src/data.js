const queries = [
  'Customer query',
  'Employee query',
  'Order query'
]

const generateData = (sample, times) => {
  const data = []
  for(let start = 1; start <= times; start++) {
    data.push(sample)
  }
  return data
}

export const queryDetails = {
  'Customer query': {
    query: 'select * from customers',
    results: generateData({
      address: 'Obere Str. 57',
      city: 'Berlin',
      postalCode: 12209,
    }, 1000)
  },
  'Employee query': {
    query: 'select * from employees',
    results: generateData({
      firstName: 'Nancy',
      lastName: 'Davolio',
      city: 'Seattle',
    }, 10000)
  },
  'Order query': {
    query: 'select * from orders',
    results: [],
  }
}


export default queries
