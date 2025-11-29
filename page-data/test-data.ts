export const Users = {
    standard: {
        username: 'standard_user',
        password: 'secret_sauce'
    },
    locked: {
        username: 'locked_out_user',
        password: 'secret_sauce'
    }
} as const;

export const Products = {
    backpack: 'Sauce Labs Backpack',
    bikeLight: 'Sauce Labs Bike Light'
} as const;

export const Address = {
    allRight: {
        firstName: 'xiao',
        lastName: 'shuai',
        postalCode: '0000000'
    }
} as const;