export const getInterns = async (req,res) => {
    try{
        res.send({ isAuthenticate : true})
    }catch(error){
        res.json({ message : error.message });
    }
}