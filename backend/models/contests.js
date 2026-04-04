import mongoose from "mongoose";

const contestSchema = new mongoose.Schema({
  date: {
     type: Date,
      required: true 
    }, 
  startTime: { 
    type: Date, 
    required: true 
}, 
  endTime: { 
    type: Date, 
    required: true 
}, 
  domains: [{
     type: String
     }], // e.g., ['Frontend', 'Backend', 'UI/UX'] 
  questionCount: { 
    type: Number,
     default: 20 } 
});


const Contest = mongoose.model('Contest', contestSchema)

export default Contest;