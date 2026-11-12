async function getMessage(req,res){
    const authorName = req.body.messageUser;
    const authorText = req.body.messageText;
    //messages.push({text: authorText, user: authorName, added: new Date()});
}
module.exports= {getMessage};