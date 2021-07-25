import mongoose from 'mongoose';


const sliderImage = mongoose.Schema({
    imgUrl: String,
    title:String
    
})

export default mongoose.model('slider',sliderImage)