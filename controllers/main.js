const getTableData = (req, res, db) => {
    db.select('*').from('test1')
        .then(items => {
            if(items.length) {
                res.json(items)
            } else {
                res.json({dataExists: 'false'})
            }
        })
        .catch(err => res.status(400).json({dbError: 'błąd bd', error: err}))
}

const postTableData = (req, res, db) => {
    const { first, last, email, phone, location, hobby } = req.body
    const added = new Date()
    db('test1').insert({ first, last, email, phone, location, hobby, added })
        .returning('*')
        .then(item => {
            res.json(item)
        })
        .catch(err => res.status(400).json({dbError: 'błąd bd', error: err, body: req.body}))
}

const putTableData = (req, res, db) => {
    const { id, first, last, email, phone, location, hobby } = req.body
    db('test1').where({id}).update({ first, last, email, phone, location, hobby })
        .returning('*')
        .then(item => {
            res.json(item)
        })
        .catch(err => res.status(400).json({dbError: 'błąd bd', error: err}))
}

const deleteTableData = (req, res, db) => {
    const { id } = req.body
    db('test1').where({id}).del()
        .then(() => {
            res.json({delete: 'true'})
        })
        .catch(err => res.status(400).json({dbError: 'błąd bd', error: err}))
}

module.exports = {
    getTableData,
    postTableData,
    putTableData,
    deleteTableData
}