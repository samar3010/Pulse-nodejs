const {userRouter} =  require('./src/component/user/user.api')
const {doctorRouter} = require('./src/component/doctor/doctor.api')


exports.allRequires = (app) => {

    app.use("/api/v1/spcialities", require('./src/component/speciality/speciality.api'))
    app.use("/api/v1/SubSpecialities", require('./src/component/subSpeciality/subSpeciality.api'))
    app.use("/api/v1/doctors", doctorRouter)
    app.use("/api/v1/users" , userRouter)
    app.use("/api/v1/reviews", require('./src/component/review/reviews.api'))
    app.use("/api/v1/coupons", require('./src/component/coupon/coupon.api'))
    app.use("/api/v1/books", require('./src/component/book/book.api.js'))
    app.use("/api/v1/wishLists",require('./src/component/wishList/wishList.api'))
    app.use("/api/v1/admin" , require('./src/component/admin/admin.api'))
    app.use("/api/v1/payment",require('./src/component/payment/payment.api'))
    app.use("/api/v1/schedules",require('./src/component/schedule/schedule.api'))

}
