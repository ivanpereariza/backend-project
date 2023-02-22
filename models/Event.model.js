const { Schema, model } = require('mongoose')

const eventSchema = new Schema(
    {

        title: {
            type: String,
            required: true
        },

        image: {
            type: String,
            default: 'https://res.cloudinary.com/dkfzj9tmk/image/upload/v1676916085/backend-project/event-default_otu1xw.jpg'
        },

        description: {
            type: String,
            required: true,
            minlength: 10,
        },

        organizer: {
            ref: 'User',
            type: Schema.Types.ObjectId,
        },

        participants: [{
            ref: 'User',
            type: Schema.Types.ObjectId,
        }],

        date: {
            type: String,
            required: true
        },

        dimension: {
            type: String,
            enum: ['Dimension C-137', 'Post-Apocalyptic Dimension', 'Replacement Dimension', 'Cronenberg Dimension', 'Testicle Monster Dimension'],
        },

        location: {
            type: {
                type: String
            },
            coordinates: [Number]
        }
    },
    {
        timestamps: true
    }
)

const Event = model('Event', eventSchema)

module.exports = Event