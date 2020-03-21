const _ = require('lodash')
const path = require('path')

const { Customers } = require('./../../models')
const { validateCreate } = require('./validation')
const { catchAsyncErrors } = require('./../../startup/error-logger')

const customerController = {}

customerController.createCustomer = catchAsyncErrors(async (req, res) => {
    const { firstname, lastname, phone, email, address, password } = req.body
    const { error } = validateCreate(req.body)

    if (error) return res.status(400).json({ success: false, message: error.details[ 0 ].message })

    let checkEmail = await Customers.findOne({ email })
    if (checkEmail) return res.status(400).json({ success: false, message: "Email already exist. Please use another one." })

    let customer = await Customers.create({ firstname, lastname, phone, email, address, password })
    if (!customer) return res.status(400).json({ success: false, message: 'Unable to create customer record.' })

    res.status(200).json({ success: true, data: customer })
})


customerController.login = async(req, res)=>{

	const {email, password} = req.body

	if(!req.body.email || !req.body.password)return res.status(400).json({success:false, message:!email?+"Please provide email." : '' + !password?"Please provide password." : ''})
		
	let User = await Customers.findOne({email})
	if(!User)return res.status(400).json({success:false, message:`Can\'t find ${email}`})

	let checkPass = await User.comparePassword(password)
	if(!checkPass)return res.status(400).json({success:false, message:`Invalid password`})

	let token = await User.setUSerAuthorizationToken()	
	if(!token)return res.status(400).json({success:false, message:`Couldn't create token for you.`})

	User = _.pick(User, ['status', '_id', 'firstname', 'lastname', 'phone', 'email', 'address'])

	req.user = token

	return res.status(200).json({success:true, message:User, token})
}




module.exports = customerController