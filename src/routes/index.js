const userRouter = require('./user.route')
const documentRouter = require('./document')
const productRouter = require('./product.route')
const categoryRouter = require('./category.route')
const brandRouter = require('./brand.route')
const { notFound, errHandler } = require('../middlewares/errHandler')

const initRoutes = (app) => {
    app.use('/api/documentation', documentRouter)
    app.use('/api/user', userRouter)
    app.use('/api/products', productRouter)
    app.use('/api/categories', categoryRouter)
    app.use('/api/brand', brandRouter)



    app.use(notFound)
    app.use(errHandler)
}

module.exports = initRoutes