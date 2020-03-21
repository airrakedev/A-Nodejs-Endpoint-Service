const _ = require('lodash')
const path = require('path')

const { Admin } = require('./../../models')
const { toValidate } = require('./validation')
const { catchAsyncErrors } = require('./../../startup/error-logger')

const adminController = {}

adminController.createAdmin = catchAsyncErrors(async (req, res, next) => {
    const { firstname, lastname, email, password } = req.body
    const { error } = toValidate(req.body)

    if (error) res.status(400).json({ success: false, message: error.details[ 0 ].message })

    let admin = await Admin.create({ firstname, lastname, email, password })
    if (!admin) res.status(400).json({ success: false, message: 'Unable to create admin record.' })

    res.status(200).json({ success: false, data: admin })
})



adminController.userLogin = catchAsyncErrors(async (req, res, next) => {

    const { email, password } = req.body
    if (!email || !password) return res.status(401).json({ success: false, message: 'Username and password are required.' })

    let User = await Admin.findOne({ email })
    if (!User) return res.status(401).json({ success: false, message: `Can't find this record for this ${email}.` })

    let verifyPassword = await User.comparePassword(password)
    if (!verifyPassword) return res.status(401).json({ success: false, message: 'Invalid password.' })

    // CREATE USER TOKEN
    let token = await User.setUSerAuthorizationToken()

    let userData = _.pick(User, [ '_id','firstname', 'lastname', 'role', 'status', 'email' ])

    res.header('Authorization', token).status(200).json({ success: true, token, data: userData })
})


adminController.updateAdmin = catchAsyncErrors(async (req, res) => {

    const { firstname, lastname, email } = req.body

    if (!firstname && !lastname && !email) return res.status(400).json({ success: false, message: 'Please provide records to update.' })

    let adminId = req.user._id
    let adminRecord = await Admin.findById(adminId)

    if (!adminRecord) return res.status(400).json({ success: false, message: "Cant find this record." })

    if (firstname) adminRecord.firstname = firstname
    if (lastname) adminRecord.lastname = lastname
    if (email) adminRecord.email = email

    let saveDoc = await adminRecord.save()
    if (!saveDoc) return res.status(400).json({ success: false, message: "Unable to update record" });

    res.status(200).json({ success: true, data: saveDoc })
})



adminController.uploadProfile = catchAsyncErrors(async (req, res) => {

    let saveProfile = await Admin.findById(req.user._id)
    if (!saveProfile) res.status(400).json({ success: false, message: 'Could not find your record.' })

    let file = req.files.adminProfile
    if (!req.files) return res.status.json({ success: false, message: "Please provide profile." })

    if (!file.mimetype.startsWith('image')) return res.status(200).json({ success: false, message: 'Please upload image file only.' })

    let split = file.mimetype.split('/')
    let fileExt = split[ split.length - 1 ]
    let filename = `${process.env.UPLOAD_LOCATION}/admin_profile_image.${fileExt}`

    let uploaded = await file.mv(filename, async (err) => {
        if (err) return res.status(400).json({ success: false, message: 'Sorry unable to upload your profile image.' })

        saveProfile.image = filename;

        let saveDoc = await saveProfile.save()
        if (!saveDoc) return res.status(400).json({ success: false, message: 'Couldn\'t update your profile record.' })

        res.status(200).json({ success: true, data: filename, doc: saveDoc })

    })
})


module.exports = adminController