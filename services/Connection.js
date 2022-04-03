
var mongoose=require('mongoose');
const Connection = async () => {
   
    const URL=`mongodb+srv://root:Jitu@123@cluster0.lntus.mongodb.net/Blog-database?retryWrites=true&w=majority`;
      //here i connect my application with mongoDB atlas.
    
try {
    await mongoose.connect(URL, { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false });
    console.log('Database Connected Succesfully');
} catch(error) {
    console.log('Error: ', error.message);
}


};
module.exports=Connection;
