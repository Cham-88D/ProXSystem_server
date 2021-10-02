const firebaseSettings = require("../config/config");
const dbFirestore = firebaseSettings.firestore();

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
            try{
                dbFirestore.collection('userRole').doc(userRecord.uid).set({
                    role: body.role
                }).then(()=> {
                    let resultAddUser = { message: 'User Role Inserted Successfully' };
                    result(null, resultAddUser);
                }).catch((error)=>{
                    console.log(error);
                    let resultAddUser = { message: 'User Role not inserted' };
                    result(null, resultAddUser);
                });
            }
            catch(error){
                result(null, error)
            }
            // See the UserRecord reference doc for the contents of userRecord.
            console.log('Successfully created new user:', userRecord.uid);



        })
        .catch((error) => {
            console.log('Error creating new user:', error);
        });
};



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

