const firebaseSettings = require("../config/config");
const { v4: uuidv4 } = require('uuid');
const dbFirestore = firebaseSettings.firestore();
const bucket = firebaseSettings.storage().bucket();


//get user details model
exports.getUserType = async (uid, result)=> {
   try{
       dbFirestore.collection('userRole').doc(uid).get().then((doc) => {
           if (!doc.exists) {
               let resultGetUserById = { message: 'No such User!' };
               result(null, resultGetUserById);
           } else {
               result(null, doc.data());
           }
       }).catch(error => {
           result(null, error);
       });
   }catch(error)
   {
       result(null, error);
   }
};


//create user model
exports.createUserProfile = async  (body, result)=> {
    console.log(body)
    firebaseSettings.auth()
        .createUser({
            email: body.email,
            emailVerified: false,
            phoneNumber: body.phoneNumber,
            password: body.password,
            disabled: false,
        })
        .then((userRecord) => {

            dbFirestore.collection('userRole').doc(userRecord.uid).set({
                role: body.role,
                name:body.name,
            }).then(()=> {
                let resultAddUser = { message: 'User Role Inserted Successfully' };
                result(null, resultAddUser);
            }).catch((error)=>{
                console.log(error);
                let resultAddUser = { message: 'User Role not inserted' };
                result(null, resultAddUser);
            });

            const uid = userRecord.uid

            const v =  uploadFile(body.fileName).catch((error) => {
                console.error(error)
            });


            v.then(async (res)=>{
                await get(res,uid)
            })



            // See the UserRecord reference doc for the contents of userRecord.
            console.log('Successfully created new user:', userRecord.uid);



        })
        .catch((error) => {
            console.log('Error creating new user:', error);
        });
};



// delete user model
exports.deleteUserProfile =  async  (uid, result)=> {
    firebaseSettings.auth().deleteUser(uid).then(function() {
        try{
            dbFirestore.collection('userRole').doc(uid).get().then((snapshot) => {
                if (snapshot.exists) {
                    let docRef = dbFirestore.collection('userRole').doc(userId);
                    docRef.delete().then(()=> {
                        let resultDeleteUserById = { message: 'User Role Deleted Successfully' };
                        result(null, resultDeleteUserById);
                    }).catch(()=>{
                        let resultDeleteUserById = { message: 'User Role Not Deleted' };
                        result(null, resultDeleteUserById);
                    });
                } else {
                    let resultDeleteUserById = { message: 'User Role Not Found' };
                    result(null, resultDeleteUserById);
                }
            });
        }
        catch(error){
            result(null, error)
        }

        let resultDeleteUserProfile = { message: 'Successfully deleted user'};
        result(null, resultDeleteUserProfile);
    }).catch(function(error) {
        result(null, error);
    });
};




// file upload
 async function uploadFile(filename) {

    const metadata = {
        metadata: {
            // This line is very important. It's to create a download token.
            firebaseStorageDownloadTokens: uuidv4()
        },
        contentType: 'image/png',
        cacheControl: 'public, max-age=31536000',
    };

    // Uploads a local file to the bucket

     let x =''
     await bucket.upload(filename, {
        // Support for HTTP requests made with `Accept-Encoding: gzip`
        gzip: true,
        metadata: metadata,
    }).then(async (res) => {

         x= res[1].mediaLink;
     });

  return x
}



async function get(x,uid){
    await dbFirestore.collection('userRole').doc(uid).update({fileName:x})
}