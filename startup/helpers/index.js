const _ = require('lodash')
const { Genres } = require('./../../models')
const helpers = {}

helpers.getGenresIdArray = async function(array_id){
	let result = []
	
	for (var i = array_id.length - 1; i >= 0; i--) {
		let checkId = await Genres.findById(array_id[i])
		
		if(checkId){
			 result.push({
				_id: checkId._id,
				title: checkId.title
			})
		}
	}

	return result
}

module.exports = helpers